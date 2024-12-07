'use client'

import * as React from "react";
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
import { Calendar } from "lucide-react";


import { type BaseError, useWaitForTransactionReceipt, useWriteContract, useAccount } from 'wagmi'
import { abi } from "../utils/Lottery.json";
import contractAddresses from '../utils/contract-data.json'
import { formatEther, parseEther } from 'viem';


const OwnerDashboard = () => {

    const [withdrawAmount, setWithdrawAmount] = React.useState("");
    const [closingTime, setClosingTime] = React.useState("");

    const lotteryAddress = contractAddresses.lottoAddress
    const { data: hash, error, isPending, writeContract } = useWriteContract()

    const handleWithdraw = async (event: any) => {

        event.preventDefault();
        console.log('Output from Success View: ' + event.target.formWithdrawAmount.value);

        try {

            writeContract({
                address: lotteryAddress as `0x${string}`,
                abi: abi,
                functionName: 'ownerWithdraw',
                args: [parseEther(event.target.formWithdrawAmount.value)],

            })

        } catch (errorUgly) {

            console.log(errorUgly)
            console.log(error)
        }

    }

    const handleStartGame async (event: any) => {

        event.preventDefault();
        console.log('Output from Success View: ' + event.target.formWithdrawAmount.value);

        try {

            writeContract({
                address: lotteryAddress as `0x${string}`,
                abi: abi,
                functionName: 'ownerWithdraw',
                args: [parseEther(event.target.formWithdrawAmount.value)],

            })

        } catch (errorUgly) {

            console.log(errorUgly)
            console.log(error)
        }

    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })



    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
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

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                    <TabsTrigger value="lottery">Lottery Control</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Status</CardTitle>
                                <div className="h-4 w-4 text-muted-foreground">🎯</div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Closed</div>
                                <p className="text-xs text-muted-foreground">
                                    Current lottery status
                                </p>
                            </CardContent>
                        </Card>

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
                                <form id="ownerWithdrawForm" onSubmit={handleWithdraw}>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Amount (ETH)
                                    </label>

                                    {/* OWNER WITHDRAW: */}
                                    {/* NB: anything with input fiekd use form element and onSubmit.  If just button use onClick */}
                                    <Input
                                        placeholder="0.00"
                                        name="formWthdrawAmount"
                                        type="number"
                                        {/* this sets the state variable but doesn't call event handle: handleWithdraw (event)*/}
                                        // value={withdrawAmount}
                                        // onChange={(e) => setWithdrawAmount(e.target.value)}
                                        className="w-full"
                                    />
                                    <Button className="w-full"
                                        disabled={isPending}
                                        type="submit"
                                    > {isPending ? 'Confirming...' : 'Withdraw Funds'}
                                    </Button>

                                    {/* Data Source: useSendTransaction Hook */}
                                    {hash && <div>Transaction Hash: {hash}</div>}

                                    {/* Data Source: useWaitForTransactionReceipt Hook */}
                                    {isConfirming && <div>Waiting for confirmation...</div>}
                                    {isConfirmed && <div>Transaction confirmed.</div>}

                                    {/* Data Source: BaseError Handler */}
                                    {error && (<div>Error: {(error as BaseError).shortMessage || error.message}</div>)}
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="lottery" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Open New Lottery Round</CardTitle>
                            <CardDescription>
                                Set the closing time for the next lottery round
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <div className="space-y-2">
                                <form id="ownerGameDurationForm" onSubmit={handleStartGame}>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Duration of Game Round (seconds)
                                    </label>

                                    {/* OPEN_BETS (Start Game: */}
                                    {/* this sets the state variable but doesn't call event handle: handleOpenBets (event) */}
                                    {/* TODO 1: Create a menu to  let Admin choose sec, min, hr, or days.*/}
                                    {/* TODO 2:  Contract uses seconds so convert anything !== seconds to seconds */}
                                    {/* TODO 3: Include countdown time of when game ends */}
                                    <Input
                                        placeholder="1234567890"
                                        name="fromGameDuration"
                                        type="number"
                                        // value={closingTime}
                                        // onChange={(e) => setClosingTime(e.target.value)}
                                        className="w-full"
                                    />

                                    <Button className="w-full"
                                        disabled={isPending}
                                        type="submit"
                                    > {isPending ? 'Confirming...' : 'Withdraw Funds'}
                                    </Button>

                                    {/* Data Source: useSendTransaction Hook */}
                                    {hash && <div>Transaction Hash: {hash}</div>}

                                    {/* Data Source: useWaitForTransactionReceipt Hook */}
                                    {isConfirming && <div>Waiting for confirmation...</div>}
                                    {isConfirmed && <div>Transaction confirmed.</div>}

                                    {/* Data Source: BaseError Handler */}
                                    {error && (<div>Error: {(error as BaseError).shortMessage || error.message}</div>)}
                                </form>
                            </div>


                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs >
        </div >
    );
};

export default OwnerDashboard;
