// @ts-ignore
import {assert, web3, artifacts} from "hardhat";
import chai, {expect} from 'chai'
import {solidity} from "ethereum-waffle";
import {MockErc20Instance} from "../types/truffle-contracts";

chai.use(solidity);

// @ts-ignore
const MockErc20 = artifacts.require("MockErc20");
const BN_1E18 = web3.utils.toBN(1e18);

describe("MockErc20", () => {
    let accounts: string[];
    let [deployer, alice, bob, carl]: string[] = [];
    let mockErc20Instance: MockErc20Instance;

    beforeEach(async function () {
        accounts = await web3.eth.getAccounts();
        [deployer, alice, bob, carl] = accounts;
        mockErc20Instance = await MockErc20.new("Test Erc20 Token", "tToken", 18);
    });

    describe("mint", async () => {
        it("mint one", async () => {
            await mockErc20Instance.mint(alice, 1);
            assert.equal(Number((await mockErc20Instance.balanceOf(alice)).toString()), 1);
        })
    });

});
