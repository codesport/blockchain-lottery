'use client'

import * as React from 'react'
import { type BaseError, useWaitForTransactionReceipt, useWriteContract, useAccount } from 'wagmi'
import { abi } from "../utils/Lottery.json";
import contractAddresses from '../utils/contract-data.json'
import { parseEther } from 'viem';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OwnerWithdraw = () => {

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

            console.log('Node Error Output', errorUgly)
            console.log('Wagmi Error Output', error)
        }

    }



    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })



    return (
        <React.Fragment>

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


        </React.Fragment>
    )

}

export default OwnerWithdraw