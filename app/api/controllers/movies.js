const MovieModel = require('../models/movies')


// Create
const createMovie = (req,res,next) => {
    let {name,release_date} = req.body
    MovieModel.create({
        name,
        release_date
    }, (err,result) => {
        if(err)
            next(err)
        res.json({
            status:"Success",
            message:"Added Movie Successfully"
        })
    })
}

// Read
const readAllMovies = (req,res,next) => {
    MovieModel.find({}, (err,result) => {
        if(err)
        next(err)
        res.json({
            status:"Success",
            message:"Successfully Retrieved all the Movies",
            data:{
                movies: result
            }
        })
    })
} 

// Read By Id
const readMovieById = (req,res,next) => {
    MovieModel.findById(req.params.id, (err,result) => {
        if(err)
            next(err)
        res.json({
            status:"Success",
            message:"Successfully Retrieved Movie By ID",
            data:{
                movie: result
            }
        })
    })
} 


// Update By Id
const updateMovieById = (req,res,next) => {
    MovieModel.findByIdAndUpdate(req.params.id,req.body,(err,result) => {
        if(err)
            next(err)
        res.json({
            status:"Success",
            message:"Successfully Updated Movie By ID",
            data:{
                movie: result
            }
        })
    })
} 

// Delete Movie By Id
const deleteMovieById = (req,res,next) => {
    MovieModel.findByIdAndRemove(req.params.id,(err,result) => {
        if(err)
            next(err)
        res.json({
            status:"Success",
            message:"Successfully Deleted Movie By ID",
            data:{
                movie: result
            }
        })
    })
} 

module.exports = {createMovie, readAllMovies, readMovieById, updateMovieById, deleteMovieById}