 import jwt from 'jsonwebtoken';
 import dotenv from 'dotenv'
import { request } from 'express';

 dotenv.config( )
 
 export const authenticateToken = (req,res,next ) => {
    try {
        const authHeader = req.header('authorization');
        const token = authHeader.split(' ')[1];
    
        if(token == null){
            return res.status(401).json({msg: 'token is missing'});
        }
    
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if(error){
                return res.status(401).json({msg: "invalid token"})
            }
            request.user = user;
            next();
        })
    } catch (error) {
        return res.status(401).json({msg: 'Error in posting'});
    }
    
 }
