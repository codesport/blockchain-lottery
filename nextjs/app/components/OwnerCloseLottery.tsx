'use client'

import * as React from 'react'
import { type BaseError, useWaitForTransactionReceipt, useWriteContract, /*useAccount*/ } from 'wagmi'
import { abi } from "../utils/Lottery.json";
import contractAddresses from '../utils/contract-data.json'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OwnerCloseLottery = () => {

    const lotteryAddress = contractAddresses.lottoAddress
    const { data: hash, error, isPending, writeContract } = useWriteContract()

    //TODO: Find out how to properly TYPE a form event object!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCloseLottery = async (event: any) => {

        event.preventDefault();
        //console.log('Output from Success View: ' + event.target.formCloseLottery.value);

        try {
            writeContract({
                address: lotteryAddress as `0x${string}`,
                abi: abi,
                functionName: 'closeLottery',
            })


        } catch (errorUgly) {

            console.log('Node Error Output', errorUgly)
            console.log('Wagmi Error Output', error)
        }

    }


    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })


    return (
        <React.Fragment>

            {/* Using `form` allows us to send all Form attribute in the `event` object */}
            <form id="ownerWithdrawForm" onSubmit={handleCloseLottery}>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Amount (ETH)
                </label>

                <Input
                    placeholder="0.00"
                    name="formCloseLottery"
                    type="number"
                    className="w-full"
                />
                <Button className="w-full"
                    disabled={isPending}
                    type="submit"
                > {isPending ? 'Confirming...' : 'Closing Lottery'}
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

export default OwnerCloseLottery