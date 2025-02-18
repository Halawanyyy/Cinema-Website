const express=require("express")
const router=express.Router()
const usersController=require("../Controllers/UsersController")
const moviesController=require("../Controllers/MoviesController")
const adminController=require("../Controllers/AdminController")
router.get('/show/Users',adminController.getAllUsers)
router.post('/add/User',adminController.addNewUser)
router.post('/edit/User',adminController.editUser)
router.get('/delete/User/:id',adminController.deleteUser)
router.get('/show/Movies',adminController.getAllMovies)
router.get('/delete/Movie/:id',adminController.deleteMovie)
router.post('/add/Movie',moviesController.addNewMovie)
router.post('/edit/Movie',adminController.editMovie)
module.exports=router