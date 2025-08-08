import express from "express";
import connectDB from "./config/db.js";

// Routes
import users from "./routes/api/users.js";
import auth from "./routes/api/auth.js";
import profile from "./routes/api/profile.js";
import posts from "./routes/api/posts.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database

connectDB();

app.get('/', (req, res) => {
    res.send("Api running");
})

//Defining routes

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});