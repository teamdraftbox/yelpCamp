var mongoose = require("mongoose"),
passportmongoose = require("passport-local-mongoose")

var userSchema  = new mongoose.Schema({
    username:String,
    password:String
})

userSchema.plugin(passportmongoose)

module.exports = mongoose.model("user",userSchema)