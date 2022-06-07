const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movies')

// Create
router.post('/create',movieController.createMovie)
// Read
router.get('/getAllMovies',movieController.readAllMovies)
// Read By Id
router.get('/getMovieById/:id',movieController.readMovieById)
// Update By Id
router.put('/updateMovieById/:id',movieController.updateMovieById)
// Delete By Id
router.delete('/deleteMovieById/:id',movieController.deleteMovieById)

module.exports = router