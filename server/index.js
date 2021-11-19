const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

try{
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log("Connected to MongoDB");
})}
catch(err){
    console.log("Error connecting to database",)
}


// middleware 
app.use(express.json()) // bodyParser
app.use((helmet()));
app.use(morgan("common"));
// app.get("/",(req,res)=>{
//     res.send("Welcome to the homepage");
// })
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);
app.listen(PORT, (req,res)=>{
    console.log('Server running on port: 5000')
})
//mongoose.set('useFindAndModify', false);
