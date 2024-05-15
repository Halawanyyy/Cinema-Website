const db=require("../Config/DB")
class UserModel{
    static async getAllUsers(){
        return new Promise((resolve,reject)=>{
            db.query("SELECT name,email from users",[],(err,result)=>{
                if(!err){
                    console.log("Done")
                    resolve(result)
                }
                else{
                    console.log("Error : ",err)
                    reject(err)
                }
            })
        })
    }
    // Registration
    static async Registration(name,email,password){
        return new Promise((resolve,reject)=>{
            db.query("insert into users (name,email,password,privillage) values(?,?,?,'user')",[name,email,password],
            (err,result)=>{
                if(!err){
                    console.log("Done")
                    resolve(true)
                }
                else{
                    console.log("Error : ",err)
                    resolve(false)
                }
            }
        )
        })
    }
    // Add by admin
    static async addNewUser(name,email,password,privillage){
        return new Promise((resolve,reject)=>{
            db.query("insert into users(name,email,password,privilege) values(?,?,?,?)",
            [name,email,password,privillage],(err,result)=>{
                if(!err){
                    console.log("Done")
                    resolve(true)
                }
                else{
                    console.log("Error : ",err)
                    resolve(false)
                }
            })
            
        })
    }
    // Login
    static async getUser(email,password){
        return new Promise((resolve,reject)=>{
            db.query("SELECT * from users WHERE email=? AND password=?",[email,password],(err,result)=>{
                if(!err){
                    console.log("Done")
                    resolve(result)
                }
                else{
                    console.log("Error : ",err)
                    reject(err)
                }
            })
        })
    }
    static async profile(email){
        return new Promise((resolve,reject)=>{
            db.query("SELECT id FROM users WHERE email=?",[email],(err,result)=>{
                if(!err){
                    const query = `
                        SELECT 
                            u.name AS user_name, 
                            u.email AS user_email, 
                            u.password AS user_password,
                            m.name AS movie_name, 
                            m.show_date, 
                            m.show_time,
                            b.tickets, 
                            b.payment_method,
                            (m.ticket_price * b.tickets) AS total_price
                        FROM 
                            bookings b
                        JOIN 
                            users u ON u.id = b.user_id
                        JOIN 
                            movies m ON b.movie_id = m.id
                        WHERE 
                            u.id = ?;
                    `;
                    db.query(query, [result[0].id], (error, results) => {
                        if(!error){
                            resolve(results)
                        }
                        else{
                            console.log("ERROR : ",error)
                            resolve(false)
                        }
                    })
                }
            })
        })
    }

    static async editUser(user_id,user_email,user_password,user_name,privillage){
        return new Promise((resolve,reject)=>{
            db.query("UPDATE users SET name=?,email=?,password=?,privillage=? WHERE id=?",
            [user_name,user_email,user_password,privillage,user_id],(err,result)=>{
                if(!err){
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
        })
    }

    static async deleteUser(user_id){
        return new Promise((resolve,reject)=>{
            db.query("SELECT movie_id,tickets FROM bookings WHERE user_id=?",[user_id],(err1,select_result)=>{
                if(!err1){
                    if(select_result.length > 0){ 
                        db.query("DELETE FROM bookings WHERE user_id=?",[user_id],(err2,result1)=>{
                            if(!err2){
                                db.query("DELETE FROM users WHERE id=?",[user_id],(err3,result2)=>{
                                    if(!err3){
                                        db.query("UPDATE movies SET seats=seats+? WHERE id=?",
                                        [select_result[0].tickets,select_result[0].movie_id],(err,result3)=>{
                                            if(!err){
                                                resolve(true)
                                            } else {
                                                reject(err); 
                                            }
                                        })
                                    } else {
                                        reject(err3); 
                                    }
                                })
                            } else {
                                reject(err2);
                            }
                        })
                    } else {
                        resolve(false)
                    }
                } else {
                    reject(err1);
                }
            })
        })
    }
    


}

module.exports=UserModel