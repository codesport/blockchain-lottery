"use client";

import * as React from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import { abi } from "../utils/Lottery.json";
import { Button } from "@/app/components/ui/button";

export function BetMany() {
  // Get user's wallet connection status
  const { address, isConnected } = useAccount();

  // Hook for executing contract write operations
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Contract address for the lottery
  let lotteryAddress = "0xB638EB5287c9378D779e397976CDA76EB91a6836";

  // Handle form submission and contract interaction for multiple bets
  async function betMany(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const times = formData.get("times");
      console.log("Times to bet:", times);

      if (!times) {
        alert("Please enter the number of times to bet");
        return;
      }

      // Convert the input value to a number
      const timesNumber = Number(times);

      if (isNaN(timesNumber) || timesNumber <= 0) {
        alert("Please enter a valid positive number");
        return;
      }

      console.log("Calling writeContract with times:", timesNumber);
      writeContract({
        address: lotteryAddress as `0x${string}`,
        abi: abi,
        functionName: "betMany",
        args: [timesNumber],
      });
    } catch (error) {
      console.error("Error placing bets:", error);
      alert("Error placing bets. Check console for details.");
    }
  }

  // Track transaction status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return (
    <form onSubmit={betMany}>
      <input
        name="times"
        type="number"
        min="1"
        placeholder="Number of Times to Bet"
        required
      />
      <Button
        className="w-full"
        disabled={isPending || !isConnected}
        type="submit"
        variant="default"
      >
        {isPending ? "Confirming..." : "Place Multiple Bets"}
      </Button>

      {/* Transaction status messages */}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
    </form>
  );
}
