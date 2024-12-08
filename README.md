# Encode Club EVM Bootcamp Group 2, Assignment 5: Blockchain Lottery App
- [Encode Club EVM Bootcamp Group 2, Assignment 5: Blockchain Lottery App](#encode-club-evm-bootcamp-group-2-assignment-5-blockchain-lottery-app)
  - [Overview](#overview)
  - [Demo](#demo)
- [Smart Contract Deployment](#smart-contract-deployment)
  - [Verifying Deployed Contracts With Hardhat: `hardhat-verify` Plugin](#verifying-deployed-contracts-with-hardhat-hardhat-verify-plugin)
  - [Install Instructions](#install-instructions)
    - [Install Steps](#install-steps)
- [Personal Notes: Bootstrapping Project](#personal-notes-bootstrapping-project)

## Overview

This project leverages learnings from the [Browser-based Voting App](https://github.com/codesport/erc20votes-part2). 


It is a web-based Lottery application which demonstrates the following **on-chain read-write functionalities** using wagmi/viem:

   * Buy/Return tokens
   * View/Place bets
   * Run lottery
   * Check lottery state
   * View/Claim prizes
   * Lottery admin
   * Bonus: Organize, document and optimize the smart contract

It terms of team responsibilities, there are 3-core parts:

1. Unit-testing [within hardhat](contracts/test/) 
2. UI and UX using Nextjs-React along with Tailwind and complemenatry CSS element libraries like shadcn.
3. Writing functional components using wagmi hooks for **on-chain read-write functions**


## Demo

https://github.com/codesport/blockchain-lottery/blob/master/images/Screen_Recording_2024-12-03_at_11.57.27_PM.mov

# Smart Contract Deployment

The script used to deploy the contract is located here: https://github.com/codesport/blockchain-lottery/blob/master/contracts/scripts/02-deploy-lottery.ts


```

// npx ts-node scripts/02-deploy-lottery.ts

import { client, fs, contractAddressStoragePath, requestUserInput, readKeyValue, appendKeyValue, } from "./config";
import { abi as LottoABI, bytecode as LottoByteCode } from "../artifacts/contracts/Lottery.sol/Lottery.json";
import { parseEther } from "viem";



// TOKEN_RATIO = 200 : 1 ==> 1 ETH = 2000 tokens  ==> 1 token = .0005 ETH

const MAXUINT256 =
    115792089237316195423570985008687907853269984665640564039457584007913129639935n;

const TOKEN_NAME = "Delta Lotto Token"
const SYMBOL = "DELTA"
const TOKEN_RATIO = 2000n; //this is a bigInt n is necessary!
const BET_PRICE = "10";  //Amount of tokens required for placing a bet that  goes for the prize pool
const BET_FEE = "0.2";

const main = async () => {

    const hash = await client.deployContract({
        abi: LottoABI,
        bytecode: LottoByteCode as `0x${string}`, // hexadecimal string, which is the standard format for Ethereum bytecode.
        args: [TOKEN_NAME, SYMBOL, TOKEN_RATIO, parseEther(BET_PRICE), parseEther(BET_FEE),],
    });

    console.log(`\nTransaction hash: ${hash}`);
    const receipt = await client.waitForTransactionReceipt({ hash });
    // const receipt = await publicClient.waitForTransactionReceipt({ hash: customnameTxHash });

    console.log("Lotto contract successfully deployed to:", receipt.contractAddress);
    //const LottoAddressToSave = { "lottoAddress": receipt.contractAddress }

    const tokenAddressToSave = await client.readContract({
        address: receipt.contractAddress as `0x${string}`,
        abi: LottoABI,
        functionName: 'paymentToken',
    })
    console.log(TOKEN_NAME, 'contract successfully deployed to:', tokenAddressToSave);


    const contactAddressesToSave = { "lottoAddress": receipt.contractAddress, "tokenAddress": tokenAddressToSave }

    fs.writeFileSync(contractAddressStoragePath, JSON.stringify(contactAddressesToSave));

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

## Verifying Deployed Contracts With Hardhat: `hardhat-verify` Plugin

* [Deployed and Verified Lotto Game Contract](https://sepolia.etherscan.io/address/0xb638eb5287c9378d779e397976cda76eb91a6836)
  
   ![Lotto Game Deploy](/images/lotto-game-deploy.png)

      ![Lotto Game Verificsation](/images/lotto-game-verification.png)

* [Deployed and Verified Delta ERC20 Token Contract](https://sepolia.etherscan.io/address/0x01515A57ca4D713272409FE16c3229C0C1ac81fb)

As per the [hardhat docs](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#complex-arguments), configure `harhat.config`.ts and create a `arguments.ts` if working complex constructors. 


```
// arguments.ts
// c.f., https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#complex-arguments

import { parseEther } from "viem";

module.exports = [
    "Delta Lotto Token",
    "DELTA",
    2000n,   // uint256: 1 ETH = 2000 DELTA tokens.   1 DELTA = 1/2000 ETH = 0.0005 ETH
    parseEther("10"),  // uint256: 10 = Amount of tokens required for placing a bet that  goes for the prize pool
    parseEther("0.2"), // uint256: 20% = fee to protocol
]
```

Add one of the below to your hardhat config file depending if you're verifying a contract on one or multiple chains:

```
// Version 1 for single chain:  hardhat.config.ts
etherscan: {
    apiKey: ETHERSCAN_API_KEY
},
```

```
// Version 2 for multiple chains: hardhat.config
// npx hardhat verify --list-networks
  etherscan: {
    apiKey: {
        sepolia: "YOUR_ETHERSCAN_API_KEY",
        baseSepolia: "YOUR_ETHERSCAN_API_KEY",
        arbitrumSepolia: "YOUR_ETHERSCAN_API_KEY",
        optimismSepolia: "YOUR_ETHERSCAN_API_KEY",
    }
  }
```

Then run:

`npx hardhat verify 0xb638eb5287c9378d779e397976cda76eb91a6836 --network sepolia  --constructor-args arguments.ts`

For simple contructors, do the following:

`npx hardhat verify 0x01515A57ca4D713272409FE16c3229C0C1ac81fb --network sepolia  "Delta Lotto Token" "DELTA"`



## Install Instructions

This repo contains 2 directories: `contracts` and `nextjs`

* `contracts` contains all files and dependencies for Hardhat/Viem contract development, deployment and testing.

* `nextjs` is the front and backend server for connecting the browser to the blockchain

pnpm is the package manager. However, yarn and npm should also work. In the isntructions below, you can typcially subsititute the keyword `pnpm` for `npm`

### Install Steps
In your terminal do the following:

1. Clone this repo
2. **Important:**  rename `public.gitignore` to .gitignore in the parent folder. It will serve as the parent .gitignore for your subdirectories.  Your directory structure should look like this:
 
   ![directory top level](/images/toplevel-directory.png)

3. Go to the nextjs directory: `cd blockchain-lottery/nextjs`
4. Install the frontend project: 
   * Add a .env file with any necessary enviornment variables as discussed in previous classes
   * Add a special nextjs environment variable to .env:
      * Include your custom RPC url and assign it as `NEXT_PUBLIC_SEPOLIA_RPC_URL_2="<custom alchemy or infura rpc url>"`
   * Run: `pnpm install`
   
5. Launch Next.js server: `pnpm dev`.  You should see the below in your browser:

   ![directory top level](/images/version1.png)

6. Go to hardhat directory: `cd ../contracts`
7. Install hardhat project:  `pnpm install`
   - **Important:** If you plan to run smart contract tests, scripts, or compile contracts please rename `hardhat.config-public-copy.ts` to `hardhat.config.ts`.  Be sure to further configure it to include any ncessary environment variables as discussed in previous lessons!



# Personal Notes: Bootstrapping Project

These are my personal notes.  So, please follow instructions above for installing repo.

Command line workflow for bootstrapping this repo:
```
mkdir week5
cd week5
mkdir contracts && cd contracts
pnpm init
pnpm add -D hardhat   # same as: pnpm install -D hardhat 
pnpm install dotenv
pnpm add @openzeppelin/contracts # same as: pnpm install @openzeppelin/contracts
pnpm dlx hardhat init  # if using npm try: npx hardhat init
pnpm hardhat test
rm .gitignore
rm -rf .git

npx hardhat compile # pnpm dlx hardhat compile
mkdir nextjs && cd nextjs
pnpm create next-app@latest
pnpm add wagmi viem@2.x @tanstack/react-query
rm .gitignore
rm -rf .git

cd ../../

git init # install and manage git in parent folder, week5
```

Install rainbowkit files (layout.tsx, providers.tsx, wagmi.ts) from [`with-next-app` example](https://github.com/codesport/rainbowkit/tree/main/examples/with-next-app/src/app)



