const user=require("../Models/User")
const booking=require("../Models/Booking")
const movie=require("../Models/Movie")
class UsersController{
    static async Registration(req,res){
        try{
            
            var name=req.body.name
            var email=req.body.email
            var password=req.body.password
            var result=await user.Registration(name,email,password)
            if(result){
                res.status(201).send("Registration done successfflly");
            }
            else{
                res.status(400).send("Registration Failed");
            }

        }catch(error){
            console.error("Error in registration:", error);
            res.status(500).send("Internal server error");
        }
    }
    static async Login(req,res){
        var email=req.body.email
        var password=req.body.password
        var result=await user.getUser(email,password)
        if(result.length>0){
            res.send(result)
        }
        else{
            res.send("No match data")
        }
    }
    static async Booking(req,res){
        var user_id=req.body.user_id
        var movie_id=req.body.movie_id
        var tickets=req.body.tickets
        var payment_method=req.body.payment_method
        var result=booking.addNewBooking(user_id,movie_id,tickets,payment_method)
        var updateSeats=movie.updateSeats(movie_id,tickets)
        if(result && updateSeats){
            res.status(201).send("Booking done successfflly")
        }
        else{
            res.status(400).send("Can't book")
        }
    }

   
    static async showProfile(req,res){
        var email =req.params.email
        var result=await user.profile(email)
        if(result){
            res.send(result)
        }
        else{
            res.send("Error")
        }
    }

    static async editBooking(req,res){
        var booking_id=req.body.booking_id
        var tickets=req.body.tickets
        var payment_method=req.body.payment_method
        var result=await booking.editBooking(booking_id,payment_method,tickets)
        if(result){
            res.status(201).send("Booking updated successflly")
        }
        else{
            res.status(400).send("Edit booking failed")
        }
    }

    static async deleteBooking(req,res){
        var booking_id=req.params.id
        var result=await booking.deleteBooking(booking_id)
        if(result){
            res.status(201).send("Booking deleted successfflly")
        }
        else{
            res.status(400).send("Delete booking failed")
        }
    }

}
module.exports=UsersController