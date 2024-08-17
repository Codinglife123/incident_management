const express = require("express");


const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");


const multer = require("multer");
const { NULL } = require("mysql/lib/protocol/constants/types");
const app = express();
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));
app.use(cors());


const mysql = require("mysql");
const con = require('./db');
// const cors = require("cors");
// app.use(cors());

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Shiva@1234",
//   database: "shiva-db",
// });

app.get("/deleteUser", (req, res) => {
    try {
      // console.log("hello-----------------------------")
      console.log("request body------------------------", req.body);
      // console.log("request body parse------------------------",JSON.parse(req.body))
      //   debugger
     
      //autentication
      console.log(req.query);
      const { id } = req.query;
      console.log("Id from client");
      console.log(id);
      const sql = `DELETE FROM user_input WHERE id = ${id}`;
  
      con.query(sql, (err, result) => {
        // con.end();
        if (err) throw err;
        res.status(200).json({success:"updated user record"});
        // res.send("it is rumnnig")
        // console.log(`${result.affectedRows} row(s) deleted`);
      });
    } catch (error) {
      console.log("error------", error);
    }
  });




  app.post("/login", (req, res) => {
    try {
      debugger
      // console.log("hello-----------------------------")
      console.log("request body------------------------", req.body);
      // console.log("request body parse------------------------",JSON.parse(req.body))
      //   debugger
    
      //autentication
  
      const username = req.body.username;
      const password = req.body.password;
      let isAuth = false;
      let role;
  
      console.log(username, password);
      const sql = `SELECT * FROM logins WHERE user_name = '${username}' AND password='${password}';`;
        
     
        con.query(sql, (err, result) => {
          // user1
        //   con.end();
          console.warn(result);
          if (err) throw err;
  
          // console.log("sql--",sql)
          console.warn("here is your result" + JSON.stringify(result));
          
          // if (result.length == 0) {
          //   isAuth = false;
          // } else {
          //   isAuth = true;
          // }
      
          if (result.length == 0) {
            return res.json({ isAuth: false,role:result.role, message: "Authentication failed" });
          
            
          } else {
            return res.json({ isAuth: true, message: "Authentication successful", user: result[0] });
          }
          
  
          // console.warn("data"+result.username[0]+""+result.password[0])
          // alert(result);
          //res.send(result);
          // const result1 = `Received: ${isAuth}`;
          // console.warn(result1);
           
        });
     
    } catch (error) {
      console.log("error------", error);
    }
  });
  


  app.post("/register", (req, res) => {
    // try {
      // console.log("hello-----------------------------")
      console.log("request body------------------------", req.body);
      // console.log("request body parse------------------------",JSON.parse(req.body))
      //   debugger
      
      //autentication
  
      const username = req.body.username;
      const password = req.body.password;
      const phone=req.body.phone;
      const role=req.body.role;
      const name=req.body.name;
  
      console.log(role);
      
   
    try {
      // Check if username already exists
      const sql1 = `SELECT * FROM logins WHERE user_name ='${username}';`;
      con.query(sql1, (err, results) => {
        // con.end();
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Server error 3' });
        }
  
        if (results.length > 0) {
          return res.status(400).json({ error: 'Email already exists' });
        }
  
        // Insert new user into the database
       const sql = `INSERT INTO logins (user_name,password,phone,role,name)
       VALUES ('${username}', '${password}','${phone}','${role}','${name}');`;     
        con.query(sql,(err,result) => {
          if (err) throw err;
        //   con.end();
          console.log("sql--", sql);
          console.warn("here is your result" + JSON.stringify(result));
          res.send(result);
          connection.release(); 
          // if (err) {
          //   return res.status(500).json({ error: 'Server error 2' });
          // }
          // res.status(201).json({ message: 'User registered successfully!' });
          // // res.send(result);
        });
      });
    } catch (error) {
      console.log(error);
      //res.status(500).json({ error: 'Server error 1' });
    }
  });




  app.post("/User", (req, res) => {
    try {
      // console.log("hello-----------------------------")
      console.log("request body------------------------", req.body);
      // console.log("request body parse------------------------",JSON.parse(req.body))
      //   debugger
      const mysql = require("mysql");
      const cors = require("cors");
      app.use(cors());
      const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Shiva@1234",
        database: "shiva-db",
      });
      //autentication
      // $date = date('m/d/Y h:i:s', time());
      // console.log(date);
  
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      const campus = req.body.campus;
      const typeofdamage = req.body.typeofdamage;
      const typeofplace = req.body.typeofplace;
      const date = req.body.date;
      const id=req.body.id;
      const accepted=req.body.accepted;
      console.log(fname, lname, email, campus, typeofdamage, typeofplace, date,id,accepted);
  
      // console.log(fname);
      const sql = `INSERT INTO User_input (fname, lname, email, typeofplaces, typeofdamage, campus,date,user_id,status,accepted_by)
    VALUES ('${fname}', '${lname}', '${email}', '${typeofplace}', '${typeofdamage}', '${campus}','${date}','${id}','${accepted}',NULL);`;
  
      con.connect((err) => {
        if (err) throw err;
        con.query(sql, (err, result) => {
          // user1
          
          if (err) throw err;
          console.log("sql--", sql);
          console.warn("here is your result" + JSON.stringify(result));
          res.send(result);
          
        });
      });
    } catch (error) {
      console.log("error------", error);
    }
  });
  //get data to administrator
  app.get("/Administrator", (req, res) => {
    
    
      con.query("select * from user_input", (err, result) => {
        // user1
        if (err) throw err;
        //  console.warn("here is your result"+JSON.stringify(result));
        res.send(result);
      });
    });

  


  app.get("/complain",(req,res)=>{

   
    const { id } = req.query;
    console.log(id);
    if (!id) {
      return res.status(400).send({ error: 'ID is required' });
    }
    
    
    const query = 'SELECT * FROM user_input WHERE user_id = ?';
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        // return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        // return res.status(404).send({ error: 'No user found with this ID' });
      }
    // console.log(result);
    res.send(result);
    });
  });
  

  app.get('/status',(req,res)=>{
   
    
    const { id } = req.query;
    console.log(id);
   
    const query = 'UPDATE user_input SET status = 1 WHERE id = ?;';
    con.query(query, [id], (err, result) => {
     
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'No user found with this ID' });
      }
    //   con.end();
     
    console.log(result);
    res.status(200).json({success:"updated user record"});
    // res.send(result);
    });
  })


  
app.get('/status1',(req,res)=>{
   
   
    const { id } = req.query;
    console.log(id);
  
    const query = 'UPDATE user_input SET status = 2 WHERE id = ?;';
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'No user found with this ID' });
      }
    console.log(result);
    res.send(result);
    });
  })
  
  

  
app.get("/edit1",(req,res)=>{

    const { id } = req.query;
    console.log(id);
    if (!id) {
      return res.status(400).send({ error: 'ID is required' });
    }
    
    
    const query = 'SELECT * FROM user_input WHERE id = ?';
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'No user found with this ID' });
      }
    console.log(result);
    res.send(result);
    });
  });

  
app.post('/changePass', (req, res) => {
  
    
  
    // const userId = req.params.id;
    // console.log(userId);
    const { username,password,newP } = req.body;
    // console.log(typeofplace);
    const query ='UPDATE logins SET password = ? WHERE password = ? AND user_name = ?';
    con.query(query, [newP,password,username], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database query error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    });
  });
  
  

  app.get("/RoleWise",(req,res)=>{

    
    const { role } = req.query;
    // console.log(role);
    if (!role) {
      return res.status(400).send({ error: 'ID is required' });
    }
    
   
    const query = 'SELECT * FROM user_input WHERE typeofdamage = ?';
    con.query(query, [role], (err, result) => {
    //   con.end();
      if (err) {
        console.error('Error executing query:', err);
        // return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        // return res.status(404).send({ error: 'No user found with this ID' });
      }
    // console.log(result);
    res.send(result);
    });
  });



  app.get('/Accept',(req,res)=>{
   
   
    const { id } = req.query;
    const { id1 } = req.query;
  
    // console.log(id);
    // console.log(id1);
  
  
    
    const query = 'UPDATE user_input  SET accepted_by = ?, status = 3 WHERE id = ?;';
    con.query(query, [id1,id], (err, result) => {
    //   con.end();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'No user found with this ID' });
      }
     
    console.log(result);
    res.status(200).json({success:"updated user record"});
    // res.send(result);
    });
    
  })
  

  app.post('/Update', (req, res) => {
  
   
  
    // const userId = req.params.id;
    // console.log(userId);
    const { fname, lname, campus, email, typeofdamage, typeofplace, date,id,id1 } = req.body;
    console.log(typeofplace);
    const query = 'UPDATE user_input SET fname = ?, lname = ?, campus = ?, email = ?, typeofdamage = ?, typeofplaces = ?, date = ?,user_id=? WHERE id = ?';
    con.query(query, [fname, lname, campus, email, typeofdamage, typeofplace, date, id1,id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database query error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    });
  });
  
  
  
  
  
  
  
app.listen(1000, function () {
    console.log("server is started on post 1000");
  });
  