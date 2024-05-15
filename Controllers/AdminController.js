const user=require("../Models/User")
const booking=require("../Models/Booking")
const movie=require("../Models/Movie")
class AdminController{
    static async getAllUsers(req,res){
        try{
            var result=await user.getAllUsers();
            if(result){
                res.send(result)
            }
        }catch(error){
            console.error("Error fetching users:", error);
            res.status(500).send("Internal server error");
        }
    }

    static async getAllMovies(req, res) {
        try {
            var results = await movie.getAllMovies(); 
            if (results) {
                res.send(results);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            res.status(500).send("Internal server error");
        }
    }

    static async addNewUser(req,res){
        try{
            var name=req.body.name
            var email=req.body.email
            var password=req.body.password
            var privilege=req.body.type
            var result=await user.addNewUser(name,email,password,privilege)
            if(result){
                res.status(201).send("User Added successfly")
            }
            else{
                res.status(400).send("Add user failed")
            }

        }catch(error){
            res.status(500).send("Internal server error")
        }
    }
    static async deleteMovie(req,res){
        var movie_id=req.params.id
        var result=await movie.deleteMovie(movie_id)
        if(result){
            res.status(201).send("Movie deleted successffly")
        }else{
            res.status(500).send("Delete movie failed")
        }
    }

    static async editMovie(req,res){
        var movie_id=req.body.movie_id
        var movie_name=req.body.movie_name
        var seats=req.body.seats
        var show_date=req.body.show_date
        var show_time=req.body.show_time
        var result=await movie.editMovie(movie_id,movie_name,seats,show_date,show_time)
        if(result){
            res.status(201).send("Movie updated successfflly")
        }
        else{
            res.status(500).send("Update Movie failed")
        }
    }

    static async editUser(req,res){
        var user_id=req.body.id
        var name=req.body.name
        var email=req.body.email
        var password=req.body.password
        var privillage=req.body.privillage
        var result=await user.editUser(user_id,email,password,name,privillage)
        if(result){
            res.status(201).send("User data updated successffuly")
        }
        else{
            res.status(500).send("Update User data failed")
        }
    }

    static async deleteUser(req,res){
        var user_id=req.params.id
        var result=await user.deleteUser(user_id)
        if(result){
            res.status(201).send("User deleted successffly")
        }
        else{
            res.status(500).send("Delete user failed")
        }
    }

}

module.exports=AdminController