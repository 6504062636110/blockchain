const express = require("express");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (req, res) => {

    res.status(200).send({
        status: true,
        message: 'hello world!',
    })
});

app.post("/messages", (req, res) => {

    console.log( req.body );
    //TODO: implemnt writing into smart contract;

    res.status(200).send({
        status: true,
        message: 'Succefully added message.'
    })
})