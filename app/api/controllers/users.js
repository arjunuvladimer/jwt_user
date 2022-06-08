// LIBRARIES
const bcrypt = require('bcrypt')
// Used:
// Compare the password we are passing it through req.body.password 
// and database password => Hashed

const jwt = require('jsonwebtoken')
// Used:
// Generating Security Token based on Login Credentials

// Required the model and intialized to const variable UserModel
const UserModel = require('../models/users')

// Intialized create const variable to a lambda function 
const create = (req,res,next) => {
    // Params
    // => req => from client => to get body Object with keys => name, email, password 
    // => res => from the server
    // => next => to exectute next step

    // Object Destructuring
    const {name,email,password} = req.body

    // Mongoose => Imported the Model => Create Function
    // Param:
    // => First Param => Object with the fields of the document
    // => Second Param => CallBack Function
    //                  => Params
    //                  => Err => Reports if some error while storing the document to database
    //                  => Result => Entire Document Object which is saved with the database is returned
    UserModel.create({
        name, // Key:Value has same identity you can just give one identity
        email,
        password
    }, (err,result) => {
        if(err)
            next(err) // Next Step to Show that error
        else
            // Send Response with the status code of 200
            // Json Function => Object => status, message, data: result[object]
            res.status(200).json({
                status: "Success",
                message: "User Added Successfully",
                data: result
            })
    })
} 


// create(err="some", result="some string"){
//     callback(err,result) // Function Call 
// }

// Intializing Login const variable with lambda function
const login = (req,res,next) => {
    // Params
    // req => Taking request from client => body => object => email
    // res => Sending response from server to client
    // next => next step execution

    // UserModel 
        // FindOne
            // Params
            // 1. FieldName => Any => Email
            // 2. CallBack Function
                // Params
                // Err => If Something goes wrong in the database
                // result => getting the document object back from the database
    UserModel.findOne({email:req.body.email}, (err,result) => {
        if(err){
            next(err)
        }
        else{
            // Compare the password using bcrypt if it is true
            if(bcrypt.compare(req.body.password, result.password)){
                // Generatin the token using jwt.sign
                // Sign Function
                // Params
                // id, secretKey, and expire session time for the token
                const token = jwt.sign({id:result._id},req.app.get('secretKey'), {expiresIn:'1h'})
                // Sending Response with status, message, and data => {result, token}
                res.json({
                    status:"Success",
                    message:"Successfully Logged in",
                    data: {
                        user: result,
                        token: token
                    }
                })
            }
        }
    })
}

// Exporting the module create and login => object
module.exports = {create, login}