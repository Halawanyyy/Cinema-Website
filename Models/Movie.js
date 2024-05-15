const db=require("../Config/DB");
class MovieModel{
    static async getAllMovies(){
        return new Promise((resolve,reject)=>{
            db.query('SELECT * FROM movies',[],(err,result)=>{
                if(!err){
                    console.log("DONE")
                    resolve(result);
                }
                else
                console.log("ERROR:", err);
                reject(err);
            })
        })
    }
    static async addNewMovies(name, seats, show_date, show_time,ticket_price) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO movies (name, seats,ticket_price ,show_date, show_time) VALUES (?, ?,?, ?, ?)',
                [name, seats, ticket_price,show_date, show_time],
                (err, result) => {
                    if (!err) {
                        resolve(true);
                    } else {
                        console.error('Error adding new movie:', err);
                        resolve(false);
                    }
                }
            );
        });
    }
    // For user Bookings
    static async updateSeats(movie_id, tickets) {
        return new Promise((resolve, reject) => {
            db.query("SELECT seats FROM movies WHERE id = ?", [movie_id], (err, result) => {
                if (!err && result.length > 0) {
                    var current_seats = result[0].seats;
                    if (tickets <= current_seats) {
                        var new_seats = current_seats - tickets;
                        db.query("UPDATE movies SET seats = ? WHERE id = ?", [new_seats, movie_id], (err, result) => {
                            if (!err) {
                                console.log("DONE");
                                resolve(true);
                            } else {
                                console.log("ERROR:", err);
                                resolve(false);
                            }
                        });
                    } else {
                        // Tickets requested exceed current seats
                        resolve(false);
                    }
                } else {
                    // Movie with specified ID not found
                    resolve(false);
                }
            });
        });
    }

    static async deleteMovie(movie_id){
        return new Promise((resolve,reject)=>{
            db.query("DELETE FROM bookings WHERE movie_id=?",[movie_id],(err,result)=>{
                if(!err){
                    db.query("DELETE FROM movies WHERE id=?",[movie_id],(err,result)=>{
                        if(!err){
                            resolve(true)
                        }else{
                            resolve(false)
                        }
                    })
                }else{
                    resolve(false)
                }
            })
        })
    }
    
    static async editMovie(movie_id,name,new_seats,show_date,show_time){
        return new Promise((resolve,reject)=>{
            db.query("UPDATE movies SET name=?,seats=?,show_date=?,show_time=? WHERE id=?",
            [name,new_seats,show_date,show_time,movie_id],(err,result)=>{
                if(!err){
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
        })
    }


}

module.exports=MovieModel