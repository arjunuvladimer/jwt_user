// LIBRARIES
const mongoose = require('mongoose')
// Used:
// => Defining Schema for the Database => Collection => user
const bcrypt = require('bcrypt')
// Used:
// => Password Encryption

// Intialized const variable => object =>  with new instance of Schema
// Inside Schema => Param as property => Object with some key value pairs
const UserSchema = new mongoose.Schema({
    name:{
        // Defining the type of the document field, it is required by boolean: true
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


// Pre Function
// Used:
// It Runs the statements in the callback function 
// before saving,updating anything to database
UserSchema.pre('save', function (next){
    
    const saltRounds = 10
    // Encrypt the password
    this.password = bcrypt.hashSync(this.password, saltRounds)
    // We have set rounds to be 10 
    // ArjunR56789567879 // Salting the Password
    // Hashing the password // Hashing the Password

    // The Next Step to be executed
    next()
})

// Exporting the module and also executing your model function call
module.exports = mongoose.model("user",UserSchema)