import express from "express";
import {check, validationResult} from "express-validator"
const router = express.Router();


//@route POST api/users
//@ desc Register route
//@access Public
router.post('/', [
    check('name', 'Name is required!').not().notEmpty(),
    check('email', 'Please include a valid email!').isEmail(),
    check('password', 'Please enter a passsword with 6 or more characters!').isLength({min: 6})
], (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    
    console.log(req.body);
    res.send("User routes")
})


export default router;