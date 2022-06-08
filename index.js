// LIBRARIES
const express = require('express') 
// Used
// 1. Creating the Server => listen with the port number
// 2. Routing of your API => .get,.post,.put,.delete
// 3. Configuring Middlewares => .use => body-parser, morgan, router
const logger = require('morgan')
// Used
// API is hit => method, route, statucode, process time of request and response
const bodyParser = require('body-parser')
// Used
// Here we have used it json based
const mongoose = require('mongoose')
// Used
// Connect with Database
const jwt = require('jsonwebtoken')
// Used
// Verify the security token


// Application

// Intialized App Variable to Express Function
const app = express()

// Intializing Logger for the express to use
app.use(logger('dev'))
// Intializing bodyParser.json() for the express to use
app.use(bodyParser.json())

// Client hits the ip: localhost we are trying to listen to him at the port 5000
app.listen(5000,() => {
    console.log("Successfully Running on the PORT: 5000")
})

// Default Route / => Send the response json => object => 
app.get('/', (req,res) => {
    res.sendFile('/Users/apple/Desktop/ Star /jwt_user/sample.html')
})

// Intializing the URI to const variable
const mongoURI = "mongodb+srv://arjunuvlad:arjun123@hitman24.ct1jy.mongodb.net/?retryWrites=true&w=majority"

// connect function to connect to database
mongoose.connect(mongoURI) // Successfully Runs
.then(() => { // Next Step is to print a message to console
    console.log("Successfully Connected to the Database")
})
.catch((err) => { // Next Step is to print an error message to console
    console.log(err)
})


// Custom Lambda Function with a const Variable 
const userValidation = (req, res,next) => { 
    // Params 
    // - req => takes the request from client
    // - res => send response from server 
    // - next => next step to be executed

// Setter set a secretKey with a random string for your jwt intial token generation
app.set('secretKey','hdjsakfhdjsk')

    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), 
    (err,decoded) =>{
        if(err){
            res.json({
                message: err 
                // errr => {
                // "name": "JsonWebTokenError",
                // "message": "jwt must be provided"
                // }
            })
        }
        next() // Execute the next step
    })
    // Verify Function 
    // Params
    // => req.headers['x-access-token']
    // => req.app.get('secretKey')
    // => Call Back Function 
}

// Imported Routes of User and Movie
const userRoute = require('./app/api/routes/users')
const movieRoute = require('./app/api/routes/movies')


// Express to use user Route with a default URL => /user
app.use('/user',userRoute)
// Express to use user Route with a default URL => /movie
app.use('/movie',userValidation, movieRoute)

