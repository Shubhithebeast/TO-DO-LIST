
const { response } = require("express");
const {list} = require("./model");

const tasks= async(request,response)=>{
    var id=request.query.id;
    var data1=request.query.name;
    if(id){
        var data= await list.findById(id);
    }else if(data1){
        var data = await list.find({name:data1});
    }
    else{
        var data= await list.find();        
    }
    return response.json(data);
}

const add_new_task=async(request,response)=>{
    console.log(request.body);
    await list.create(request.body);
    return response.status(200).json({status:"One more task is added to your to-do list..."});
}

const delete_task=async(request,response)=>{

    var id=request.query.id;
    // var data=request.body;
    var data1=request.query.name;

    if(id){
        var data= await list.findByIdAndDelete(id);
    }else if(data1){
        var data = await list.findOneAndDelete({name:data1});
    }

    console.log(id,data);
    return response.status(200).json({status:"Task is deleted from your to-do list of id: "+id+data});
}

// doubt-----
const update_task2 = async(request,response)=>{
    var id=request.query.id;
    var data1=request.query.name;

    if(id){
        var data= await list.findById(id);
        if(data.IsCompleted){
            return response.status(200).json({status:"Task is already completed..."});
        }else{
            data.IsCompleted="True";
            data = await data.save();
            return response.status(200).json({status:"Task is Completed..."});
        }
    }else if(data1){
        var data = await list.find({name:data1});
        if(data.IsCompleted){
            return response.status(200).json({status:"Task is already completed..."});
        }else{
            data.IsCompleted="True";
            return response.status(200).json({status:"Task is Completed..."});
        }
    }
}
// doubt-----



const update_task1 = async(request,response)=>{
    var id=request.query.id;
    var data=request.body;
    var data1=request.query.name;

    if(id){
        var update_data= await list.findByIdAndUpdate(id,data);
    }else if(data1){
        var update_data = await list.findOneAndUpdate({name:data1},data);
    }

    return response.status(200).json({status:"Task is updated in to-do list..."});

}

module.exports={tasks,add_new_task,delete_task,update_task1,update_task2};

