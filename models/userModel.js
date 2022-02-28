const mongoose = require("mongoose")

//Defin the user model schema for users data to mongodb
//By default all users are not admin, if isAdmin true Admin account shown
const userSchema = mongoose.Schema({
    name : {type: String, require},
    email : {type: String, require},
    password : {type: String, require},
    isAdmin : {type: Boolean, require, default: false},
} , {
    timestamps: true,
})

module.exports = mongoose.model('users', userSchema)