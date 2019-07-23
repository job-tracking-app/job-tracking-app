require("dotenv").config();
const express = require("express");
const morgan = require("morgan")
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/user")


const {SERVER_PORT, DATABASE_URL} =process.env;

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    keepAlive: true
}, () => {
    console.log("Connected to MongoDB")
})

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// All Routes
app.use("/user", authRoutes )

//Sending cleaner errors through json

// app.use((req,res,next) => {
//     let err = new Error("Not Found");
//     let status = 404;
//     next(err);
// })
// app.use(errorHandler);

//Start Server
app.listen(SERVER_PORT, () =>{
    console.log(`I am listening ${SERVER_PORT}`)
})
