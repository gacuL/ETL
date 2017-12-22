const mongoose = require('mongoose');
const opinionSchema = require('./opinion-model');

let itemSchema = new mongoose.Schema({
    type: String,
    brand: String,
    model: String,
    pagesNumber: Number,
    numOfPages: Number,
    id: Number,
    reviews: [opinionSchema]
});


module.exports = mongoose.model("Item", itemSchema);


