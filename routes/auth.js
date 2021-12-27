const express=require('express')
const User=require('../model/User')
const router =express.Router();
const Joi= require('@hapi/joi')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

//validations
const schema=Joi.object({
    name :Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required()
})

const loginschema=Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required()
})




//Register a User
router.post('/register',async(req,res)=>{
    
    const {error}=schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //check if email already exists
    const exist = await User.findOne({email:req.body.email})
    if (exist) return res.status(400).send('Email already exists')

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashpassword= await bcryptjs.hash(req.body.password,salt)


        const user=new User({
        name:req.body.name,
        email:req.body.email,
        password: hashpassword
    });
    try{
        console.log(req.body)
        const saveduser=await user.save();
        res.json(saveduser);
    }catch(error){
        res.json({message:err})

    }
})

//Login a User

router.post('/login',async(req,res)=>{
    const {error}=loginschema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const exist = await User.findOne({email:req.body.email})
    console.log(exist)
    if (!exist) return res.status(400).send('Email does not exists')

    const valid=await bcryptjs.compare(req.body.password,exist.password)
    if (!valid) return res.status(400).send('Invalid Password')


    //create Token
    const token=jwt.sign({_id:exist._id},process.env.Token_Secret)
    res.header('auth-token',token).send(token)

    // res.send('Logged In')




})

module.exports=router