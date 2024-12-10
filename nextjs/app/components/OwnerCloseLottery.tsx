"use client";

import * as React from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract /*useAccount*/,
} from "wagmi";
import { abi } from "../utils/Lottery.json";
import contractAddresses from "../utils/contract-data.json";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

/**
 * OwnerCloseLottery Component
 * 
 * This component provides functionality for the lottery owner to close an active lottery.
 * It interacts with the Lottery smart contract using the closeLottery function.
 * 
 * Features:
 * - Allows lottery owner to close the current lottery session
 * - Handles transaction submission and monitoring
 * - Provides feedback on transaction status
 * - Displays any errors that occur during the process
 * 
 * Requirements:
 * - User must be the owner of the lottery contract
 * - A lottery must be currently active
 * 
 * @component
 * @returns {JSX.Element} A form with a button to close the lottery
 */
const OwnerCloseLottery = () => {
  // Address of the deployed lottery contract
  const lotteryAddress = contractAddresses.lottoAddress;

  // Hook to interact with the smart contract
  const { 
    data: hash,           // Transaction hash after submission
    error,                // Any errors that occur during transaction
    isPending,            // Whether transaction is pending
    writeContract         // Function to send the transaction
  } = useWriteContract();

  /**
   * Handles the submission of the close lottery transaction
   * 
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event
   */
  const handleCloseLottery = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Call the closeLottery function on the smart contract
      writeContract({
        address: lotteryAddress as `0x${string}`,
        abi: abi,
        functionName: "closeLottery",
      });
    } catch (errorUgly) {
      console.log("Node Error Output", errorUgly);
      console.log("Wagmi Error Output", error);
    }
  };

  // Hook to track transaction confirmation status
  const { 
    isLoading: isConfirming,  // Whether transaction is being confirmed
    isSuccess: isConfirmed    // Whether transaction has been confirmed
  } = useWaitForTransactionReceipt({ hash });

  return (
    <React.Fragment>
      <form id="ownerWithdrawForm" onSubmit={handleCloseLottery}>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Click to Close Lottery
        </label>

        {/* Submit button that disables while transaction is pending */}
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Confirming..." : "Closing Lottery"}
        </Button>

        {/* Transaction status feedback section */}
        {hash && <div>Transaction Hash: {hash}</div>}
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

export default OwnerCloseLottery;
