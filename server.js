import express from "express";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database

connectDB();

app.co
app.get('/', (req, res) => {
    res.send("Api running");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});