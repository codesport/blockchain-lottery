// ref: https://github.com/Encode-Club-Solidity-Bootcamp/Lesson-07
// https://github.com/Encode-Club-Solidity-Bootcamp/Lesson-06

import { expect } from "chai";
import { toHex, hexToString } from "viem";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployContract() {
    const publicClient = await viem.getPublicClient();
    const [deployer, otherAccount] = await viem.getWalletClients();
    const tokenContract = await viem.deployContract("LotteryToken", ["LTK"]);
    return { publicClient, deployer, otherAccount, tokenContract };
}

describe("Token Contract", async () => {
    it("has the contract name as Lottery Token", async () => {

        //deploy new fixture for each isolated (independent) "it" test scenario
        const { tokenContract } = await loadFixture(deployContract);

        expect(await tokenContract.read.name()).to.equal("Lottery Token");

        //owner, symbol, totalSupply, decimals, balanceOf
        // const minterRole = await contract.MINTER_ROLE();
    });

    it("should return the proper amount of decimals for the lottery token", async function () {
        const { tokenContract } = await loadFixture(deployContract);
        expect(await tokenContract.read.decimals()).to.equal(18); // default from ERC20 openzepplin contract
    })

    it("should set the initial owner to the deployer account upon deployment", async () => {
        const { tokenContract, deployer } = await loadFixture(deployContract);
    });
});

describe("Interacting with Lottery", function () {
    it('should place a bet with 20 tokens when the lottery is open', async function () {

    });

    it('should not allow bets to be placed when the lottery is closed', async function () {

    })

    it('should purchase tokens for betting', async function () {

    });

    it('should view bets that have been placed', async function () {

    });

    it('should close the lottery after the closing block time', async function () {

    });

    it('should allow the owner to withdraw their tokens once the lottery is closed', async function () {

    });

    it('should return the tokens and give the equivalent eth to the winner', async function () {

    })
})
