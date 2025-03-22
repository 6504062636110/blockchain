const express = require("express");
const session = require('express-session')
const mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    user: "recycle-db",
    password: "supersecret",
    database: "recycle-db",
});

connection.connect();

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
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get("/status", async (req, res) => {
    const message = await contract.message();
    res.status(200).send({
        status: true,
        message: "I LOVE CAT",
        data: {
            message,
        },
    });
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

app.get('/profile', async (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: "User not logged in" });
    }
})

app.post("/register", async (req, res) => {
    connection.query(`
    INSERT INTO \`customer\`(
        \`Name\`,
        \`Surname\`,
        \`PhoneNumber\`,
        \`Username\`,
        \`Password\`,
        \`WalletAddress\`
    )
    VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )    
    `, [
        req.body.Name,
        req.body.Surname,
        req.body.PhoneNumber,
        req.body.Username,
        req.body.Password,
        ''
    ], function (error, results, fields) {
        req.session.user = { cusId: results.insertId }
        res.send("สมัครบัญชีเรียบร้อยแล้ว");
    });
});

// app.post("/messages", (req, res) => {

//     console.log( req.body );
//     //TODO: implemnt writing into smart contract;

//     res.status(200).send({
//         status: true,
//         message: 'Succefully added message.'
//     })
// })
