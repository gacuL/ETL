const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    id: Number,
    date: { type: Date, default: Date.now() },
    pending: Boolean,
    savedToDb: Boolean
});

module.exports = mongoose.model("Process", taskSchema);

