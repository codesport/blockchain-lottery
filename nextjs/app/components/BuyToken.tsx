"use client";

import * as React from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { abi } from "../utils/Lottery.json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function BuyTokens() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const lotteryAddress = "0xB638EB5287c9378D779e397976CDA76EB91a6836";

  async function buyTokens(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get("value") as string;
    writeContract({
      abi,
      address: lotteryAddress,
      functionName: "purchaseTokens",
      value: parseEther(value),
    });
  }

  return (
    <form onSubmit={buyTokens} className="space-y-4">
      <Input
        name="value"
        placeholder="ETH to Send"
        type="number"
        step="0.01"
        min="0"
      />
      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Buy Tokens"}
      </Button>
    </form>
  );
}
