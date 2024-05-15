const express=require("express")
const router=express.Router()
const moviesController=require("../Controllers/MoviesController")
router.get('/',moviesController.getAllMovies)

module.exports=router
