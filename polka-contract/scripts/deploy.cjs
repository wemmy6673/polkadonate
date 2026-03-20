const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying with account:', deployer.address)
  console.log('Account balance:', (await ethers.provider.getBalance(deployer.address)).toString())

  const Donation = await ethers.getContractFactory('Donation')
  const donation = await Donation.deploy(deployer.address)

  await donation.waitForDeployment()

  const address = await donation.getAddress()
  console.log('Donation contract deployed to:', address)
  console.log('Update src/contracts/addresses.js with:', address)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })