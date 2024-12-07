'use client'

import * as React from 'react';
import { type BaseError, useWaitForTransactionReceipt, getContract, useWriteContract, useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import LotteryAbi from '../../../contracts/artifacts/contracts/Lottery.sol/Lottery.json';
import TokenAbi from '../../../contracts/artifacts/contracts/LotteryToken.sol/LotteryToken.json';

export function Bet() {

    const { address, isConnected } = useAccount(); // Wagmi hook for getting the current account

    const { data: hash, writeContract, isPending } = useWriteContract(); // action for executing a write function on a contract - these functions require gas to be executed, and a tx needs to be broadcasted to update state on the blockchain

    let tokenAddress = '0x01515A57ca4D713272409FE16c3229C0C1ac81fb';
    let lotteryAddress = '0xB638EB5287c9378D779e397976CDA76EB91a6836';

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
                {isPending ? 'Confirming...' : 'Bet'}
            </button>

            {/* useSendTransaction Hook */}
            {hash && <div>Transaction Hash: {hash}</div>}

            {/* useWaitForTransactionReceipt Hook */}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
        </form>
    )
}