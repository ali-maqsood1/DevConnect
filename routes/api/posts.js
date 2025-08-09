import express from "express";
import auth from "../../middlewares/auth.js";
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Profile from "../../models/Profile.js";
import { check, validationResult } from "express-validator";
const router = express.Router();


//@route     POST api/posts
//@desc      Create a post
//@access    Private
router.post('/', [auth, [
    check('text', 'Text is required!').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();

        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error in PUT method of Posts!')
    }
});


//@route     GET api/posts
//@desc      Get all posts
//@access    Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error in GET all method of Posts!')
    }
});


//@route     GET api/posts/:id
//@desc      Get post by id
//@access    Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: 'Post not found!'});
        }
        res.json(post);
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({message: 'Post not found!'});
        }
        res.status(500).send('Error in GET by ID method of Posts!')
    }
});

//@route     DELETE api/posts/:id
//@desc      Delete post by id
//@access    Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: 'Post not found!'});
        }

        // Check if post belongs to user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ message: 'User not authorized!' })
        }

        await post.deleteOne();
        res.json({message: 'Post deleted!'});
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({message: 'Post not found!'});
        }
        res.status(500).send('Error in DELETE by ID method of Posts!')
    }
});

//@route     PUT api/posts/like/:id
//@desc      Like a post
//@access    Private

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post has been already liked

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({message: 'Post already been liked!'});
        }

        post.likes.unshift({user: req.user.id});

        await post.save();

        res.json(post.likes);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error in PUT method for Like Post!');
    }
});

//@route     PUT api/posts/unlike/:id
//@desc      Unlike a post
//@access    Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post has been already liked

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({message: 'Post has not yet been liked!'});
        }

        // Get remove index
        
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error in PUT method for Like Post!');
    }
});

//@route     POST api/posts/comment/:id
//@desc      Comment on a post
//@access    Private
router.post('/comment/:id', [auth, [
    check('text', 'Text is required!').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment)

        await post.save();

        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error in POST method of comment on Posts!')
    }
});

//@route     DELETE api/posts/comment/:id/:comment_id
//@desc      Delete comment
//@access    Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        // get comment from the post

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if(!comment) {
            return res.status(404).json({message: 'Comment not found!'});
        }

        // Check user

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({message: 'User not authorized!'});
        }

        // Get remove index
        
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error in DELETE method of comment on Posts!')
    }
});
export default router;