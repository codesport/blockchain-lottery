import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Coins, Ticket, Trophy, Timer } from "lucide-react";
import { PrizeWithdrawalForWinner } from "./WithdrawRewards";
import { Bet } from "./Bet";
import { BetMany } from "./BetMany";
import { BuyTokens } from "./BuyToken";

const PlayerDashboard = () => {
  const [purchaseAmount, setPurchaseAmount] = React.useState("");
  const [returnAmount, setReturnAmount] = React.useState("");
  const [betTimes, setBetTimes] = React.useState("1");

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Lottery Player Dashboard
          </h1>
          <p className="text-muted-foreground">Play, bet, and collect prizes</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your GOLD Balance
              {
                // can get balance of wallet here
              } 
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 GOLD</div>
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
            <div className="text-2xl font-bold">Closed</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tokens" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tokens">Token Management</TabsTrigger>
          <TabsTrigger value="betting">Place Bets</TabsTrigger>
          <TabsTrigger value="prizes">Prizes</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Tokens</CardTitle>
                <CardDescription>Trade ETH for GOLD tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (ETH)</label>
                <BuyTokens/>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Return Tokens</CardTitle>
                <CardDescription>Trade GOLD tokens for ETH</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (GOLD)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={returnAmount}
                    onChange={(e) => setReturnAmount(e.target.value)}
                  />
                </div>
                <Button className="w-full" variant="outline">
                  Return GOLD
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="betting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Place Your Bets</CardTitle>
              <CardDescription>
                Try your luck in the current lottery round
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  {/* <Button className="w-full">Place Single Bet</Button> */}
                  <Bet/>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {/* <Input
                      type="number"
                      placeholder="Number of bets"
                      value={betTimes}
                      onChange={(e) => setBetTimes(e.target.value)}
                    /> */}
                    <BetMany/>
                    {/* <Button className="whitespace-nowrap">
                      Place Multiple Bets
                    </Button> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
              <Button variant="outline" className="w-full">
                Close Lottery Round
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

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
                <PrizeWithdrawalForWinner/>
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
