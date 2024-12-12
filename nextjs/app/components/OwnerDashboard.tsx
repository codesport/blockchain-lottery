"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Calendar } from "lucide-react";
import OwnerCloseLottery from "./OwnerCloseLottery";
import OwnerOpenBets from "./OwnerOpenBets";
import OwnerWithdraw from "./OwnerWithdraw";
import { useContractRead } from 'wagmi';
import { abi } from "../utils/Lottery.json";
import contractAddresses from "../utils/contract-data.json";

/**
 * @component OwnerDashboard
 * @description The main dashboard interface for lottery administrators/owners.
 * This component provides a comprehensive UI for managing the lottery system,
 * including viewing statistics, starting new games, ending games, and withdrawing funds.
 *
 * @features
 * - Overview tab: Displays key metrics (total pool, status, participants)
 * - Withdraw tab: Interface for withdrawing accumulated fees
 * - Start New Game tab: Controls for initiating a new lottery round
 * - End Game tab: Controls for closing the current lottery round
 *
 * @layout
 * The dashboard is organized into tabs for different management functions:
 * 1. Overview - Shows current lottery statistics and recent activity
 * 2. Withdraw - Allows owner to withdraw accumulated fees
 * 3. Start New Game - Interface for opening new lottery rounds
 * 4. End Game - Controls for closing the current lottery
 *
 * @metrics
 * The overview section displays three key metrics:
 * - Total Pool: Current balance in the lottery contract
 * - Status: Current state of the lottery (Open/Closed)
 * - Participants: Number of players in the current round
 *
 * @usage
 * This component should only be rendered for addresses that have owner/admin
 * privileges in the lottery smart contract.
 */
const OwnerDashboard = () => {
  const lotteryAddress = contractAddresses.lottoAddress;

  // Read the betsOpen state from the contract
  const { data: betsOpen } = useContractRead({
    address: lotteryAddress as `0x${string}`,
    abi: abi,
    functionName: 'betsOpen'
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Lottery Management
          </h1>
          <p className="text-muted-foreground">
            Manage your lottery operations
          </p>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="openLottery">Start New Game</TabsTrigger>
          <TabsTrigger value="closeLottery">End Game</TabsTrigger>
        </TabsList>

        {/* Overview Tab - Displays key metrics and recent activity */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Pool Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pool
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground">💰</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.00 ETH</div>
                <p className="text-xs text-muted-foreground">
                  Current lottery pool balance
                </p>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">🎯</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {betsOpen ? "Open" : "Closed"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current lottery status
                </p>
              </CardContent>
            </Card>

            {/* Participants Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Participants
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground">👥</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Current round participants
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest transactions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Alert>
                  <Calendar className="h-4 w-4" />
                  <AlertTitle>No recent activity</AlertTitle>
                  <AlertDescription>
                    Transactions will appear here when the lottery is active
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* End Game Tab - Interface for closing the current lottery */}
        <TabsContent value="closeLottery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>End the Lottery</CardTitle>
              <CardDescription>
                The Game must be manually ended by administrator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <OwnerCloseLottery />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Start New Game Tab - Interface for opening new lottery rounds */}
        <TabsContent value="openLottery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Open New Lottery Round</CardTitle>
              <CardDescription>
                Set the closing time for the next lottery round
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <OwnerOpenBets />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdraw Tab - Interface for withdrawing accumulated fees */}
        <TabsContent value="withdraw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>
                Withdraw accumulated fees from the lottery pool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <OwnerWithdraw />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerDashboard;
