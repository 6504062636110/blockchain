import hardhat from "hardhat"; // Import hardhat
const { ethers } = hardhat; // Destructure ethers from hardhat
require("dotenv").config();

async function main() {
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const GANACHE_URL = process.env.API_URL;
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

    console.log("✅ QuestReward contract deployed at:", carbonCredit.address);
}

main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
});
