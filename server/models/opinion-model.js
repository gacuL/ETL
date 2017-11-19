const mongoose = require('mongoose');

let opinionSchema = new mongoose.Schema({
    pros: String,
    cons: String,
    content: String,
    stars: Number,
    author: String,
    date: Date
});

module.exports = mongoose.model("Opinion", opinionSchema);
