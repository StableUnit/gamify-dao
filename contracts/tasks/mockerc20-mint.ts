import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-waffle";

import {task} from "hardhat/config";

/**
 * launch with the  command:
 * npx hardhat mint --token 0xDA8B736f3A6240A5f3c7A69044F326642f3d9B68 --wallet 0xe1DF4a122a7cA8Ed8617aDe4dd8532A1c1C3606a --amount 1 --network rinkeby --verbose
 */

task("mint", "Calls mint of deployed MockErc20 token")
    .addParam("token", "Address of the MockErc20 token")
    .addParam("wallet", "Address of where to mint")
    .addParam("amount", "Amount of coins to mint")
    .setAction(async (taskArgs, hre) => {

        const {token: tokenAddress, wallet: walletAddress, amount: amount} = taskArgs;

        const MockErc20Factory = await hre.ethers.getContractFactory("MockErc20");

        const mockErc20Instance = MockErc20Factory.attach(tokenAddress);

        const tx1 = await mockErc20Instance.mint(walletAddress, amount);
        await tx1.wait();
        console.log(`Transaction hash: ${tx1.hash}`);
    });

export default {};
