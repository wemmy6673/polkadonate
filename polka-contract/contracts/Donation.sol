// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable}         from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable}        from "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title  DonationFactory
 * @notice Creates and manages fundraising causes on PolkaDonate.
 *         Users donate native DOT directly — no ERC-20 token required.
 *
 * @dev    Cause lifecycle:
 *
 *           createCause()
 *               └──► Active
 *                        ├── donate() fills goal  ──► Ended (auto)
 *                        └── deadline passes      ──► creator calls endCause() ──► Ended
 *                                                                                     │
 *                                                                     creator calls withdraw()
 *                                                                                     │
 *                                                                                 Withdrawn
 *
 *         IPFS:
 *           Only the IPFS CID is stored on-chain. The full metadata JSON
 *           (title, description, category, image CID) lives on IPFS and
 *           is fetched by the frontend via useIPFS().
 *
 *         Fees:
 *           A configurable platform fee (default 2%, max 10%) is taken
 *           from raised funds at withdrawal time and sent to the owner.
 */
contract Donation is Ownable, ReentrancyGuard, Pausable {

    // ── Types ─────────────────────────────────────────────────────

    enum CauseStatus { Active, Ended, Withdrawn }

    struct Cause {
        uint256     id;
        address     creator;
        string      ipfsCid;     // IPFS CID pointing to metadata JSON
        uint256     goal;        // fundraising target in wei
        uint256     raised;      // total donated so far in wei
        uint256     deadline;    // unix timestamp — donations blocked after this
        uint256     donorCount;  // unique donors
        CauseStatus status;
    }

    // ── State ─────────────────────────────────────────────────────

    /// @notice Platform fee in basis points. 200 = 2%.
    uint256 public feeBps = 200;

    /// @notice Hard cap on platform fee — owner can never set above 10%.
    uint256 public constant MAX_FEE_BPS = 1000;

    uint256 private _causeCounter;

    /// @notice causeId => Cause struct
    mapping(uint256 => Cause) public causes;

    /// @notice causeId => donor address => cumulative amount donated (wei)
    mapping(uint256 => mapping(address => uint256)) public donations;

    /// @notice creator address => list of causeIds they created
    mapping(address => uint256[]) public causesByCreator;

    /// @notice donor address => list of causeIds they donated to
    mapping(address => uint256[]) public causesByDonor;

    // ── Events ────────────────────────────────────────────────────

    event CauseCreated(
        uint256 indexed causeId,
        address indexed creator,
        string          ipfsCid,
        uint256         goal,
        uint256         deadline
    );

    event Donated(
        uint256 indexed causeId,
        address indexed donor,
        uint256         amount,
        uint256         newTotal
    );

    event GoalReached(
        uint256 indexed causeId,
        uint256         totalRaised
    );

    event CauseEnded(
        uint256 indexed causeId
    );

    event FundsWithdrawn(
        uint256 indexed causeId,
        address indexed creator,
        uint256         amount,
        uint256         fee
    );

    event FeeBpsUpdated(uint256 oldFee, uint256 newFee);

    // ── Errors ────────────────────────────────────────────────────

    error InvalidGoal();
    error InvalidDeadline();
    error EmptyCid();
    error CauseNotActive(uint256 causeId);
    error DeadlinePassed(uint256 causeId);
    error ZeroDonation();
    error NotCreator(uint256 causeId);
    error NothingToWithdraw(uint256 causeId);
    error CauseStillActive(uint256 causeId);
    error FeeTooHigh(uint256 requested, uint256 max);
    error WithdrawFailed();
    error FeeTransferFailed();
    error CauseNotFound(uint256 causeId);

    // ── Modifier ──────────────────────────────────────────────────

    modifier causeExists(uint256 causeId) {
        if (causeId == 0 || causeId > _causeCounter)
            revert CauseNotFound(causeId);
        _;
    }

    // ── Constructor ───────────────────────────────────────────────

    constructor(address initialOwner) Ownable(initialOwner) {}

    // ─────────────────────────────────────────────────────────────
    // WRITE — Cause lifecycle
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Create a new fundraising cause.
     * @param  ipfsCid   IPFS CID of the metadata JSON
     *                   (must contain: title, desc, category, imageCid)
     * @param  goal      Fundraising target in wei. Must be > 0.
     * @param  deadline  Unix timestamp when the cause closes.
     *                   Must be strictly in the future.
     * @return causeId   Auto-incremented ID of the new cause.
     */
    function createCause(
        string  calldata ipfsCid,
        uint256          goal,
        uint256          deadline
    )
        external
        whenNotPaused
        returns (uint256 causeId)
    {
        if (bytes(ipfsCid).length == 0) revert EmptyCid();
        if (goal == 0)                  revert InvalidGoal();
        if (deadline <= block.timestamp) revert InvalidDeadline();

        causeId = ++_causeCounter;

        causes[causeId] = Cause({
            id:         causeId,
            creator:    msg.sender,
            ipfsCid:    ipfsCid,
            goal:       goal,
            raised:     0,
            deadline:   deadline,
            donorCount: 0,
            status:     CauseStatus.Active
        });

        causesByCreator[msg.sender].push(causeId);

        emit CauseCreated(causeId, msg.sender, ipfsCid, goal, deadline);
    }

    /**
     * @notice Donate native DOT to an active cause.
     * @dev    msg.value is the donation amount in wei.
     *         Automatically ends the cause if the goal is reached.
     * @param  causeId  ID of the cause to donate to.
     */
    function donate(uint256 causeId)
        external
        payable
        nonReentrant
        whenNotPaused
        causeExists(causeId)
    {
        Cause storage cause = causes[causeId];

        if (cause.status != CauseStatus.Active)  revert CauseNotActive(causeId);
        if (block.timestamp > cause.deadline)    revert DeadlinePassed(causeId);
        if (msg.value == 0)                      revert ZeroDonation();

        // First-time donor for this cause
        if (donations[causeId][msg.sender] == 0) {
            cause.donorCount++;
            causesByDonor[msg.sender].push(causeId);
        }

        donations[causeId][msg.sender] += msg.value;
        cause.raised                   += msg.value;

        emit Donated(causeId, msg.sender, msg.value, cause.raised);

        // Auto-end when goal is reached
        if (cause.raised >= cause.goal) {
            cause.status = CauseStatus.Ended;
            emit GoalReached(causeId, cause.raised);
            emit CauseEnded(causeId);
        }
    }

    /**
     * @notice Manually end a cause after its deadline has passed.
     * @dev    Only the creator can call this. Needed when deadline passes
     *         but the goal was not fully reached — allows withdrawal.
     * @param  causeId  ID of the cause to end.
     */
    function endCause(uint256 causeId)
        external
        causeExists(causeId)
    {
        Cause storage cause = causes[causeId];

        if (cause.creator != msg.sender)        revert NotCreator(causeId);
        if (cause.status != CauseStatus.Active) revert CauseNotActive(causeId);
        if (block.timestamp <= cause.deadline)  revert CauseStillActive(causeId);

        cause.status = CauseStatus.Ended;
        emit CauseEnded(causeId);
    }

    /**
     * @notice Withdraw raised funds to the creator.
     * @dev    Cause must be in Ended status.
     *         Platform fee (feeBps) is deducted and forwarded to owner.
     *         Remaining funds go to the creator (msg.sender).
     * @param  causeId  ID of the cause to withdraw from.
     */
    function withdraw(uint256 causeId)
        external
        nonReentrant
        causeExists(causeId)
    {
        Cause storage cause = causes[causeId];

        if (cause.creator != msg.sender)       revert NotCreator(causeId);
        if (cause.status != CauseStatus.Ended) revert CauseNotActive(causeId);
        if (cause.raised == 0)                 revert NothingToWithdraw(causeId);

        uint256 total   = cause.raised;
        uint256 fee     = (total * feeBps) / 10_000;
        uint256 payout  = total - fee;

        // Reset before transfer (CEI pattern)
        cause.raised = 0;
        cause.status = CauseStatus.Withdrawn;

        (bool ok,)     = payable(msg.sender).call{value: payout}("");
        if (!ok) revert WithdrawFailed();

        if (fee > 0) {
            (bool feeOk,) = payable(owner()).call{value: fee}("");
            if (!feeOk) revert FeeTransferFailed();
        }

        emit FundsWithdrawn(causeId, msg.sender, payout, fee);
    }

    // ─────────────────────────────────────────────────────────────
    // READ — Causes
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Get the full Cause struct for a given ID.
     */
    function getCause(uint256 causeId)
        external
        view
        causeExists(causeId)
        returns (Cause memory)
    {
        return causes[causeId];
    }

    /**
     * @notice Total number of causes ever created.
     */
    function getCauseCount() external view returns (uint256) {
        return _causeCounter;
    }

    /**
     * @notice Paginated list of cause IDs, newest first.
     * @param  offset  How many to skip from the newest end (0 = start from newest).
     * @param  limit   Maximum number of IDs to return.
     * @return ids     Array of causeIds in descending order.
     */
    function getCauseIds(uint256 offset, uint256 limit)
        external
        view
        returns (uint256[] memory ids)
    {
        uint256 total = _causeCounter;
        if (offset >= total) return new uint256[](0);

        uint256 end  = offset + limit > total ? total : offset + limit;
        uint256 size = end - offset;
        ids = new uint256[](size);

        for (uint256 i = 0; i < size; i++) {
            ids[i] = total - offset - i;
        }
    }

    /**
     * @notice All cause IDs created by a specific address.
     */
    function getCausesByCreator(address creator)
        external
        view
        returns (uint256[] memory)
    {
        return causesByCreator[creator];
    }

    /**
     * @notice All cause IDs donated to by a specific address.
     */
    function getCausesByDonor(address donor)
        external
        view
        returns (uint256[] memory)
    {
        return causesByDonor[donor];
    }

    /**
     * @notice Cumulative amount a donor has given to a specific cause.
     */
    function getDonation(uint256 causeId, address donor)
        external
        view
        returns (uint256)
    {
        return donations[causeId][donor];
    }

    /**
     * @notice Returns true if the cause deadline has passed.
     */
    function isExpired(uint256 causeId)
        external
        view
        causeExists(causeId)
        returns (bool)
    {
        return block.timestamp > causes[causeId].deadline;
    }

    // ─────────────────────────────────────────────────────────────
    // OWNER
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Update the platform fee.
     * @param  newFeeBps  Fee in basis points. Max is MAX_FEE_BPS (1000 = 10%).
     */
    function setFeeBps(uint256 newFeeBps) external onlyOwner {
        if (newFeeBps > MAX_FEE_BPS)
            revert FeeTooHigh(newFeeBps, MAX_FEE_BPS);
        emit FeeBpsUpdated(feeBps, newFeeBps);
        feeBps = newFeeBps;
    }

    /// @notice Pause cause creation and donations.
    function pause()   external onlyOwner { _pause(); }

    /// @notice Resume normal operations.
    function unpause() external onlyOwner { _unpause(); }
}