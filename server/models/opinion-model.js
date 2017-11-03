const mongoose = require('mongoose');

let opinionSchema = new mongoose.Schema({
    pros: String,
    cons: String,
    content: String,
    stars: Number,
    author: String,
    Date: Date
});

module.exports = mongoose.model("Opinion", opinionSchema);
