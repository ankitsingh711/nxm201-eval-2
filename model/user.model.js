const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: "String", unique: true},
    name: String,
    age: Number,
    mob_num: Number,
    role: String,
    password: String
}, {versionKey: false})

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };