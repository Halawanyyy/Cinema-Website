const movie=require("../Models/Movie")

class MovieController{
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

    static async addNewMovie(req,res){
        try {
            var name=req.body.name
            var seats=req.body.seats
            var ticket_price=req.body.ticket_price
            var show_date=req.body.show_date
            var show_time=req.body.show_time
            var result = await movie.addNewMovies(name,seats,show_date,show_time,ticket_price);
            if (result) {
                res.status(201).send("Movie added successfully");
            } else {
                res.status(400).send("Failed to add movie");
            }
        } catch (error) {
            console.error("Error adding new movie:", error);
            res.status(500).send("Internal server error");
        }
    }
}

module.exports=MovieController