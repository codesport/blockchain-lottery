# Encode Club EVM Bootcamp Group 2, Assignment 5: Blockchian Lottery App

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

* `nextjs` is the front and backend server for connecting the brower to the blockchain

pnpm is the package manager. However, yarn and npm should also work. In the isntructions below, you can typcially subsititute the keyword `pnpm` for `npm`

### Install Steps
In your terminal do the following:

1. Clone this repo
2. **Important:** Place a `.gitignore` in the parent folder. It will server as the parent .gitignore for your subdirectories.  Your directory structure should look like this:
 
 - ![directory top level](/images/toplevel-directory.png)

 - At minimum your gitignore shoould contain:
   ```
   # Ignore sensitive, personal, and custom files
    *.env*

   # Ignore Package Manager Files
   node_modules
   pnpm-lock.yaml
   package-lock.json
   yarn.lock

   # NEXTJS
   # dependencies
   /node_modules
   /.pnp
   .pnp.*
   .yarn/*
   !.yarn/patches
   !.yarn/plugins
   !.yarn/releases
   !.yarn/versions

   # testing
   /coverage

   # next.js
   /.next/
   /out/

   # production
   /build

   # misc
   .DS_Store
   *.pem

   # debug
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*

   # env files (can opt-in for committing if needed)
   .env*

   # vercel
   .vercel

   # typescript
   *.tsbuildinfo
   next-env.d.ts
   ```
3. Go to the nextjs directory: `cd blockchain-lottery/nextjs`
4. Install frontend project:  `pnpm install`
5. Go to parent hardhat directory: `cd ../contracts`
6. Install hardhat project:  `pnpm install`
   - **Important:** If you plan to run smart contract tests, scripts, or compile contracts please rename `hardhat.config-public-copy.ts` to `hardhat.config.ts`.  Be sure to further configure it to include any ncessary environment variables as discussed in previous class lectures/



