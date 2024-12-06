
// c.f., https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#complex-arguments

import { parseEther } from "viem";
module.exports = [
    "Delta Lotto Token",
    "DELTA",
    2000n,   // uint256: 1 ETH = 2000 DELTA tokens.   1 DELTA = 1/2000 ETH = 0.0005 ETH
    parseEther("10"),  // uint256: 10 = Amount of tokens required for placing a bet that  goes for the prize pool
    parseEther("0.2"), // uint256: 20% = fee to protocol
]