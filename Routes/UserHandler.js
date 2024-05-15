const express=require("express")
const router=express.Router();
const usersController=require("../Controllers/UsersController")
router.post('/login',usersController.Login)
router.post('/registration',usersController.Registration)
router.post('/booking',usersController.Booking)
router.post('/edit/booking',usersController.editBooking)
router.get('/delete/booking/:id',usersController.deleteBooking)
router.get('/profile/:email',usersController.showProfile)
module.exports=router