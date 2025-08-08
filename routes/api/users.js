import express from "express";
const router = express.Router();


//@route GET api/users
//@ desc test route
//@access Public
router.get('/', (req, res) => {
    res.send("User route");
})


export default router;