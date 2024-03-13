const jwt=require('jsonwebtoken')
const secret=process.env.SECRET;
const authenticate=(req,res,next)=>{
    const authHeader=req.header.authorization;
    if(authHeader) {
        const token=authHeader.split(' ')[1];
        if(token) {
            jwt.verify(token,secret,(err,user)=>{
                if(err) return res.sendstatus(403);
                req.user=user;
                next();
            })
        }
        
        else res.sendstatus(401);
    }    
}
module.exports={
    authenticate
}