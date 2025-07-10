const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json()); // <- GANZ WICHTIG!
const cors = require('cors');
server.use(cors());
require('dotenv').config();

// establish database conn

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

//check connection
db.connect(function(error){
    if(error){
        console.error("Connection to database failed", error.message);
    } else {
        console.log("Connection to database established");
    }
});

//establish the Port
server.listen(8085, function check(error){
  if(error) console.log("Port connection failed", error.message);
  else console.log("Connected on Port: 8085");
 });

server.post("/api/users/add", (req, res) =>{
  let details = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log("Collected Data:", req.body);


  let sql = "INSERT INTO users SET ?";
  db.query(sql, details, (error) => {
    if(error){
      res.send({status: false, message: "insert failed"});

    }else{
      res.send({status: true, message: "created successfully"});
    }
  });
});

server.post("/api/users/login", (req, res) =>{
  let details = {
    username: req.body.username,
    password: req.body.password,
  };
  

  let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [details.username, details.password], (err, results) =>{
    if(err){
      res.send({status: false, message: err});
    }else{
      if(results.length > 0){
        res.send({status: true, message: "Success"});
      }
      else{
        res.send({status: false, message: "Wrong username or password!"});
      }
    }
  });

});

