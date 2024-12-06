// Using a config inspired by Ralph Chu: https://github.com/EncodeClub-EVMBootcamp24Q4-Group2/project2/commits?author=ralphchu66
// Built-in Wallet + Public Client inspired by Dan Nolan: https://youtu.be/P9oUqVsHBkA?si=URjgzUHKfebgZ_Bk&t=2096

import { createPublicClient, http, createWalletClient, publicActions } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import * as readline from 'readline'; // https://stackoverflow.com/a/49055758
import * as fs from 'fs';
import 'dotenv/config' // (source: https://www.npmjs.com/package/dotenv )

/********** CHANGE PROVIDER AS NEEDED*/
const ETH_SEPOLIA_RPC_URL = process.env.ETH_SEPOLIA_RPC_URL_2
/********** CHANGE PROVIDER AS NEEDED*/


/**
 *  Create a Viem Wallet Client With a Built-in Public Client
 * @see https://github.com/codesport/erc20votes-part2#3-create-a-viem-wallet-client-with-a-built-in-public-client
 */
const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);
const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(ETH_SEPOLIA_RPC_URL),
}).extend(publicActions);



/**
 * Continue or Abort script based on user input
 *
 * - CLI function to verify user inputs. depends on `import * as readline from "readline";`
 * - call from within another async function
 * - https://www.google.com/search?q=when+and+why+use+promise.all?
 * - https://www.google.com/search?q=when+to+use+promise.all
 * - https://www.google.com/search?q=use+node+to+prompt+user+input+from+command+line
 * - In TypeScript: https://www.google.com/search?q=TypeScript%3A+use+node+to+prompt+user+input+from+command+line?
 * - Boss Mode: https://github.com/SBoudrias/Inquirer.js
 *
 * @param message - The confirmation message.
 * @returns Promise resolving to true if confirmed, false otherwise.
 *
 * Usage:
 *
 *  const isConfirmed = await confirmAction('Would you like to continue? ');
 *   if (isConfirmed === false) { 
 *      console.log("Operation cancelled by the user. Exiting gracefully now.");
 *       process.exit(0);
 *   }
 */
const confirmAction = async (message: string): Promise<boolean> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(`${message} \n  Press any key to continue. Or 'q' to quit! `, (answer) => {
            rl.close();
            //resolve(answer.trim().toLowerCase() === "y");
            resolve(answer.trim().toLowerCase() !== "q");
        });
    });
}


/**
 * Request, verify, and save user input to a variable
 *
 * - CLI function to verify user inputs. Depends on `import * as readline from "readline";`
 * - call from within another async function
 *
 * @param message - The confirmation message.
 * @returns Promise that returns user input.
 * @see https://stackoverflow.com/a/61395541
 *
 * Usage:
 *  // Get user input using await
 *  const userInputAddress = await requestUserInput('Enter the address of a wallet or contract: ');
 *
 *   // Print the result
 *  console.log(`Saving address, ${userInputAddress}`);
 *
 *  // Close the readline interface
 *  rl.close();
 *   }
 */
const requestUserInput = async (message: string): Promise<string> => {
    // Create an interface for input and output
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(message, (answer) => {
            rl.close(); //this is not convention. should be in prompt caller
            resolve(answer);
        });
    });

}


// Path to save deplyment addresses
const contractAddressStoragePath = 'scripts/contract-data.json'


/**
* Read saved json array of contract name (i.e, key) and address (value)
* 
* @see https://www.google.com/search?q=TypeScript+and+nodejs%3A+read+a+key+value+pair+from+json+file+and+save+to+variable
* @param key 
* @returns jsonData[key]
*/
function readKeyValue(/*filePath: string,*/ key: string): string | undefined { //data-type can also be :any instead of string
    try {
        /**
        * readFileSync reads the file synchronously. The event loop and execution of the remaining code is blocked 
        * until all the data has been read.
        */
        const jsonData = JSON.parse(fs.readFileSync(contractAddressStoragePath, 'utf-8'));
        return jsonData[key];
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return undefined;

    }
}

/**
 * Append new key-value pair to existing JSON file
 *
 * @see https://www.google.com/search?q=TypeScript%3A+use+node+to+append+data+to+a+json+file+from+command+line
 * @param keyValue 
 * @returns 
 */
function appendKeyValue(/*filePath: string,*/ keyValue: any): any | undefined {

    let jsonData: any = {}
    try {
        const fileContent = fs.readFileSync(contractAddressStoragePath, 'utf-8');
        jsonData = JSON.parse(fileContent);
        Object.assign(jsonData, keyValue);
        fs.writeFileSync(contractAddressStoragePath, JSON.stringify(jsonData, null, 4));
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return undefined;
    }
}


// named exports
export { client, fs, contractAddressStoragePath, readKeyValue, appendKeyValue, requestUserInput, confirmAction }