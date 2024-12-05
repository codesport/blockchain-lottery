'use client'

import * as React from 'react';
import { type BaseError, useWaitForTransactionReceipt, getContract, useWriteContract, useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import LotteryAbi from '../../../contracts/artifacts/contracts/Lottery.sol/Lottery.json';
import TokenAbi from '../../../contracts/artifacts/contracts/LotteryToken.sol/LotteryToken.json';

export function PrizeWithdrawalForWinner() {
    const { address, isConnected } = useAccount(); // Wagmi hook for getting the current account

    const { data: hash, writeContract, isPending } = useWriteContract(); // action for executing a write function on a contract - these functions require gas to be executed, and a tx needs to be broadcasted to update state on the blockchain

    async function prizeWithdraw(e: React.FormEvent<HTMLFormElement>) {
        // need to pass in the amount that the person will withdraw from the prize pool from some form
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const amountToWithdraw = formData.get('amount');

        writeContract({
            address: "LOTTERY-ADDRESS",
            abi: LotteryAbi,
            functionName: 'prizeWithdraw',
            args: [amountToWithdraw]
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
    })

    return (
        <form onSubmit={prizeWithdraw}>
            <input name="tokenQuantity" className="w-sm p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount to Withdraw From Prize Pool" required />
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                disabled={isPending}
                type="submit"
            >
                {isPending ? 'Confirming...' : 'Withdraw Prize Money'}
            </button>

            {/* useSendTransaction Hook */}
            {hash && <div>Transaction Hash: {hash}</div>}

            {/* useWaitForTransactionReceipt Hook */}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
    </form >
    )
}

export function WithdrawOwnerRewards() {
    const { address, isConnected } = useAccount(); // Wagmi hook for getting the current account

    const { data: hash, writeContract, isPending } = useWriteContract(); // action for executing a write function on a contract - these functions require gas to be executed, and a tx needs to be broadcasted to update state on the blockchain

    async function ownerWithdrawal(e: React.FormEvent<HTMLFormElement>) {
                // need to pass in the amount that the person will withdraw from the prize pool from some form
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const amountToWithdraw = formData.get('amount');
        
                writeContract({
                    address: "LOTTERY-ADDRESS",
                    abi: LotteryAbi,
                    functionName: 'prizeWithdraw',
                    args: [amountToWithdraw]
                })
    }

    return (
        <form onSubmit={ownerWithdrawal}>
        <input name="tokenQuantity" className="w-sm p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount to Withdraw From Prize Pool (Owner)" required />
        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            disabled={isPending}
            type="submit"
        >
            {isPending ? 'Confirming...' : 'Withdraw Prize Money'}
        </button>

        {/* useSendTransaction Hook */}
        {hash && <div>Transaction Hash: {hash}</div>}
</form >

    )
}