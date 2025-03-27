require('dotenv').config();
require("@nomiclabs/hardhat-ethers");




module.exports = {
    solidity: "0.8.0",
    networks: {
      ganache: {
        url: "http://127.0.0.1:7545", // Default Ganache URL
        accounts: ["0x7a89d502d84a240891685e27f595ea6cfb8ec83e5189cd279fb7c234f0d46ab4"],    // You can use the private key of any Ganache account
      },
    },
  };