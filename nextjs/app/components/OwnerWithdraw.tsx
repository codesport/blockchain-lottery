"use client";

import * as React from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract /*useAccount*/,
} from "wagmi";
import { abi } from "../utils/Lottery.json";
import contractAddresses from "../utils/contract-data.json";
import { parseEther } from "viem";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

/**
 * OwnerWithdraw Component
 *
 * This component provides the lottery owner with functionality to withdraw funds from the lottery contract.
 * It includes a form with an input field for the withdrawal amount and handles the blockchain transaction.
 *
 * Key Features:
 * - Input field for specifying withdrawal amount in ETH
 * - Form submission handling with blockchain interaction
 * - Transaction status updates and error handling
 * - Real-time feedback on transaction progress
 */
const OwnerWithdraw = () => {
  // Contract address from configuration
  const lotteryAddress = contractAddresses.lottoAddress;

  // Wagmi hook for contract writes - provides transaction handling functionality
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  /**
   * Form submission handler for withdrawing funds
   * @param event - Form submission event
   *
   * The function:
   * 1. Prevents default form submission
   * 2. Extracts withdrawal amount from form
   * 3. Initiates blockchain transaction using wagmi's writeContract
   * 4. Handles any errors during the process
   */
  // TODO: Replace 'any' with proper FormEvent type
  const handleWithdraw = async (event: any) => {
    event.preventDefault();
    console.log(
      "Output from Form Submit: " + event.target.formWithdrawAmount.value
    );

    try {
      writeContract({
        address: lotteryAddress as `0x${string}`,
        abi: abi,
        functionName: "ownerWithdraw",
        args: [parseEther(event.target.formWithdrawAmount.value)], // Converts ETH amount to Wei
      });
    } catch (errorUgly) {
      console.log("Node Error Output", errorUgly);
      console.log("Wagmi Error Output", error);
    }
  };

  // Hook to track transaction confirmation status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return (
    <React.Fragment>
      <form id="ownerWithdrawForm" onSubmit={handleWithdraw}>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Amount (ETH)
        </label>

        {/* Input field for withdrawal amount 
            - Type 'number' ensures numeric input
            - Name attribute used for form data extraction
        */}
        <Input
          placeholder="0.00"
          name="formWthdrawAmount"
          type="number"
          className="w-full"
        />

        {/* Submit button with loading state handling */}
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Confirming..." : "Withdraw Funds"}
        </Button>

        {/* Transaction status feedback section */}
        {/* Shows transaction hash when available */}
        {hash && <div>Transaction Hash: {hash}</div>}

        {/* Shows confirmation status */}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}

        {/* Error display section */}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </form>
    </React.Fragment>
  );
};

export default OwnerWithdraw;
