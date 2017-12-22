const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let opinionSchema = new Schema({
    pros: String,
    cons: String,
    reviewContent: String,
    stars: String,
    reviewerName: String,
    reviewDate: Date
});

module.exports = opinionSchema;

