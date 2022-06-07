const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const userRoute = require('./app/api/routes/users')
const { default: mongoose } = require('mongoose')


app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/user',userRoute)
app.set('secretKey','hdjsakfhdjsk')


app.get('/', (req,res) => {
    res.json({
        "APP": "JWT Based API Application",
        "message": "Successfully Running the Application"
    })
})

const mongoURI = "mongodb+srv://arjunuvlad:arjun123@hitman24.ct1jy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI)
.then(() => {
    console.log("Successfully Connected to the Database")
})
.catch((err) => {
    console.log(err)
})

app.listen(5000,() => {
    console.log("Successfully Running on the PORT: 5000")
})