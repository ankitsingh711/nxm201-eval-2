const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./config/db.js");
const { RouteRouter } = require("./router/route.js");

app.use(express.json());
app.use("/", RouteRouter);

app.get("/", (req,res)=>{
    try {
        res.send("Home Page");
    } catch (error) {
        console.log(error);
    }
})

let port = process.env.PORT;
app.listen(port, async()=>{
    try {
        await connection;
        console.log("Connected to the DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running on the port ${port}`)
})