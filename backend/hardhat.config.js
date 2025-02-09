/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ganache",
   networks: {
      hardhat: {
         chainId: 1337
      },
      ganache: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
   paths: {
      artifacts: "./artifacts"
   }
}