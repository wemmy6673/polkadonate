require('@nomicfoundation/hardhat-toolbox')
require('@nomicfoundation/hardhat-verify')
require('dotenv').config()

module.exports = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    polkadotTestnet: {
      url:      process.env.RPC_URL,
      chainId:  420420417,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polkadotTestnet: 'no-api-key-needed',
    },
    customChains: [
      {
        network:  'polkadotTestnet',
        chainId:  420420417,
        urls: {
          apiURL:     'https://blockscout-testnet.polkadot.io/api',
          browserURL: 'https://blockscout-testnet.polkadot.io/',
        },
      },
    ],
  },
}