let jwt=require('jsonwebtoken');
let {config}=require('./config/config');

let authenticate=(req,res,next)=>{
    let token=req.header('x-auth');
    jwt.verify(token,config.secret,(err,result)=>{
        if(err) {return res.status(404).send({message:"Not authenticated"})}
        req.token=token;
        next();
    })
    
}
module.exports={authenticate};
