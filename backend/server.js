const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model.js");
const Note = require("./models/notes.model.js");

const authenticateToken = require("./utils");
require("dotenv").config();

mongoose.connect(config.connectionString);

const app = express();

// Middlewares
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
            .json({ error: true, message: "Email is Required" });
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is Required" });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullname,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60h" },
    );

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body || {};

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

    const isUser = await User.findOne({ email });

    if (!isUser) {
        return res
            .status(400)
            .json({ error: true, message: "Account doesn't exist" });
    }

    if (isUser.password === password) {
        const accessToken = jwt.sign(
            { _id: isUser._id, email: isUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "60h" },
        );

        return res.json({
            error: false,
            email,
            accessToken,
            message: "Successfully Logged In",
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        });
    }
});

app.post("/add-notes", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body || {};
    const user = req.user;

    if (!title) {
        return res.status(400).json({
            error: true,
            message: "Title is Required",
        });
    }

    if (!content) {
        return res.status(400).json({
            error: true,
            message: "Content is Required",
        });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Added Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;

    const { title, content, tags, isPinned } = req.body || {};
    const user = req.user;

    if (!title && !content && !tags) {
        return res
            .status(400)
            .json({ error: true, message: "No Changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res
                .status(400)
                .json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note update Successfully",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
});

app.get("/get-notes", authenticateToken, async (req, res) => {
    const user = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({
            isPinned: -1,
        });

        return res.json({
            error: false,
            notes,
            message: "Successfully fetch all the notes",
        });
    } catch(error) {
        return res.status(500).json({
            error: true,
            message: "Successfully fetch all the notes",
        });
    }
});









app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port:", process.env.PORT || 3000);
});

module.exports = app;
