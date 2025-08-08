import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function(req, res, next){
    // Get token from header

    const token = req.header('x-auth-token');

    // Check if no token exits

    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied!'});
    }

    // Verify token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid!'}); 
    }
}