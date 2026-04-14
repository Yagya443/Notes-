const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model.js");

const { authenticationToken } = require("./utils");
require("dotenv").config();

mongoose.connect(config.connectionString);

const app = express();

//MiddleWares
app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS || "*",
    }),
);

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

app.post("/create-account", async (req, res) => {
    const { fullname, email, password } = req.body || {};

    if (!fullname) {
        return res
            .status(400)
            .json({ error: true, message: "FullName is Required" });
    }

    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "email is Required" });
    }
    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is Required" });
    }
    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already Exist",
        });
    }

    const user = new User({
        fullname,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Sucessfull",
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    
    if (!email) {
        return res
        .status(400)
        .json({ error: true, message: "Email is Required" });
    }
    if (!password) {
        return res
        .status(400)
        .json({ error: true, message: "Password is Required" });
    }
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
        return res
            .status(400)
            .json({ error: true, message: "Account Doesnt Exist" });
    }
    if (isUser.email == email && isUser.password == password) {
        const user = { user: isUser };

        const accessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "30m",
            },
        );
        return res.json({
            error: false,
            email,
            accessToken,
            message: "Successfully Login",
        });
    }
    else{
        res.status(400).json({
            error:true,
            message:"Invalid Credentials"
        })
    }
});



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//

app.listen(process.env.PORT || 3000, () => {
    console.log(`${process.env.PORT}`);
});

module.exports = app;
