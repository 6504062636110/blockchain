import dotenv from "dotenv";
import hardhat from "hardhat"; // Import hardhat
const { ethers } = hardhat; // Destructure ethers from hardhat

async function main() {
    console.log("Deploying contract...");
    const PRIVATE_KEY =
        "0x339541b80273b805630ebe80bb5fe8e78c8acdf5e26e22d851f732ab5a2a973f";
    const GANACHE_URL = "http://127.0.0.1:7545";
    console.log("PRIVATE_KEY:", PRIVATE_KEY);
    console.log("GANACHE_URL:", GANACHE_URL); // Ensure GANACHE_URL is set in .env

    // Ensure PRIVATE_KEY and GANACHE_URL are set in .env
    if (!PRIVATE_KEY || !GANACHE_URL) {
        console.error(
            "PRIVATE_KEY and GANACHE_URL must be defined in the .env file.",
        );
        process.exit(1);
    }

    // Initialize the provider with Ganache RPC URL
    const provider = new ethers.providers.JsonRpcProvider(GANACHE_URL); // Ganache URL (e.g., http://127.0.0.1:7545)

    // Initialize wallet with private key and provider
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // Get the contract factory for QuestReward
    const CarbonCredit = await ethers.getContractFactory(
        "CarbonCredit",
        wallet,
    );
    const carbonCredit = await CarbonCredit.deploy();
    await carbonCredit.deployed();

    console.log("✅ QuestReward contract deployed at:", carbonCredit);
}

main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
});
