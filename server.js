import express from "express";
import connectDB from "./config/db.js";

// Routes
import users from "./routes/api/users.js";
import auth from "./routes/api/auth.js";
import profile from "./routes/api/profile.js";
import posts from "./routes/api/posts.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5001;


// Connect Database
connectDB();

// Initializing Middleware
app.use(express.json({extended: false}));


//Defining routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});