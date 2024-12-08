'use client'

import * as React from 'react';
import { type BaseError, useWaitForTransactionReceipt, useSendTransaction, useWriteContract, useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { abi } from "../utils/Lottery.json";
import TokenAbi from '../../../contracts/artifacts/contracts/LotteryToken.sol/LotteryToken.json';
import { write } from 'fs';


export function BuyTokens() {
    const { address, isConnected } = useAccount();

    const { data: hash, error, isPending, writeContract } = useWriteContract()

    let tokenAddress = '0x01515A57ca4D713272409FE16c3229C0C1ac81fb';
    let lotteryAddress = '0xB638EB5287c9378D779e397976CDA76EB91a6836';

    async function buyTokens(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const value = formData.get('value') as string;
        writeContract({
            abi,
            address: lotteryAddress,
            functionName: 'purchaseTokens',
            value: parseEther(value)
        })
    }

    return (
        <form onSubmit={buyTokens}>
        <input name='value' placeholder='ETH to Send'></input>
        <button
            disabled={isPending}
            type="submit"
        >
            {isPending ? 'Confirming...' : 'Buy Tokens'}
        </button>
    </form>
    )

}