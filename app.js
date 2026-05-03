const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Attendance = require("./models/attendance");

const app = express();

// MongoDB connection
mongoose.connect(
"mongodb://anhadparihar07_db_user:1234567890qwertyuiop@ac-xpzxcmc-shard-00-00.yzwqadv.mongodb.net:27017,ac-xpzxcmc-shard-00-01.yzwqadv.mongodb.net:27017,ac-xpzxcmc-shard-00-02.yzwqadv.mongodb.net:27017/attendanceDB?ssl=true&replicaSet=atlas-fixogy-shard-0&authSource=admin&retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// View engine setup
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home page route
app.get("/", (req, res) => {

    const success = req.query.success;

    res.render("index", { success });

});

// Save attendance
app.post("/submit", async (req, res) => {

    const record = new Attendance({
        name: req.body.name,
        roll: req.body.roll
    });

    await record.save();

    res.redirect("/?success=true");
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
