const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Attendance = require("./models/attendance");

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

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

    const records = await Attendance.find();

    res.render("records", { records });

});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
