const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv/config')
const cors=require('cors')
const port=process.env.PORT||3000
// const bodyparser=require('body-parser')
const app=express();
const authroute=require('./routes/auth')
const postroute=require('./routes/posts')
const multer = require("multer");
const path = require("path");
app.use(express.json())
app.use(cors())
const DB=process.env.DB_data


// app.use(bodyparser.json())
mongoose.connect(DB).then(()=>
{
    console.log('success')
}
).catch((err)=>{
    console.log(err)
})


app.use("/images", express.static(path.join(__dirname, "public/images")));
const dateobj= new Date()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.array("files",5), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
  const upload2= multer({ storage: storage });
  app.post("/api/upload/profilepic", upload2.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
  

 app.use('/api/user',authroute)
 app.use('/api/post',postroute)

app.get('/',(req,res)=>{
    res.send('login/signup code')
})

app.listen(port,()=>console.log('Server Running'))

