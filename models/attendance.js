const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    name: String,
    roll: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);