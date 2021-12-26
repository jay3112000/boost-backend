const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    Name:{
      type:String,
      required:true
    },
    Phone:{
        type:String,
        required:true
      },
    Email:{
    type:String,
    required:true
    },
    Address:{
      type: String,
      required:true,
      max: 500,
    },
    Profilepic: {
      type: String,
      required:true,
    },
    Desc:{
        type: String,
        required:true,
        max: 500,
    },
    Education:[
        
       {
           Name:String,
           Degree:String,
           Startdate:String,
           Enddate:String
       },
      
    ],
    Workexp:[
        
        {
            Cname:String,
            Title:String,
            Startdate:String,
            Enddate:String
        },
       
     ],
     Services:[
        
        {
            Name:String,
            Link:String,
        },
       
     ],
     Images: {
      type: Array,
      default: [],
    },
    Color: {
      type: String,
      default: '#8a2be2',
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);