import express from "express";
import auth from "../../middlewares/auth.js";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js";
const router = express.Router();


//@route GET api/profile/me
//@desc Get current user's profile
//@access Private
router.get('/me', auth, async (req, res) => {
   try {
    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
    if(!profile){
        return res.status(400).json({message: 'There is no profile for this user!'});
    }

    res.json(profile);
   } catch (error) {
        console.error(error.message);
        res.status(500).send(`Server Error!`);
   }
})

//@route POST api/profile
//@desc Create or Update user profile
//@access Private


router.post('/', (req, res) => {
    
})


export default router;