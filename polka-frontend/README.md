# PolkaDonate 🔶

> Decentralized fundraising dApp on Polkadot Hub — swap DOT for PDT tokens, create causes, and donate on-chain.

---

## Tech Stack

| Layer        | Tech                                      |
|--------------|-------------------------------------------|
| Frontend     | React 18 + Vite                          |
| Styling      | Tailwind CSS v3                           |
| Routing      | React Router v6                           |
| State        | Zustand                                   |
| Web3         | ethers.js v6                              |
| Contracts    | Solidity + OpenZeppelin (ERC-20)          |
| Storage      | IPFS via Pinata                           |
| Network      | Polkadot Hub Testnet (ChainID 420420421)  |

---

## Project Structure

```
polkadonate/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                   # Entry point
    ├── App.jsx                    # Router setup
    ├── styles/
    │   └── globals.css            # Tailwind + custom CSS (grid bg, animations)
    ├── pages/
    │   ├── Home.jsx               # Landing page
    │   ├── Swap.jsx               # DOT → PDT swap
    │   ├── Causes.jsx             # Browse & donate to campaigns
    │   ├── Create.jsx             # Launch a new fundraiser
    │   └── Dashboard.jsx          # User overview
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.jsx         # Page wrapper (grid bg, navbar, footer)
    │   │   ├── Navbar.jsx         # Sticky nav + wallet connect
    │   │   └── Footer.jsx
    │   ├── ui/                    # Reusable primitives
    │   │   ├── Button.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Card.jsx
    │   │   ├── Badge.jsx
    │   │   ├── ProgressBar.jsx
    │   │   ├── TokenInput.jsx
    │   │   ├── RateRow.jsx
    │   │   ├── SectionHeader.jsx
    │   │   └── ToastContainer.jsx
    │   ├── wallet/
    │   │   └── WalletModal.jsx    # Connect wallet (Polkadot.js / WC / MetaMask)
    │   ├── swap/
    │   │   └── SwapCard.jsx       # Swap UI card
    │   ├── causes/
    │   │   ├── CauseCard.jsx      # Single campaign card
    │   │   ├── CauseGrid.jsx      # Filterable grid of causes
    │   │   └── DonateModal.jsx    # Approve + donate flow
    │   ├── create/
    │   │   └── CreateCauseForm.jsx # 3-step wizard
    │   └── dashboard/
    │       ├── BalanceCard.jsx
    │       ├── MyCausesCard.jsx
    │       └── ActivityFeed.jsx
    ├── hooks/
    │   ├── useWallet.js           # Connect / disconnect wallet
    │   ├── useSwap.js             # SwapContract interactions
    │   ├── useDonate.js           # approve() + donate() sequence
    │   └── useIPFS.js             # Upload / fetch IPFS metadata
    ├── store/
    │   ├── walletStore.js         # Zustand: address, balances
    │   ├── causeStore.js          # Zustand: causes list
    │   └── toastStore.js          # Zustand: toast queue
    ├── data/
    │   └── causes.js              # Static seed data + category list
    ├── contracts/
    │   ├── addresses.js           # Deployed contract addresses
    │   └── abis/
    │       ├── ERC20Token.json
    │       ├── SwapContract.json
    │       └── DonationFactory.json
    └── utils/
        ├── formatters.js          # Token / address / date formatters
        └── cn.js                  # clsx helper
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Connecting to Polkadot Hub Testnet

Add the network to MetaMask:

| Field           | Value                                              |
|-----------------|----------------------------------------------------|
| Network Name    | Polkadot Hub Testnet                               |
| RPC URL         | https://testnet-passet-hub-eth-rpc.polkadot.io     |
| Chain ID        | 420420421                                          |
| Currency Symbol | DOT                                                |
| Block Explorer  | https://blockscout-passet-hub.parity-testnet.parity.io |

---

## Deploying Contracts

After deploying your Solidity contracts, update `src/contracts/addresses.js`:

```js
export const ADDRESSES = {
  ERC20_TOKEN:      '0xYourERC20Address',
  SWAP_CONTRACT:    '0xYourSwapAddress',
  DONATION_FACTORY: '0xYourFactoryAddress',
}
```

Then wire `useSwap.js`, `useDonate.js`, and `useWallet.js` to use `ethers.js`
`BrowserProvider` and the ABIs from `src/contracts/abis/`.

---

## Environment Variables

Create `.env` at root:

```env
VITE_RPC_URL=https://testnet-passet-hub-eth-rpc.polkadot.io
VITE_CHAIN_ID=420420421
VITE_PINATA_API_KEY=your_pinata_key
VITE_PINATA_SECRET=your_pinata_secret
```

---

## Build for Production

```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, or IPFS
```
