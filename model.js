const mongoose = require("mongoose");

// creating schema(structure) of the data 
const toDoList= new mongoose.Schema({
    name:String,
    Description:String,
    IsCompleted:Boolean
});

const list = mongoose.model("list",toDoList);
module.exports={list};