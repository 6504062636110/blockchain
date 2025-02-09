const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const { ethers } = require("ethers");
const contractABI = require("./artifacts/contracts/hello-world.sol/HelloWorld.json"); 

const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get("/status", async(req, res) => {
    const message = await contract.message();
    res.status(200).send({
        status: true,
        message: 'hello world!',
        data: {
            message
        }
    })
});
app.post("/update", async (req, res) => {
    try {
      const { newMessage } = req.body;
      const tx = await contract.update(newMessage);
      await tx.wait();
      res.json({ txHash: tx.hash, newMessage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// app.post("/messages", (req, res) => {

//     console.log( req.body );
//     //TODO: implemnt writing into smart contract;

//     res.status(200).send({
//         status: true,
//         message: 'Succefully added message.'
//     })
// })