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
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  // res.write("JOKE"+setup1)

  const url = "https://official-joke-api.appspot.com/random_joke";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const data1 = JSON.parse(data);
      console.log(data1);
      const setup1 = data1.setup;
      const setup2 = data1.punchline;
      res.send("JOKE is " + setup1 + ", " + setup2 + "");

      //  console.log( setup1)
      //  response.write("JOKE"+setup1)
      //   res.send("<h1>the temperature in london is"+temp+" 'C</h1>");//send method is used only once
    });
  });
});

// get data from data base
app.get("/connection", (req, res) => {
  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database: "shiva-db",
  });

  con.connect((err) => {
    if (err) throw err;
    con.query("select * from user", (err, result) => {
      // user1
      con.end();
      if (err) throw err;
      //  console.warn("here is your result"+JSON.stringify(result));
      res.send(result);
    });
  });
});
//delete row

app.get("/deleteUser", (req, res) => {
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
    console.log(req.query);
    const { id } = req.query;
    console.log("Id from client");
    console.log(id);
    const sql = `DELETE FROM user_input WHERE id = ${id}`;

    con.query(sql, (err, result) => {
      con.end();
      if (err) throw err;
      res.status(200).json({success:"updated user record"});
      // res.send("it is rumnnig")
      // console.log(`${result.affectedRows} row(s) deleted`);
    });
  } catch (error) {
    console.log("error------", error);
  }
});

//Authentication
app.post("/login", (req, res) => {
  try {
    debugger
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

    const username = req.body.username;
    const password = req.body.password;
    let isAuth = false;
    let role;

    console.log(username, password);
    const sql = `SELECT * FROM logins WHERE user_name = '${username}' AND password='${password}';`;
      
    con.connect((err) => {
      if (err) throw err;
      con.query(sql, (err, result) => {
        // user1
        con.end();
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
    });
  } catch (error) {
    console.log("error------", error);
  }
});

//Register
app.post("/register", (req, res) => {
  // try {
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
        con.end();
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

//user
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
        con.end();
      });
    });
  } catch (error) {
    console.log("error------", error);
  }
});
//get data to administrator
app.get("/Administrator", (req, res) => {
  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database: "shiva-db",
  });

  con.connect((err) => {
    if (err) throw err;
    con.query("select * from user_input", (err, result) => {
      // user1
      if (err) throw err;
      //  console.warn("here is your result"+JSON.stringify(result));
      res.send(result);
    });
  });
});
//Mycomplain
app.get("/complain",(req,res)=>{

  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database:"shiva-db"
  });
  const { id } = req.query;
  console.log(id);
  if (!id) {
    return res.status(400).send({ error: 'ID is required' });
  }
  
  con.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    // console.log('Connected to the database');
  });
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

//Ststus
app.get('/status',(req,res)=>{
   
  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database:"shiva-db"
  });
  const { id } = req.query;
  console.log(id);
  con.connect((err)=>{
    if (err) throw err;

  })
  const query = 'UPDATE user_input SET status = 1 WHERE id = ?;';
  con.query(query, [id], (err, result) => {
   
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error executing query');
    }

    if (result.length === 0) {
      return res.status(404).send({ error: 'No user found with this ID' });
    }
    con.end();
   
  console.log(result);
  res.status(200).json({success:"updated user record"});
  // res.send(result);
  });
})



app.get('/status1',(req,res)=>{
   
  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database:"shiva-db"
  });
  const { id } = req.query;
  console.log(id);
  con.connect((err)=>{
    if (err) throw err;

  })
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

//Edit


app.get("/edit1",(req,res)=>{

  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database:"shiva-db"
  });
  const { id } = req.query;
  console.log(id);
  if (!id) {
    return res.status(400).send({ error: 'ID is required' });
  }
  
  con.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });
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

//change pas



app.post('/changePass', (req, res) => {
  
  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database:"shiva-db"
  });

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


//Role check
app.get("/RoleWise",(req,res)=>{

  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database:"shiva-db"
  });
  const { role } = req.query;
  // console.log(role);
  if (!role) {
    return res.status(400).send({ error: 'ID is required' });
  }
  
  con.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    // console.log('Connected to the database');
  });
  const query = 'SELECT * FROM user_input WHERE typeofdamage = ?';
  con.query(query, [role], (err, result) => {
    con.end();
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


// wjo take the role
app.get('/Accept',(req,res)=>{
   
  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database:"shiva-db"
  });
  const { id } = req.query;
  const { id1 } = req.query;

  // console.log(id);
  // console.log(id1);


  con.connect((err)=>{
    if (err) throw err;

  })
  const query = 'UPDATE user_input  SET accepted_by = ?, status = 3 WHERE id = ?;';
  con.query(query, [id1,id], (err, result) => {
    con.end();
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




// Route to get a specific user by ID
app.get('/User/:id', (req, res) => {
  
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

  const userId = req.params.id;
  const query = 'SELECT * FROM user_input WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database query error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result[0]);
  });
});

// Route to create a new user
// app.post('/User', (req, res) => {
//   const { fname, lname, campus, email, typeofdamage, typeofplace, date, id } = req.body;
//   const query = 'INSERT INTO users (fname, lname, campus, email, typeofdamage, typeofplace, date, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//   db.query(query, [fname, lname, campus, email, typeofdamage, typeofplace, date, id], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Database query error' });
//     }
//     res.status(201).json({ message: 'User created successfully' });
//   });
// });

// Route to update an existing user
app.post('/Update', (req, res) => {
  
  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database:"shiva-db"
  });

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






//show order
app.get("/History", (req, res) => {
  const mysql = require("mysql");
  const cors = require("cors");
  app.use(cors());
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shiva@1234",
    database: "trithon",
  });

  con.connect((err) => {
    if (err) throw err;
    con.query("select * from trithon.pickup", (err, result) => {
      // user1
      if (err) throw err;
      //  console.warn("here is your result"+JSON.stringify(result));
      res.send(result);
    });
  });
});

//pick up
app.post("/pickup", (req, res) => {
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
      database: "trithon",
    });
    //autentication
    // $date = date('m/d/Y h:i:s', time());
    // console.log(date);

    const weight = req.body.weight;
    const location = req.body.location;
    const pincode = req.body.pincode;
    const phone = req.body.phone;
    // const imgUrl=req.body.imgUrl;
    const userEmail = req.body.useremail;
    //const typeofplace=req.body.typeofplace;
    //const date=req.body.date;
    console.log(weight, location, phone, pincode, userEmail);

    // console.log(fname);
    const sql = `INSERT INTO pickup (Weight, Address, pincode, phone, pickup_time, userEmail)
   VALUES ('${weight}', '${location}', '${pincode}', '${phone}', '${10}', '${userEmail}');`;

    con.connect((err) => {
      if (err) throw err;
      con.query(sql, (err, result) => {
        // user1
        if (err) throw err;
        console.log("sql--", sql);
        console.warn("here is your result" + JSON.stringify(result));
        // res.send(result);
      });
    });
  } catch (error) {
    console.log("error------", error);
  }
});

app.post("/delete_garbage_id", (req, res) => {
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
      database: "trithon",
    });
    //autentication
    // $date = date('m/d/Y h:i:s', time());
    // console.log(date);

    const id = req.body.garbage_id;
    // const obj=JSON.parse(req.body);

    // const location=req.body.location;
    // const pincode=req.body.pincode;
    // const type=req.body.type;
    // const imgUrl=req.body.imgUrl;
    // const userEmail=req.body.useremail;
    //const typeofplace=req.body.typeofplace;
    //const date=req.body.date;
    console.log("the id is " + id);

    // console.log(fname);
    const sql = `DELETE FROM trithon.pickup WHERE id=${id}`;

    con.connect((err) => {
      if (err) throw err;
      con.query(sql, (err, result) => {
        // user1
        if (err) throw err;
        console.log("sql--", sql);
        console.warn("here is your result" + JSON.stringify(result));
        // res.send(result);
      });
    });
  } catch (error) {
    console.log("error------", error);
  }
});
//get data to administrator
// app.get("/Administrator", (req, res) => {
//   const mysql = require("mysql");
//   const cors = require("cors");
//   app.use(cors());
//   const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Shiva@1234",
//     database: "shiva-db",
//   });

//   con.connect((err) => {
//     if (err) throw err;
//     con.query("select * from user_input", (err, result) => {
//       // user1
//       if (err) throw err;
//       //  console.warn("here is your result"+JSON.stringify(result));
//       res.send(result);
//     });
//   });
// });

//table view post
app.post("/connection1", (req, res) => {
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
    const username = req.body.description;
    debugger;
    console.log(username);
    debugger;
    const company = req.body.company;
    console.log(company);
    debugger;
    const category = req.body.category;
    console.log(category);
    const subCategory = req.body.subCategory;
    console.log(subCategory);
    const query =
      "INSERT INTO user1 (company, category, subcategory,username) VALUES (?, ?, ?,?)";
    const values = [company, category, subCategory, username];

    con.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data into database: ", err);
        res.status(500).send("Error inserting data into database");
        return;
      }
      console.log("Data inserted into database!");
      res.send("Data inserted into database");
    });
  } catch (error) {
    console.log("error------", error);
  }
});

app.get("/getdetail", function (req, res) {
  // const url ="https://official-joke-api.appspot.com/random_joke";
  // https.get(url, function (response) {
  //  console.log(response.statusCode);
  //  response.on("data", function (data) {
  //    const data1 = JSON.parse(data);
  //    console.log(data1);
  //    const setup1=data1.setup;
  //    const setup2=data1.punchline;
  //    res.send("JOKE is "+setup1+", "  +setup2+"");
  //   //  console.log( setup1)
  //   //  response.write("JOKE"+setup1)
  //  //   res.send("<h1>the temperature in london is"+temp+" 'C</h1>");//send method is used only once
  //  });
  // });
});

// copy row

app.post("/copyRow", (req, res) => {
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
      database: "trithon",
    });
    //autentication
    // $date = date('m/d/Y h:i:s', time());
    // console.log(date);

    const id = req.body.garbage_id;
    // const location=req.body.location;
    // const pincode=req.body.pincode;
    // const type=req.body.type;
    // const imgUrl=req.body.imgUrl;
    // const userEmail=req.body.useremail;
    //const typeofplace=req.body.typeofplace;
    //const date=req.body.date;
    console.log(id);

    // console.log(fname);
    const sql = `SELECT * FROM pickup WHERE id = ${id}`;

    con.connect((err) => {
      if (err) throw err;
      con.query(sql, (err, result) => {
        // user1
        if (err) throw err;
        console.log("sql--", sql);
        debugger;
        const rest = JSON.stringify(result);

        console.warn("here is your result" + rest);
        // res.send(result);
      });
    });
    //console.log("weight dikade  "+rest.weight);
    const sql1 = `INSERT INTO pickup (Weight, Address, pincode, phone, pickup_time, userEmail)
 VALUES ('${weight}', '${location}', '${pincode}', '${phone}', '${10}', '${userEmail}');`;
  } catch (error) {
    console.log("error------", error);
  }
});

//Waste Scrap
app.post("/User1", (req, res) => {
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
      database: "trithon",
    });
    //autentication
    // $date = date('m/d/Y h:i:s', time());
    // console.log(date);

    const ewaste = req.body.ewaste;
    const biod = req.body.biod;
    const nbiod = req.body.nbiod;
    const hazard = req.body.hazard;

    console.log(ewaste, biod, nbiod, hazard);

    // console.log(fname);
    const sql = `INSERT INTO trithon.wastetype (ewaste, biod, nbiod, hazard)
  VALUES ('${ewaste}', '${biod}', '${nbiod}', '${hazard}');`;

    con.connect((err) => {
      if (err) throw err;
      con.query(sql, (err, result) => {
        // user1
        if (err) throw err;
        console.log("sql--", sql);
        console.warn("here is your result" + JSON.stringify(result));
        // res.send(result);
      });
    });
  } catch (error) {
    console.log("error------", error);
  }
});

//file upload

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// POST endpoint for uploading image
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  console.warn(req.file);
  res.send("File uploaded successfully");
});

app.listen(1000, function () {
  console.log("server is started on post 1000");
});
