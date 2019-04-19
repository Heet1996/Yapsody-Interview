var {con}=require('../dbConnection/db_connection');

class Venues
{
    constructor(venue)
    {
        this.vName=venue.name;
        this.code=venue.code;
        this.status=venue.status;
        this.timezone=venue.timezone;
        this.events=venue.events;
        
    }
    save()
    {
        return new Promise((resolve,reject)=>{
            let sql=`INSERT INTO venues (name,code,status,timezone,events) VALUES ('${this.vName},${this.code},${this.status},${timezone}')`;
            con.query(sql,(err,res)=>{
                if(err) {console.log(err);return reject(err)};
                return     
            });

        })
    }
}

module.exports={Venues};