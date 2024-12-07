'use client'

import * as React from 'react';
import { type BaseError, useWaitForTransactionReceipt, getContract, useWriteContract, useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import LotteryAbi from '../../../contracts/artifacts/contracts/Lottery.sol/Lottery.json';
import TokenAbi from '../../../contracts/artifacts/contracts/LotteryToken.sol/LotteryToken.json';


export function BuyTokens() {
    const { address, isConnected } = useAccount();

    const { data: hash, writeContract, isPending } = useWriteContract();
 
    let tokenAddress = '0x01515A57ca4D713272409FE16c3229C0C1ac81fb';
    let lotteryAddress = '0xB638EB5287c9378D779e397976CDA76EB91a6836';

    async function buyTokens() {
        writeContract({
            // purchase tokens will give tokens based on the amt of eth sent
            address: lotteryAddress as `0x${string}`,
            abi: LotteryAbi,
            functionName: 'purchaseTokens'
        })
    }

    return (
        <form onSubmit={buyTokens}>
        <input name='address'></input>
        <input name='tokenQuantity'></input>
        <button
            disabled={isPending}
            type="submit"
        >
            {isPending ? 'Confirming...' : 'Buy Tokens'}
        </button>
    </form>
    )

}