/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY, ALCHEMY_API_URL } = process.env;
console.log("ALCHEMY_API_URL", ALCHEMY_API_URL);
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.28",
    defaultNetwork: "ganache",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        ganache: {
            url: API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        sepolia: {
            url: ALCHEMY_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
    paths: {
        artifacts: "./artifacts",
    },
};
