'use client'

import * as React from 'react';
import { type BaseError, useWaitForTransactionReceipt, getContract, useWriteContract, useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import LotteryAbi from '../../../contracts/artifacts/contracts/Lottery.sol/Lottery.json';
import TokenAbi from '../../../contracts/artifacts/contracts/LotteryToken.sol/LotteryToken.json';

export function Bet() {

    const { address, isConnected } = useAccount(); // Wagmi hook for getting the current account

    const { data: hash, writeContract, isPending } = useWriteContract(); // action for executing a write function on a contract - these functions require gas to be executed, and a tx needs to be broadcasted to update state on the blockchain

    let tokenAddress;
    let lotteryAddress;

    async function bet() {
        writeContract({
            address: lotteryAddress as `0x${string}`,
            abi: LotteryAbi,
            functionName: "bet"
            // no args
        })
    }

    async function betMany(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const times = formData.get('timesToBet');
        writeContract({
            address: lotteryAddress as `0x${string}`,
            abi: LotteryAbi,
            functionName: "betMany",
            args: [times]
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    return (
        <form onSubmit={bet}>
            <input name='address'></input>
            <input name='tokenQuantity'></input>
            <button className="meow"
                disabled={isPending}
                type="submit"
            >
                {isPending ? 'Confirming...' : 'Mint'}
            </button>
        </form>
    )
}

export function PrizeWithdrawal() {
    const { address, isConnected } = useAccount(); // Wagmi hook for getting the current account

    const { data: hash, writeContract } = useWriteContract(); // action for executing a write function on a contract - these functions require gas to be executed, and a tx needs to be broadcasted to update state on the blockchain

    async function prizeWithdraw() {
        // need to pass in the amount that the person will withdraw from the prize pool from some form
    }
}

export function OwnerWithdrawal() {
    async function ownerWithdrawal() {
        // need to pass in amount from some form
    }

    return (
        <button onSubmit={ownerWithdrawal}></button>
    )
}