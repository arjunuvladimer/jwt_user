const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


// Encrypt the password
UserSchema.pre('save', function (next){
    const saltRounds = 10
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

module.exports = mongoose.model("user",UserSchema)