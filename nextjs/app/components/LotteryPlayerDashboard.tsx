import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Coins, Ticket, Trophy, Timer } from "lucide-react";
import { PrizeWithdrawalForWinner } from "./WithdrawRewards";
import { Bet } from "./Bet";
import { BetMany } from "./BetMany";
import { BuyTokens } from "./BuyToken";
import { useContractRead, useAccount } from "wagmi";
import { abi as lotteryAbi } from "@/app/utils/Lottery.json";
import { abi as tokenAbi } from "@/app/utils/LotteryToken.json";
import { formatEther } from "viem";

const LOTTERY_ADDRESS = "0xB638EB5287c9378D779e397976CDA76EB91a6836";

/**
 * @component PlayerDashboard
 * @description The main dashboard interface for lottery players. This component provides a comprehensive
 * UI for interacting with the lottery smart contract, including token management, betting, and prize claiming.
 *
 * The dashboard is divided into four main sections:
 * 1. Status Cards - Displaying key metrics and balances
 * 2. Token Management - For buying and returning DELTA tokens
 * 3. Betting Interface - For placing single or multiple bets
 * 4. Prize Management - For claiming and withdrawing winnings
 *
 * @returns {JSX.Element} A complex dashboard interface with multiple tabs and interactive elements
 */
const PlayerDashboard = () => {
  const { address } = useAccount();
  
  /** State for managing the token return amount input */
  const [returnAmount, setReturnAmount] = React.useState("");
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

  // Get lottery status and closing time
  const { data: betsOpen } = useContractRead({
    address: LOTTERY_ADDRESS as `0x${string}`,
    abi: lotteryAbi,
    functionName: "betsOpen",
  });

  const { data: closingTime } = useContractRead({
    address: LOTTERY_ADDRESS as `0x${string}`,
    abi: lotteryAbi,
    functionName: "betsClosingTime",
  });

  // Get payment token address from lottery contract
  const { data: tokenAddress } = useContractRead({
    address: LOTTERY_ADDRESS as `0x${string}`,
    abi: lotteryAbi,
    functionName: "paymentToken",
  });

  // Get token balance for connected address
  const { data: tokenBalance } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: [address],
    enabled: !!address && !!tokenAddress,
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the time remaining
  const getTimeRemaining = () => {
    if (!betsOpen || !closingTime) return "Closed";

    const closing = Number(closingTime);
    
    if (currentTime >= closing) return "Closed";
    
    const remainingSeconds = closing - currentTime;
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Lottery Player Dashboard
          </h1>
          <p className="text-muted-foreground">Play, bet, and collect prizes</p>
        </div>
      </div>

      {/* Status Cards Section 
          Displays four key metrics:
          1. DELTA token balance
          2. Number of active bets
          3. Available prize amount
          4. Time remaining in current round
      */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* DELTA Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your DELTA Balance
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tokenBalance ? formatEther(tokenBalance) : "0"} DELTA
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Bets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prize Available
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 ETH</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Time Remaining
            </CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTimeRemaining()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs
          Contains three main sections:
          1. tokens - Token management interface
          2. betting - Betting interface
          3. prizes - Prize claiming interface
      */}
      <Tabs defaultValue="tokens" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tokens">Token Management</TabsTrigger>
          <TabsTrigger value="betting">Place Bets</TabsTrigger>
          <TabsTrigger value="prizes">Prizes</TabsTrigger>
        </TabsList>

        {/* Token Management Tab 
            Allows users to:
            - Purchase DELTA tokens with ETH
            - Return DELTA tokens for ETH
        */}
        <TabsContent value="tokens" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Purchase Tokens Card */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Tokens</CardTitle>
                <CardDescription>Trade ETH for DELTA tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (ETH)</label>
                  <BuyTokens />
                </div>
              </CardContent>
            </Card>

            {/* Return Tokens Card */}
            <Card>
              <CardHeader>
                <CardTitle>Return Tokens</CardTitle>
                <CardDescription>Trade DELTA tokens for ETH</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (DELTA)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={returnAmount}
                    onChange={(e) => setReturnAmount(e.target.value)}
                  />
                </div>
                <Button className="w-full">Return DELTA</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Betting Interface Tab
            Provides options for:
            - Placing single bets
            - Placing multiple bets
            - Viewing lottery status
        */}
        <TabsContent value="betting" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Place Single Bet</CardTitle>
                <CardDescription>
                  Place an individual bet for this round
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-end h-[120px]">
                <div className="w-full">
                  <Bet />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Place Multiple Bets</CardTitle>
                <CardDescription>Place several bets at once</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-end h-[120px]">
                <div className="w-full">
                  <BetMany />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lottery Status</CardTitle>
              <CardDescription>Current round information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Timer className="h-4 w-4" />
                <AlertTitle>Lottery is open</AlertTitle>
                <AlertDescription>
                  Place your bets before the round closes
                </AlertDescription>
              </Alert>
              <Button className="w-full">Close Lottery Round</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prize Management Tab
            Allows winners to:
            - View available prizes
            - Withdraw winnings
        */}
        <TabsContent value="prizes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claim Prize</CardTitle>
              <CardDescription>Withdraw your lottery winnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Trophy className="h-4 w-4" />
                <AlertTitle>Prize Available</AlertTitle>
                <AlertDescription>
                  You have 0 ETH available to claim
                </AlertDescription>
                <PrizeWithdrawalForWinner />
              </Alert>
              <Button className="w-full">Withdraw Prize</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerDashboard;
