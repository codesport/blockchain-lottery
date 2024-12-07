'use client'

import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "lucide-react";
import OwnerCloseLottery from "./OwnerCloseLottery";
import OwnerOpenBets from "./OwnerOpenBets";
import OwnerWithdraw from "./OwnerWithdraw";

const OwnerDashboard = () => {

    // const [withdrawAmount, setWithdrawAmount] = React.useState("");
    // const [closingTime, setClosingTime] = React.useState("");



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
                                <OwnerOpenBets />
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
                                <OwnerWithdraw />
                            </div>


                        </CardContent>
                    </Card>
                </TabsContent>


                <TabsContent value="close" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>End Lottery Early</CardTitle>
                            <CardDescription>
                                Click to close the lottery now
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <div className="space-y-2">
                                <OwnerCloseLottery />
                            </div>

                        </CardContent>
                    </Card>
                </TabsContent>




            </Tabs >
        </div >
    );
};

export default OwnerDashboard;
