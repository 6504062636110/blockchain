const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    user: "recycle-db",
    password: "supersecret",
    database: "recycle-db",
});

const options = {
    host: "localhost",
    port: 3306,
    user: "recycle-db",
    password: "supersecret",
    database: "recycle-db",
};

const sessionStore = new MySQLStore(options);

connection.connect();

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const { ethers } = require("ethers");
const contractABI = require("./artifacts/contracts/recycle-credit-token.sol/CarbonCredit.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json());
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        store: sessionStore,
    }),
);

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

app.get("/profile", async (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: "User not logged in" });
    }
});

app.put("/profile", async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ error: "User not logged in" });
    }

    const { name, surname, phoneNumber, walletAddress } = req.body;

    connection.query(
        `
        UPDATE \`customer\` 
        SET 
            \`Name\` = COALESCE(?, \`Name\`),
            \`Surname\` = COALESCE(?, \`Surname\`),
            \`PhoneNumber\` = COALESCE(?, \`PhoneNumber\`),
            \`WalletAddress\` = COALESCE(?, \`WalletAddress\`)
        WHERE \`Cus_ID\` = ?
        `,
        [name, surname, phoneNumber, walletAddress, user.cusId],
        function (error, results, fields) {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "An error occurred in the Database" });
            }

            if (results.affectedRows > 0) {
                // Update session user data
                req.session.user = {
                    ...req.session.user,
                    name: name || req.session.user.name,
                    surname: surname || req.session.user.surname,
                    phoneNumber: phoneNumber || req.session.user.phoneNumber,
                    walletAddress:
                        walletAddress || req.session.user.walletAddress,
                };
                return res.status(200).json({
                    message: "Profile updated successfully",
                    user: req.session.user,
                });
            } else {
                return res.status(400).json({ error: "Profile update failed" });
            }
        },
    );
});

app.post("/register", async (req, res) => {
    connection.query(
        `
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
    `,
        [
            req.body.name,
            req.body.surname,
            req.body.phone,
            req.body.username,
            req.body.password,
            "",
        ],
        function (error, results, fields) {
            req.session.user = { cusId: results.insertId };
            res.send("Account Registration Completed!");
        },
    );
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    connection.query(
        "SELECT * FROM `customer` WHERE `Username` = ? AND `Password` = ?",
        [username, password],
        function (error, results, fields) {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "An error occurred in the Database" });
            }

            if (results.length > 0) {
                const user = results[0];

                req.session.user = {
                    cusId: user.Cus_ID,
                    username: user.Username,
                    name: user.Name,
                    surname: user.Surname,
                    phoneNumber: user.PhoneNumber,
                    walletAddress: user.WalletAddress,
                };
                return res.status(200).json({
                    message: "Login Successful",
                    user: req.session.user,
                });
            } else {
                return res
                    .status(401)
                    .json({ error: "Username or Password is INCORRECT" });
            }
        },
    );
});

app.post("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "Logout Successful" });
});

app.get("/getbalance", async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ error: "User not logged in" });
    }
    const walletAddress = user.walletAddress;
    if (!walletAddress) {
        return res.status(400).json({ error: "User has no wallet address" });
    }

    const balance = await contract.getBalance(walletAddress);
    res.json({ balance: Number(balance) });
});

app.get("/product", async (req, res) => {
    connection.query(
        "SELECT * FROM `product`",
        function (error, results, fields) {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "An error occurred in the Database" });
            }

            res.status(200).json({ products: results });
        },
    );
});

app.post('/order', async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ error: "User not logged in" });
    }

    const walletAddress = user.walletAddress;
    if (!walletAddress) {
        return res.status(400).json({ error: "User has no wallet address" });
    }
})

app.post("/recycle", async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ error: "User not logged in" });
    }
    const walletAddress = user.walletAddress;
    if (!walletAddress) {
        return res.status(400).json({ error: "User has no wallet address" });
    }

    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
        return res.status(400).json({ error: "Amount is required" });
    }

    try {
        const tx = await contract.completeQuest(
            walletAddress,
            parseInt(amount),
        );
        await tx.wait();
        return res.json({ txHash: tx.hash });
    } catch (error) {
        return res.status(500).json({ error: error.message });
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
