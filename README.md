# Encode Club EVM Bootcamp Group 2, Assignment 5: Blockchian Lottery App
- [Encode Club EVM Bootcamp Group 2, Assignment 5: Blockchian Lottery App](#encode-club-evm-bootcamp-group-2-assignment-5-blockchian-lottery-app)
  - [Overview](#overview)
  - [Install Intructions](#install-intructions)
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

Install rainbowkit files (layout.tsx, providers.tsx, wagmi.ts) from `with-next-app` example



