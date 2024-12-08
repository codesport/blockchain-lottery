'use client'

import * as React from 'react'
import { useEffect, useState } from 'react';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract, usePublicClient, /*useAccount*/ } from 'wagmi'
import { abi } from "../utils/Lottery.json";
import contractAddresses from '../utils/contract-data.json'
import { parseEther } from 'viem';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OwnerOpenBets = () => {

    const lotteryAddress = contractAddresses.lottoAddress
    const { data: hash, error, isPending, writeContract } = useWriteContract()
    const [block, setBlock] = useState()
    const [theTime, setTheTime] = useState()
    const publicClient = usePublicClient()
    let displayTime: string = ''


    //TODO: Find out how to properly TYPE a form event object!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenBets = async (event: any,) => {

        const timeUTC = theTime / 1000

        event.preventDefault();
        console.log('Output from Form Submit ' + event.target.fromGameDuration.value);

        let duration: number = Number(event.target.fromGameDuration.value) * 60

        console.log('Duration * 60 seconds: ', duration)

        duration = duration + timeUTC

        console.log('Duration + current UTC seconds: ', duration)




        // const timestamp = currentBlock?.timestamp ?? 0;
        // const tx = await contract.write.openBets([timestamp + BigInt(duration)]);

        try {

            writeContract({
                address: lotteryAddress as `0x${string}`,
                abi: abi,
                functionName: 'openBets',
                args: [BigInt(event.target.fromGameDuration.value)],

            })

        } catch (errorUgly) {

            console.log('Node Error Output', errorUgly)
            console.log('Wagmi Error Output', error)
        }

    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })



    useEffect(() => {
        async function fetchBlock() {
            try {
                const block = await publicClient.getBlock();
                setBlock(block);
                setTheTime(Number(block.timestamp) * 1000)
            } catch (error) {
                console.error('Error fetching block:', error);
            }
            console.log(block)
            console.log(theTime)
        }

        fetchBlock();



    }, [publicClient]);

    if (theTime) { (displayTime = new Date(theTime).toLocaleString()) }


    return (
        <React.Fragment>

            {/* Using `form` allows us to send all Form attribute in the `event` object */}
            <form id="ownerGameDurationForm" onSubmit={handleOpenBets}>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Chain data was last pulled at {displayTime}. Enter Lottery Duration in minutes from this time
                </label>

                {/* OPEN_BETS (Start Game): */}
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
                > {isPending ? 'Confirming...' : 'Start New Lottery'}
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