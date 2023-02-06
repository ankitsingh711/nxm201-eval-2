const mongoose = require("mongoose");

const goldSchema = mongoose.Schema({
    username: String,
    email: String,
    name: String,
    age: Number,
    mob_num: Number,
    role: String
})

const GoldModel = mongoose.model("gold", goldSchema);

module.exports = { GoldModel };