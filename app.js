const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Attendance = require("./models/attendance");

const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/attendanceDB");

// View engine setup
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home page route
app.get("/", (req, res) => {
    res.render("index");
});

// Save attendance
app.post("/submit", async (req, res) => {

    const record = new Attendance({
        name: req.body.name,
        roll: req.body.roll
    });

    await record.save();

    res.redirect("/");
});

// Show records page
app.get("/records", async (req, res) => {

    const data = await Attendance.find();

    res.render("records", { data });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
