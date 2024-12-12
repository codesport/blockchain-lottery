"use client";

import * as React from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import { abi } from "../utils/Lottery.json";

/**
 * PrizeWithdrawalForWinner Component
 * 
 * This component provides a form interface for lottery winners to withdraw their prize money.
 * It interacts with the smart contract's prizeWithdraw function to transfer tokens from the
 * prize pool to the winner's wallet.
 * 
 * Features:
 * - Form input for specifying withdrawal amount
 * - Transaction status tracking
 * - Real-time feedback on transaction progress
 * - Error handling for failed transactions
 * 
 * @component
 * @example
 * ```jsx
 * <PrizeWithdrawalForWinner />
 * ```
 */
export function PrizeWithdrawalForWinner() {
  // Contract addresses for the lottery and token
  const tokenAddress = "0x01515A57ca4D713272409FE16c3229C0C1ac81fb";
  const lotteryAddress = "0xB638EB5287c9378D779e397976CDA76EB91a6836";

  // Get user's wallet address and connection status
  const { address, isConnected } = useAccount();

  // Hook for executing contract write operations
  const { data: hash, writeContract, isPending } = useWriteContract();

  /**
   * Handles the prize withdrawal form submission
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  async function prizeWithdraw(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amountToWithdraw = formData.get("amount");

    writeContract({
      address: lotteryAddress as `0x${string}`,
      abi,
      functionName: "prizeWithdraw",
      args: [amountToWithdraw],
    });
  }

  // Hook to track transaction confirmation status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={prizeWithdraw}>
      <input
        name="tokenQuantity"
        className="w-full mb-4 p-3 rounded-[--radius] bg-background text-foreground border-input"
        placeholder="Amount to Withdraw From Prize Pool"
        required
      />
      <button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-[--radius] px-4 py-2 font-medium"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Confirming..." : "Withdraw Prize Money"}
      </button>

      {hash && (
        <div className="mt-4 text-muted-foreground">
          Transaction Hash: {hash}
        </div>
      )}

      {isConfirming && (
        <div className="mt-2 text-muted-foreground">
          Waiting for confirmation...
        </div>
      )}
      {isConfirmed && (
        <div className="mt-2 text-accent-foreground">
          Transaction confirmed.
        </div>
      )}
    </form>
  );
}

/**
 * WithdrawOwnerRewards Component
 * 
 * This component allows the lottery owner to withdraw their accumulated rewards/fees
 * from the lottery contract. Only the contract owner can successfully execute these
 * withdrawals.
 * 
 * Features:
 * - Form input for withdrawal amount
 * - Transaction status tracking
 * - Access control (only owner can successfully execute)
 * - Real-time transaction feedback
 * 
 * Security Considerations:
 * - Only the contract owner can successfully execute withdrawals
 * - Amount validation is performed by the smart contract
 * 
 * @component
 * @example
 * ```jsx
 * <WithdrawOwnerRewards />
 * ```
 */
export function WithdrawOwnerRewards() {
  // Contract addresses for the lottery and token
  const tokenAddress = "0x01515A57ca4D713272409FE16c3229C0C1ac81fb";
  const lotteryAddress = "0xB638EB5287c9378D779e397976CDA76EB91a6836";

  // Get user's wallet address and connection status
  const { address, isConnected } = useAccount();

  // Hook for executing contract write operations
  const { data: hash, writeContract, isPending } = useWriteContract();

  /**
   * Handles the owner withdrawal form submission
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  async function ownerWithdrawal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amountToWithdraw = formData.get("amount");

    writeContract({
      address: lotteryAddress as `0x${string}`,
      abi,
      functionName: "ownerWithdraw",
      args: [amountToWithdraw],
    });
  }

  return (
    <form onSubmit={ownerWithdrawal}>
      <input
        name="tokenQuantity"
        className="w-full mb-4 p-3 rounded-[--radius] bg-background text-foreground border-input"
        placeholder="Amount to Withdraw From Prize Pool (Owner)"
        required
      />
      <button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-[--radius] px-4 py-2 font-medium"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Confirming..." : "Withdraw Prize Money"}
      </button>

      {hash && (
        <div className="mt-4 text-muted-foreground">
          Transaction Hash: {hash}
        </div>
      )}
    </form>
  );
}
