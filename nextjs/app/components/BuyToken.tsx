'use client'

import * as React from 'react';
import { type BaseError, useWaitForTransactionReceipt, getContract, useWriteContract, useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import LotteryAbi from '../../../contracts/artifacts/contracts/Lottery.sol/Lottery.json';
import TokenAbi from '../../../contracts/artifacts/contracts/LotteryToken.sol/LotteryToken.json';


export function BuyTokens() {
    const { address, isConnected } = useAccount();

    const { data: hash, writeContract, isPending } = useWriteContract();

    let tokenAddress;
    let lotteryAddress;

    async function buyTokens() {
        writeContract({
            // purchase tokens will give tokens based on the amt of eth sent
            address: lotteryAddress as `0x${string}`,
            abi: LotteryAbi,
            functionName: 'purchaseTokens'
        })
    }

    return (
        // TODO: How to implement the msg.value? just a form here? 
    )

}