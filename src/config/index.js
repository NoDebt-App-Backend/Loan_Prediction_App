const express = require("express");
const mongoose = require("moongose");
const dotenv = require("dotenv");
const userRoutes = require('../router/user.route');
const { authMiddlware } = require('../middlewares/auth');
dotenv.config();
const port = process.env.PORT||4000;
const app = express();
app.use(express.json());

// Routes
app.use('/user', userRoutes);

// Middleware: Authentication
app.use(authMiddlware);

mongoose.connect('mongodb://127.0.0.1:27017/movie-store').then(function(){
    console.log("database already connected")
    app.listen (
        port, ()=>{
             console.log(`listening on port ${port}`)
         }
     )

}).catch(error=>{
    console.log("failed to connect", error)
})
    
