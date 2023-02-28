const express = require("express");
//Initiate an app
const app = express();

//Creating Routes in Express
// app.<http-verb>(path,callback)
//When Get Method is hit on / route then execute the callback
app.get("/", function (req, res) {
  //res.send
  // 1. It automatically Identifies the type of the content that you are sending
  //Based on the content it appends the Content-Type Header
  //Ends the response
  //By Default Status Code is 200
  res.send("Welcome to Dominos");
});

app.get("/contact", function (req, res) {
  //In res.send you need not to pass string everytime
  //Rather Pass the required data and it will decide the type for you
  
//   res.send({
//     branch: "Bengaluru",
//     contact: "798798798",
//   });
  //To Change The Status Code
  res.status(201).send({
    branch: "Bengaluru",
    contact: "798798798",
  })
});

//Start The server
app.listen(5050, () => {
  console.log("Application started on 5050");
});

