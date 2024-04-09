import { Request,Response,NextFunction } from "express";
import jwt,{JwtPayload}from "jsonwebtoken"
const secret=process.env.SECRET||"";
export const authenticate=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization;
    if(authHeader) {
        const token=authHeader.split(' ')[1];
        
        if(token) {
            jwt.verify(token,secret,(err:any,payload)=>{
                if(err) return res.sendStatus(403);
                if(!payload) return res.sendStatus(403);
                if(typeof payload==="string") return res.sendStatus(403);
                req.headers["userId"]=payload.id;
                next();
            })
        }
        
        else res.sendStatus(401);
    }    
}