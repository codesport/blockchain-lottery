'use client'

import * as React from 'react';
import { type BaseError, useWaitForTransactionReceipt, getContract, useWriteContract, useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { abi } from "../utils/Lottery.json";
import TokenAbi from '../../../contracts/artifacts/contracts/LotteryToken.sol/LotteryToken.json';

export function BetMany() {

    const { address, isConnected } = useAccount(); // Wagmi hook for getting the current account

    const { data: hash, writeContract, isPending } = useWriteContract(); // action for executing a write function on a contract - these functions require gas to be executed, and a tx needs to be broadcasted to update state on the blockchain

    let lotteryAddress = '0xB638EB5287c9378D779e397976CDA76EB91a6836';

    async function betMany(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const times = formData.get('timesToBet');
        writeContract({
            address: lotteryAddress as `0x${string}`,
            abi: abi,
            functionName: "betMany",
            args: [times]
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    return (
        <form onSubmit={betMany}>
            <input name="times" placeholder='Number of Times to Bet'></input>
            <button className="betting"
                disabled={isPending}
                type="submit"
            >
                {isPending ? 'Confirming...' : 'Place Multiple Bets'}
            </button>

            {/* useSendTransaction Hook */}
            {hash && <div>Transaction Hash: {hash}</div>}

            {/* useWaitForTransactionReceipt Hook */}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
        </form>
    )
}