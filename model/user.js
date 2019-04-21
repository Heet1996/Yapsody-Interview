const jwt=require('jsonwebtoken');


var {con}=require('../dbConnection/db_connection');
var {config}=require('../config/config');
let {Venues}=require('../model/venues');

class User
{   
    constructor(user)
    {
         this.fname=user.first_name;
         this.lname=user.last_name;
         this.email_id=user.email_id;
         this.password=user.password;
         this.mobile_number=user.mobile_number
         
    }
    save()
    {
       return new Promise((resolve,reject)=>{
            //Check is user laready exist
            let checkUser=`SELECT email_id FROM users WHERE email_id = ?`;
            con.query(checkUser,[this.email_id],(err,result)=>{
                if(result)
                return reject("User already exist")
                let sql=`INSERT INTO users (first_name,last_name,email_id,password,mobile_number) 
                VALUES ('${this.fname}','${this.lname}','${this.email_id}','${this.password}','${this.mobile_number}')`; 
                con.query(sql, function (err, result) {
                console.log(err);
                if (err) return reject(result);
                var token=jwt.sign({fname:this.fname,email_id:this.email_id},config.secret).toString();
                return resolve(token);         
                });
    });
        

            
    })
}

    findUser()
    {
         
         
        return new Promise((resolve,reject)=>{
            
            let sql=`SELECT * FROM users WHERE email_id = ? AND password = ?`; 
            con.query(sql,[this.email_id,this.password], function (err, result) {
                
                    if (err || result.length<=0) {return reject("User Mail or Password incorrect ")};
               
                    var token=jwt.sign({fname:this.fname,email_id:this.email_id},config.secret).toString();
                    

                    return resolve(token);
                                         
            });

           
            });
    }
    createEvent(venues)
    {   venues.forEach((venue)=>{
        var createVenue=new Venues(venue);
        createVenue.save()
                   .then(()=>{console.log("Venue saved successfully");}) 
    })
        
        
    }
    

   


}

module.exports={User};