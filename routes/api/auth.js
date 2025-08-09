import express from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import auth from "../../middlewares/auth.js"
import User from "../../models/User.js";

const router = express.Router();
dotenv.config();


//@route GET api/auth
//@ desc test route
//@access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error!');
    }
});

//@route POST api/auth
//@desc Authenticate user & get token
//@access Public
router.post('/', [
    check('email', 'Please include a valid email!').isEmail(),
    check('password', 'Password is required!').exists()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    
    const {email, password} = req.body;

    
    try {
        // See if user exits
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{ msg: 'Invalid Credentials!'}]});
        }
        
        //comparing password

        const isMatch = await bcrypt.compare(password, user.password);
 
        if(!isMatch){
            return res.status(400).json({errors: [{ msg: 'Invalid Credentials!'}]});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET_KEY,
            {expiresIn: 360000},
            (err, token) => {
                if(err){
                    throw err;
                }
                res.json({token})
            }
        )


    } catch (error) {
        console.error(`Internal Server error: ${error}`);
        res.status(500).send('Server Error');
    }

})

export default router;