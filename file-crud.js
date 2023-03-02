const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
//Create a Todo
app.post("/todo", function (req, res) {
  //Create a File with Unique Id
  //In That File Write the todo received from request body

  //1. Understand the Request
  const todo = req.body;
  //valueOf gives you the timestamp at that particular time
  const fileName = new Date().valueOf();
  const data = JSON.stringify(todo);

  //2. Write the contents of whole File
  //If file exists, it writes the contents to the file
  //If file does not exist it will create a new file and write contents to it
  fs.writeFile(`todos/${fileName}.json`, data, function (err) {
    if (err) {
      res.status(500).send("Could Not write File");
    } else {
      res.status(201).send(`Todo with id ${fileName} created`);
    }
  });
});

//Read all todos
app.get("/todo", function (req, res) {
  //1. Read All the Files in todos Folder
  //2. Read the contents of each and every File
  //Add the Contents to an array
  const allTodos = [];
  fs.readdir("todos", function (err, files) {
    if(err){
      res.status(500).send("Could Not read Files of The Directory")
    }
    else{
      for(let currentFile of files){
        //get the contents of the File
        const currentTodo=fs.readFileSync(`todos/${currentFile}`,"utf-8")
        allTodos.push(JSON.parse(currentTodo));
      }
      res.status(200).send(allTodos);
    }
  });
});

//Read a specific todo
app.get("/todo/:id",function(req,res){
  const {id}=req.params;
  fs.readFile(`todos/${id}.json`,"utf-8",function(err,data){
    if(err){
      res.status(500).send("could not Read Todo")
    }
    else{
      res.send(JSON.parse(data))
    }
  })
})

app.patch('/todo/:id',function(req,res){
  //1. Get the Todo with this id
  //2. Read the contents of todo
  //3. Update the todo contents
  //4. WriteBack to the file
  const {id}=req.params;
  try{
  const todo=fs.readFileSync(`todos/${id}.json`,"utf-8")
  const todoJSON=JSON.parse(todo);
  //It will replace the object with updated values
  const updatedTodo={...todoJSON,...req.body}
  fs.writeFileSync(`todos/${id}.json`,JSON.stringify(updatedTodo));
  res.status(200).send("Todo updated successfully");
  }
  catch(err){
    console.log("Error is",err)
    res.status(500).send("Could not update Todo");
  }

})

app.delete("/todo/:id",function(req,res){
  const {id}=req.params
  fs.rm(`todos/${id}.json`,function(err){
    if(err){
      res.status(500).send(err)
    }
    else{
      res.status(200).send("Todo Deleted Successfully");
    }
  })
})



//Start A server
app.listen(4000, () => {
  console.log("Server Started on 4040");
});
