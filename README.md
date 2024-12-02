# Encode Club EVM Bootcamp Group 2, Assignment 5: Blockchian Lottery App
- [Encode Club EVM Bootcamp Group 2, Assignment 5: Blockchian Lottery App](#encode-club-evm-bootcamp-group-2-assignment-5-blockchian-lottery-app)
  - [Overview](#overview)
  - [Install Intructions](#install-intructions)
    - [Install Steps](#install-steps)

## Overview

This project leverages learnings from the [Browser-based Voting App](https://github.com/codesport/erc20votes-part2). 


It is a browser based application which demonstrates the following **on-chain read-write functionalities** using wagmi/viem:

   * Buy/Return tokens
   * View/Place bets
   * Run lottery
   * Check lottery state
   * View/Claim prizes
   * Lottery admin
   * Bonus: Organize, document and optimize the smart contract

It terms of team responsibilities, there are 3-core parts:

1. UI and UX using Nextjs-React along with Tailwind and complemenatry CSS element libraries like shadcn.
2. Writing functional components using wagmi hooks for **on-chain read-write functions**
3. Unit-testing within hardhat 

## Install Intructions

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
4. Install the frontend project:  `pnpm install`
5. Luanch Next.js sever: `pnpm dev`.  You should see the below in your browser:

   ![directory top level](/images/version1.png)

6. Go to parent hardhat directory: `cd ../contracts`
7. Install hardhat project:  `pnpm install`
   - **Important:** If you plan to run smart contract tests, scripts, or compile contracts please rename `hardhat.config-public-copy.ts` to `hardhat.config.ts`.  Be sure to further configure it to include any ncessary environment variables as discussed in previous lessons!



