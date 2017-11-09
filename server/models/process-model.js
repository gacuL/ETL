const mongoose = require('mongoose');

let processSchema = new mongoose.Schema({
    processId: Number,
    date: { type: Date, default: Date.now },
    pending: Boolean
});

module.exports = mongoose.model("Process", processSchema);

