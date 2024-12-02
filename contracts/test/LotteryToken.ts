// ref: https://github.com/Encode-Club-Solidity-Bootcamp/Lesson-07
// https://github.com/Encode-Club-Solidity-Bootcamp/Lesson-06

import { expect } from "chai";
import { toHex, hexToString } from "viem";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployContract() {
    const publicClient = await viem.getPublicClient();
    const [deployer, otherAccount] = await viem.getWalletClients();
    const tokenContract = await viem.deployContract("Lottery Token", ["LTK"]);
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
});

