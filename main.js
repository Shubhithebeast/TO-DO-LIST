// importing built-in modules that install via npm
const express= require("express");
const parser= require("body-parser");
const cors=require("cors");
const mongoose= require("mongoose");

// Connecting database
try{
    mongoose.connect("mongodb://localhost:27017/St2_project");
}catch(e){
    console.log("Error Occur...");
}

// Checking database is connected or not
mongoose.connection.on("connected",()=>{
    console.log("Db connected");
})
mongoose.connection.on("error",()=>{
    console.log("Error...");
})

// creating server
const app=express();
app.use(cors());
app.use(parser.json());
const port=2000; // server will run at port 2000

// importing self vuilt modules from tasks file
const {tasks,add_new_task,delete_task,update_task1}=require("./tasks");

// giving requests to server
app.get("/tasks",tasks);
app.delete("/deletetask",delete_task);
app.put("/updatetask1",update_task1);
app.post("/addtask",add_new_task);
app.patch("/updatetask2",update_task1);

app.listen(port,()=>{
    console.log(`Server running at  ${port} port`);
});





