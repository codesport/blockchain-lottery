'use client'

import * as React from 'react'
import { type BaseError, useWaitForTransactionReceipt, useWriteContract, useAccount } from 'wagmi'
import { abi } from "../utils/Lottery.json";
import contractAddresses from '../utils/contract-data.json'
import { parseEther } from 'viem';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OwnerOpenBets = () => {

    const lotteryAddress = contractAddresses.lottoAddress
    const { data: hash, error, isPending, writeContract } = useWriteContract()



    const handleOpenBets = async (event: any) => {

        event.preventDefault();
        console.log('Output from Success View: ' + event.target.formWithdrawAmount.value);

        try {

            writeContract({
                address: lotteryAddress as `0x${string}`,
                abi: abi,
                functionName: 'ownerWithdraw',
                args: [parseEther(event.target.fromGameDuration.value)],

            })

        } catch (errorUgly) {

            console.log('Node Error Output', errorUgly)
            console.log('Wagmi Error Output', error)
        }

    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })



    return (
        <React.Fragment>


            <form id="ownerGameDurationForm" onSubmit={handleOpenBets}>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Duration of Game Round (seconds)
                </label>

                {/* OPEN_BETS (Start Game): */}
                {/* this sets the state variable but doesn't call event handle: handleOpenBets (event) */}
                {/* TODO 1: Create a menu to  let Admin choose sec, min, hr, or days.*/}
                {/* TODO 2:  Contract uses seconds so convert anything !== seconds to seconds */}
                {/* TODO 3: Include countdown time of when game ends */}
                <Input
                    placeholder="300"
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


        </React.Fragment>
    )

}

export default OwnerOpenBets