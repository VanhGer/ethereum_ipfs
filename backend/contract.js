import {ethers} from "ethers";
import fs from "fs";
import 'dotenv/config'
// Load your contract ABI
const contractABI = () => {
    try {
        const data = fs.readFileSync('../deploy_contract/artifacts/contracts/Store.sol/Store.json', 'utf8');
        return JSON.parse(data).abi;
    } catch (e) {
        console.log(`e`, e);
    }
}

const contractAddress = process.env.CONTRACT_ADDRESS; // Replace with your contract address

// Connect to an Ethereum node
const provider = new ethers.JsonRpcProvider(process.env.NODE_URL); // Replace with your node URL

// Initialize contract instance
const contract = new ethers.Contract(contractAddress, contractABI(), provider);
//
// // Call contract functions
export async function storeFile(filename, cid) {
    try {
        const signer = await provider.getSigner(); // You need a signer to send transactions
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.storeFile(filename, cid); // Send transaction
        await tx.wait() // Wait for transaction confirmation
        console.log("Transaction successful:", tx.hash);
    } catch (e) {
        throw e;
    }

}

export async function getFile(){
    try {
        const signer = await provider.getSigner(); // You need a signer to send transactions
        const contractWithSigner = contract.connect(signer);
        const receipt = await contractWithSigner.getUserFiles() // Send transaction
        return receipt
    } catch (e) {
        throw e;
    }

}
