
// npx ts-node scripts/02-deploy-lottery.ts

import { client, fs, contractAddressStoragePath, requestUserInput, readKeyValue, appendKeyValue, } from "./config";
import { abi as LottoABI, bytecode as LottoByteCode } from "../artifacts/contracts/Lottery.sol/Lottery.json";
import { parseEther } from "viem";



// TOKEN_RATIO = 200 : 1 ==> 1 ETH = 2000 tokens  ==> 1 token = .0005 ETH

const MAXUINT256 =
    115792089237316195423570985008687907853269984665640564039457584007913129639935n;

const TOKEN_NAME = "Delta Lotto Token"
const SYMBOL = "DELTA"
const TOKEN_RATIO = 2000n; //this is a bigInt n is necessary!
const BET_PRICE = "10";  //Amount of tokens required for placing a bet that  goes for the prize pool
const BET_FEE = "0.2";

const main = async () => {

    const hash = await client.deployContract({
        abi: LottoABI,
        bytecode: LottoByteCode as `0x${string}`, // hexadecimal string, which is the standard format for Ethereum bytecode.
        args: [TOKEN_NAME, SYMBOL, TOKEN_RATIO, parseEther(BET_PRICE), parseEther(BET_FEE),],
    });

    console.log(`\nTransaction hash: ${hash}`);
    const receipt = await client.waitForTransactionReceipt({ hash });
    // const receipt = await publicClient.waitForTransactionReceipt({ hash: customnameTxHash });

    console.log("Lotto contract successfully deployed to:", receipt.contractAddress);
    //const LottoAddressToSave = { "lottoAddress": receipt.contractAddress }

    const tokenAddressToSave = await client.readContract({
        address: receipt.contractAddress as `0x${string}`,
        abi: LottoABI,
        functionName: 'paymentToken',
    })
    console.log(TOKEN_NAME, 'contract successfully deployed to:', tokenAddressToSave);


    const contactAddressesToSave = { "lottoAddress": receipt.contractAddress, "tokenAddress": tokenAddressToSave }

    fs.writeFileSync(contractAddressStoragePath, JSON.stringify(contactAddressesToSave));

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// async function checkState() {
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const state = await contract.read.betsOpen();
//     console.log(`The lottery is ${state ? "open" : "closed"}\n`);
//     if (!state) return;
//     const publicClient = await getClient();
//     const currentBlock = await publicClient.getBlock();
//     const timestamp = Number(currentBlock?.timestamp) ?? 0;
//     const currentBlockDate = new Date(timestamp * 1000);
//     const closingTime = await contract.read.betsClosingTime();
//     const closingTimeDate = new Date(Number(closingTime) * 1000);
//     console.log(
//         `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n`
//     );
//     console.log(
//         `lottery should close at ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`
//     );
// }

// async function openBets(duration: string) {
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const publicClient = await getClient();
//     const currentBlock = await publicClient.getBlock();
//     const timestamp = currentBlock?.timestamp ?? 0;
//     const tx = await contract.write.openBets([timestamp + BigInt(duration)]);
//     const receipt = await publicClient.getTransactionReceipt({ hash: tx });
//     console.log(`Bets opened (${receipt?.transactionHash})`);
// }

// async function displayBalance(index: string) {
//     const publicClient = await getClient();
//     const accounts = await getAccounts();
//     const balanceBN = await publicClient.getBalance({
//         address: accounts[Number(index)].account.address,
//     });
//     const balance = formatEther(balanceBN);
//     console.log(
//         `The account of address ${accounts[Number(index)].account.address
//         } has ${balance} ETH\n`
//     );
// }

// async function buyTokens(index: string, amount: string) {
//     const accounts = await getAccounts();
//     const publicClient = await getClient();
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const tx = await contract.write.purchaseTokens({
//         value: parseEther(amount) / TOKEN_RATIO,
//         account: accounts[Number(index)].account,
//     });
//     const receipt = await publicClient.getTransactionReceipt({ hash: tx });
//     console.log(`Tokens bought (${receipt?.transactionHash})\n`);
// }

// async function displayTokenBalance(index: string) {
//     const accounts = await getAccounts();
//     const token = await viem.getContractAt("LotteryToken", tokenAddress);
//     const balanceBN = await token.read.balanceOf([
//         accounts[Number(index)].account.address,
//     ]);
//     const balance = formatEther(balanceBN);
//     console.log(
//         `The account of address ${accounts[Number(index)].account.address
//         } has ${balance} LT0\n`
//     );
// }

// async function bet(index: string, amount: string) {
//     const accounts = await getAccounts();
//     const publicClient = await getClient();
//     const token = await viem.getContractAt("LotteryToken", tokenAddress);
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const allowTx = await token.write.approve([contractAddress, MAXUINT256], {
//         account: accounts[Number(index)].account,
//     });
//     await publicClient.getTransactionReceipt({ hash: allowTx });
//     const tx = await contract.write.betMany([BigInt(amount)], {
//         account: accounts[Number(index)].account,
//     });
//     const receipt = await publicClient.getTransactionReceipt({ hash: tx });
//     console.log(`Bets placed (${receipt?.transactionHash})\n`);
// }

// async function closeLottery() {
//     const publicClient = await getClient();
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const tx = await contract.write.closeLottery();
//     const receipt = await publicClient.getTransactionReceipt({ hash: tx });
//     console.log(`Bets closed (${receipt?.transactionHash})\n`);
// }

// async function displayPrize(index: string): Promise<string> {
//     const accounts = await getAccounts();
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const prizeBN = await contract.read.prize([
//         accounts[Number(index)].account.address,
//     ]);
//     const prize = formatEther(prizeBN);
//     console.log(
//         `The account of address ${accounts[Number(index)].account.address
//         } has earned a prize of ${prize} Tokens\n`
//     );
//     return prize;
// }

// async function claimPrize(index: string, amount: string) {
//     const accounts = await getAccounts();
//     const publicClient = await getClient();
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const tx = await contract.write.prizeWithdraw([parseEther(amount)], {
//         account: accounts[Number(index)].account,
//     });
//     const receipt = await publicClient.getTransactionReceipt({ hash: tx });
//     console.log(`Prize claimed (${receipt?.transactionHash})\n`);
// }

// async function displayOwnerPool() {
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const balanceBN = await contract.read.ownerPool();
//     const balance = formatEther(balanceBN);
//     console.log(`The owner pool has (${balance}) Tokens \n`);
// }

// async function withdrawTokens(amount: string) {
//     const publicClient = await getClient();
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const tx = await contract.write.ownerWithdraw([parseEther(amount)]);
//     const receipt = await publicClient.getTransactionReceipt({ hash: tx });
//     console.log(`Withdraw confirmed (${receipt?.transactionHash})\n`);
// }

// async function burnTokens(index: string, amount: string) {
//     const accounts = await getAccounts();
//     const publicClient = await getClient();
//     const token = await viem.getContractAt("LotteryToken", tokenAddress);
//     const contract = await viem.getContractAt("Lottery", contractAddress);
//     const allowTx = await token.write.approve([contractAddress, MAXUINT256], {
//         account: accounts[Number(index)].account,
//     });
//     const receiptAllow = await publicClient.getTransactionReceipt({
//         hash: allowTx,
//     });
//     console.log(`Allowance confirmed (${receiptAllow?.transactionHash})\n`);
//     const tx = await contract.write.returnTokens([parseEther(amount)], {
//         account: accounts[Number(index)].account,
//     });
//     const receipt = await publicClient.getTransactionReceipt({ hash: tx });
//     console.log(`Burn confirmed (${receipt?.transactionHash})\n`);
// }