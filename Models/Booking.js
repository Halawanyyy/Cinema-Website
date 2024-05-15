const db=require('../Config/DB')
class BookingModel{
    static async addNewBooking(user_id,movie_id,tickets,payment_method){
        return new Promise((resolve,reject)=>{
            db.query("insert into bookings(user_id,movie_id,tickets,payment_method) VALUES(?,?,?,?)",
                [user_id,movie_id,tickets,payment_method],(err,result)=>{
                    if(!err){
                        console.log("DONE")
                        resolve(true)
                    }
                    else{
                        console.log("Failed to book")
                        resolve(false)
                    }
                }
            )
        })
        
    }
    static async editBooking(booking_id,payment_method,tickets){
        return new Promise((resolve,reject)=>{
            db.query("SELECT movie_id,tickets FROM bookings WHERE id=?",[booking_id],(err,result)=>{
                if(!err){
                    var old_ticket=result[0].tickets
                    var movie_id=result[0].movie_id
                    if(tickets>old_ticket){
                        var different=tickets-old_ticket
                        db.query("UPDATE bookings SET tickets=?, payment_method=? WHERE id=?",
                        [tickets,payment_method,booking_id],(err,result)=>{
                            if(!err){
                                db.query("UPDATE movies SET seats=seats-? WHERE id=?",[different,movie_id],(err,result)=>{
                                    if(!err){
                                        resolve(true)
                                    }
                                    else{
                                        resolve(false)
                                    }
                                })
                            }else{
                                resolve(false)
                            }
                        });
                        
                    }
                    else if(tickets<old_ticket){
                        var different=old_ticket-tickets
                        db.query("UPDATE bookings SET tickets=?, payment_method=? WHERE id=?",
                        [tickets,payment_method,booking_id],(err,result)=>{
                            if(!err){
                                db.query("UPDATE movies SET seats=seats+? WHERE id=?",[different,movie_id],(err,result)=>{
                                    if(!err){
                                        resolve(true)
                                    }
                                    else{
                                        resolve(false)
                                    }
                                })
                            }else{
                                resolve(false)
                            }
                        });
                    }
                    else if(tickets==old_ticket){
                        db.query("UPDATE bookings SET payment_method=? WHERE id=?",
                        [payment_method,booking_id],(err,result)=>{
                            if(!err){
                                resolve(true)
                            }
                            else{
                                resolve(false)
                            }
                         }   
                    )
                }
        }else{
            resolve(false)
        }})
           
        })
    }

    static async deleteBooking(booking_id){
        return new Promise((resolve,reject)=>{
            db.query("SELECT movie_id,tickets FROM bookings WHERE id=?",[booking_id],(err,result)=>{
                if(!err){
                    db.query("UPDATE movies SET seats=seats+? WHERE id=?",[result[0].tickets,result[0].movie_id],(err,result)=>{
                        if(!err){
                            db.query("DELETE FROM bookings WHERE id=?",[booking_id],(err,result)=>{
                                if(!err){
                                    resolve(true)
                                }
                                else{
                                    resolve(false)
                                }
                            })
                        }
                    })
                }else{
                    resolve(false)
                }
            })
        })
    }

}

module.exports=BookingModel