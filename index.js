const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv/config')
// const bodyparser=require('body-parser')
const app=express();
const authroute=require('./routes/auth')
app.use(express.json())
const DB=process.env.DB_data

// app.use(bodyparser.json())
mongoose.connect(DB).then(()=>
{
    console.log('success')
}
).catch((err)=>{
    console.log(err)
})




 app.use('/api/user',authroute)

app.get('/',(req,res)=>{
    res.send('login/signup code')
})

app.listen(3000,()=>console.log('Server Running'))

