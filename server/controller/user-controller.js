import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Token from "../model/token.js";

export const signupUser = async (req,res) => {

    try {
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const user = req.body;
        console.log(user);

        const newUser = new User(user);
        await newUser.save();

        return res.status(200).send({msg:'signup successful'});
    } catch (error) {
        return res.status(500).json({msg:'signup unsuccessful'});
    }
}

export const loginUser = async (req,res) => {
    try {
        let user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(400).json({msg: "Username not found"})
        }
    
        try {
            let match = await bcrypt.compare(req.body.password , user.password);
            if(match){
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
                const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
    
                const newToken = new Token({token: refreshToken});
                await newToken.save();
    
                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username});
            }
            else{
                return res.status(400).json({msg: 'Password does not match'});
            }
        } catch (error) {
            return res.status(500).json({msg: "login unsuccessful"});
        }
        
    } catch (error) {
        return res.status(500).json({msg: 'Error with request'})
    }

}