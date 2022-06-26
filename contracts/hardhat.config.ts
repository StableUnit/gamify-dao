import dotenv from 'dotenv'
const envPath = "../.env/.env";
dotenv.config({path: envPath});

import "@nomiclabs/hardhat-truffle5";

require("@nomiclabs/hardhat-web3");
import {task} from "hardhat/config";
import "solidity-coverage";
import "@nomiclabs/hardhat-waffle";

import "./tasks/mockerc20-mint.ts";


const {
    INFURA_KEY,
    MNEMONIC,
    ETHERSCAN_API_KEY,
    PRIVATE_KEY,
    PRIVATE_KEY_TESTNET
} = process.env;

const accountsTestnet = PRIVATE_KEY_TESTNET
    ? [PRIVATE_KEY_TESTNET]
    : {mnemonic: MNEMONIC};

const accountsMainnet = PRIVATE_KEY
    ? [PRIVATE_KEY]
    : {mnemonic: MNEMONIC};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
    solidity: {
        version: "0.8.10",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },

    networks: {
        hardhat: {},
        mainnet: {
            url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
            accounts: accountsMainnet,
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
            accounts: accountsTestnet,
        },
        polygon: {
            url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
            accounts: accountsMainnet,
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
            accounts: accountsTestnet,
        }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY
    }
};
