const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require('cors')

env.config();

const userRoute = require('./routes/user')

const app = express();

const url = process.env.URL;

mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>{
        console.log("Database Connected ...");
    } 
    )


app.use(cors())    
app.use(cookieParser());    
app.use(express.json());
app.use('/' , userRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log("Server",PORT);
})