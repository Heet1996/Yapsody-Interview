let user=require('./model/user');
let authenticate=(req,res,next)=>{
    let token=req.header('x-auth');
    
    next();
}
module.exports={authenticate};
