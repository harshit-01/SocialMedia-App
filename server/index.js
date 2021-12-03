const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
var cors = require('cors')
const multer  = require('multer')
const path = require("path");
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

app.use("/images", express.static(path.join(__dirname, "public/images")));
// middleware 

app.use(express.json()) // bodyParser
app.use(cors())
app.use((helmet()));
app.use(morgan("common"));
// app.get("/",(req,res)=>{
//     res.send("Welcome to the homepage");
// })

// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'public/images')
    },
    filename: (req, file, cb)=> {
        // console.log(req,req.body)
        cb(null, req.body.name )
    
    }
  })
  
const upload = multer({ storage: storage })
app.post('/api/upload',upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully");
    }
    catch(err){
        res.status(500).json("Error uploading file")
        console.log(err);
    }
})
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);
app.listen(PORT, (req,res)=>{
    console.log('Server running on port: 5000')
})
//mongoose.set('useFindAndModify', false);
