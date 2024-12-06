# Verifying Deployed Contracts With Hardhat: `hardhat-verify` Plugin

* [Deployed and Verified Lotto Game Contract](https://sepolia.etherscan.io/address/0xb638eb5287c9378d779e397976cda76eb91a6836)
  
   ![Lotto Game Deploy](/images/lotto-game-deploy.png)

      ![Lotto Game Verificsationy](/images/lotto-game-verification.png)

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