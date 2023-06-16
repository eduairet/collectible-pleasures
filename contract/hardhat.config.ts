import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const { SEPOLIA_URL, PRIVATE_KEY, ETHERSCAN_KEY } = process.env;

const config: HardhatUserConfig = {
    solidity: '0.8.18',
    defaultNetwork: 'hardhat',
    networks: {
        sepolia: {
            url: SEPOLIA_URL,
            accounts: [PRIVATE_KEY || '']
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_KEY,
    },
};

export default config;
