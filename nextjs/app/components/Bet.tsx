"use client";

import * as React from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import { Button } from "@/app/components/ui/button";
import { abi } from "../utils/Lottery.json";

export function Bet() {
  // Get user's wallet connection status
  const { isConnected } = useAccount();

  // Hook for executing contract write operations
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Contract address for the lottery
  const lotteryAddress = "0xB638EB5287c9378D779e397976CDA76EB91a6836";

  // Handle form submission and contract interaction
  async function bet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Call the bet function on the smart contract
    writeContract({
      address: lotteryAddress as `0x${string}`,
      abi: abi,
      functionName: "bet",
      // No arguments needed for single bet
    });
  }

  // Track transaction status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return (
    <form onSubmit={bet}>
      <Button
        className="w-full"
        disabled={isPending || !isConnected} // Disable if transaction pending or wallet not connected
        type="submit"
        variant="default"
      >
        {isPending ? "Confirming..." : "Place Single Bet"}
      </Button>

      {/* Transaction status messages */}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
    </form>
  );
}
