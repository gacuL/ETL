const mongoose = require('mongoose');

let itemSchema = new mongoose.Schema({
    type: String,
    brand: String,
    model: String,
});

module.exports = mongoose.model("Item", itemSchema);


