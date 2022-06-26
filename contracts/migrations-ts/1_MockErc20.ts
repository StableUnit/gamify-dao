import {assertZeroNonce, fundDeployer, prepareVanityAddress, withdrawEther} from "./utils";
import {MockErc20Instance} from "../types/truffle-contracts";
import {getDeployedAddresses} from "./deployed_addresses";

const MockErc20 = artifacts.require("MockErc20");
const DEPLOYER_MIN_BALANCE = web3.utils.toBN(1e18);

module.exports = function (deployer, network, accounts) {
    const [deployer_default, deployer_vanity_1] = accounts;
    const DEPLOYED = getDeployedAddresses(network);
    // @ts-ignore
    deployer.then(async () => {
        let mockErc20Instance: MockErc20Instance;
        if (!DEPLOYED.MOCK_ERC20) {
            await deployer.deploy(
                MockErc20,
                "Test Erc20 Token", "tToken", 18
            );
            mockErc20Instance = await MockErc20.deployed();
        }
    });
} as Truffle.Migration;
export {}
