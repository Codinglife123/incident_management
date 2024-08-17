import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./logincss/login.css";

import Form from "react-bootstrap/Form";
// import soa from "../Soa.png";
import Snav from "./sidenav";


export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isAuth, setIsAuth] = useState(null);
  const [message, setMessage] = useState("");
  const[role,setRole]=useState();
 

  // const login = () => {
  //   //fetrch ra post method
  //   let k = username;
  //   let k2 = password;
  //   debugger;
  //   fetch("http://localhost:1000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //     // body:JSON.stringify(password)
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         debugger;
  //         if (result.length === 0) {
  //           alert("Invalid Username or Password");
  //         } else {
  //           navigate("/User");
  //         }
  //         console.log(result);
  //         debugger;
  //       },
  //       (error) => {
  //         debugger;
  //         this.setState({
  //           isLoaded: false,
  //           error,
  //         });
  //       }
  //     );
  // };


  const login = async (event) => {
    event.preventDefault();
    setSubmitted(false);
    setError('');

    const formData = { username, password };
    if(username===undefined&& password===undefined){
      alert("Please Enter UserName &Password Correctly");

    }else{
      try {
        const response = await fetch('http://localhost:1000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      //  console.log(response);
      //   if (response.ok) {
      //     setSubmitted(true);
      //     if(response[0].isAuth){
      //       navigate('/User');
      //     }
          
      //     setTimeout(() => setSubmitted(false), 3000);
      //     setUsername('');
      //     setPassword('');
      //   } else {
      //     const errorData = await response.json();
      //     setError(errorData.message || 'Something went wrong');
      //   }
      
      const data = await response.json();
      
      const id=data.user.id;
      const name=data.user.name;
      
    
      
      setIsAuth(data.isAuth);
      setMessage(data.message);
     const role= data.user.role;

      if (data.isAuth) {
        localStorage.setItem('name', name);
      localStorage.setItem('id', id);
      
        console.log("Login successful", data.user);
       
        localStorage.setItem('Auth', 'true');
        if(role==="Building"||role==="Pipeline"||role==="Electrical"){
          const data = { message: role };
          // alert(data)
          navigate('/RoleWork', { state: data });
        }else{
          navigate('/User');
        }
        
        
        
        // <Snav data={isAuth}/>
      } else {
        console.log("Login failed");
        alert("Wrong Username/Password \n Please try to register first")
      }
      } catch (err) {
        setError('Network error');
      }
    }

   
  };
  return (

<div
  className="container col-sm-8"
  style={{
    padding: "20px",
    marginTop: "100px",
    fontFamily: "sans-serif",
    textAlign: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    borderRadius: "20px",
    width: "70%",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  }}
>
  <h1 style={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}>
    ITER INCIDENT MANAGEMENT
  </h1>
  <Form className="container1">
    <hr style={{ borderColor: "white" }} />
    <h2
      style={{
        color: "white",
        textAlign: "center",
        fontWeight: "bolder",
        marginBottom: "30px",
      }}
    >
      Log In
    </h2>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <h4
        style={{
          textAlign: "center",
          fontFamily: "serif",
          color: "white",
          margin: "20px",
          fontWeight: "bold",
        }}
      >
        Email address:
      </h4>
      <Form.Control
        type="email"
        placeholder="Enter email"
        style={{
          width: "50%",
          textAlign: "left",
          marginLeft: "25%",
          borderRadius: "100px",
          height: "50px",
          padding: "10px 20px",
          border: "2px solid white",
          backgroundColor: "#f2f2f2",
        }}
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        required
      />

      <h4
        style={{
          textAlign: "center",
          color: "white",
          margin: "20px",
          fontWeight: "bold",
        }}
      >
        Password:
      </h4>
      <Form.Control
        type="password"
        placeholder="Password"
        style={{
          width: "50%",
          textAlign: "left",
          marginLeft: "25%",
          borderRadius: "100px",
          height: "50px",
          padding: "10px 20px",
          border: "2px solid white",
          backgroundColor: "#f2f2f2",
        }}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <h5
        style={{
          color: "white",
          margin: "15px",
          textAlign: "right",
          marginRight: "190px",
          marginTop: "20px",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => {
          navigate("/forgot");
        }}
      >
        Forgotten Password?
      </h5>
    </Form.Group>
    <Button
      className="btn"
      style={{
        backgroundColor: "#6a11cb",
        color: "white",
        borderRadius: "50px",
        padding: "10px 40px",
        fontSize: "18px",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
        marginTop: "20px",
        transition: "background 0.3s ease",
      }}
      onClick={login}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#4a00e0")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#6a11cb")}
    >
      Login
    </Button>{" "}
    <h5
      style={{
        color: "white",
        margin: "15px",
        padding: "0px",
        cursor: "pointer",
        textDecoration: "underline",
      }}
      onClick={() => {
        navigate("/register");
      }}
    >
      Don't have an account?
    </h5>
  </Form>
</div>
  );
}































    // <div className="outer">
    // <div
    //   className="conatainer-fluid"
    //   style={{
    //     // border: "2px solid black",
    //     // marginTop: "200px ",
    //     // marginLeft: "450px",
    //     // marginRight: "450px",
    //     // height: "400px",
    //     // textAlign:"center",
    //     justifyContent: "center",

    //     // backgroundColor: "black",
    //     display: "flex",
    //     padding: "0px",
    //   }}
    // >
    //   <div
    //     className="conatainer col-sm-8"
    //     // style={{}}
    //     style={{
    //       // border: "2px solid black",
    //       padding: "0px",
    //       marginTop: "100px ",
          
    //       // marginLeft: "450px",
    //       // marginRight: "450px",
    //       // height: "400px",
    //       fontFamily: "sans-serif",
    //       textAlign: "center",
    //       justifyContent: "center",
    //       // backgroundColor: "#87b1f5",
    //       borderRadius: "20px",
    //       width: "50%",
    //     }}
    //   >
    //     <h1 style={{color:"white"}}>ITER INCIDENT MANAGEMENT</h1>
    //     <Form className="container1">
    //       {/* <img src={soa} alt="" style={{ height: "200px" }} /> */}
    //       <hr></hr>
    //       <h1 style={{color:"White",textAlign:"center",fontWeight:"bolder"}}>Log In</h1>
    //       <Form.Group
    //         className="mb-3 conatainer "
    //         controlId="exampleForm.ControlInput1"
    //         // style={{ marginTop: "50px" }}
    //       >
            
    //         <h4 style={{textAlign:"center",fontFamily:"serif",color:"white",margin:"20px",fontWeight:"bold"}}>Email address:</h4>
    //         {/* <Form.Control size="lg" type="email"  placeholder="name@example.com" style={{marginLeft:"5px"}}/> */}
    //         <Form.Control
    //           type="email"
    //           placeholder="Enter email"
    //           style={{ width: "50%", textAlign: "left", marginLeft: "25%",borderRadius:"100px",height:"50px" }}
    //           onChange={(event) => setUsername(event.target.value)}
    //           value={username} required
    //         />

    //         <h4 style={{textAlign:"center",color:"white",margin:"20px",fontWeight:"bold"}}>
    //           Password:
    //         </h4>
    //         <Form.Control
    //           type="password"
    //           placeholder="password"
    //           style={{ width: "50%", textAlign: "left", marginLeft: "25%",borderRadius:"100px" ,height:"50px"}}
    //           value={password}
    //           onChange={(event) => setPassword(event.target.value)}
    //           required
    //         />
    //          <h5  style={{color:"white",margin:"15px",textAlign:"right",marginRight:"190px",marginTop:"20px"}}  onClick={()=>{navigate('/forgot')}}>Forgotten Password?</h5>
    //       </Form.Group>
    //       <Button classname="btn"  onClick={login}>
    //         Login
    //       </Button>{"  "}
    //       {/* <Button variant="success" onClick={()=>{navigate('/Register')}}>
    //         Login
    //       </Button>{"  "} */}
    //       <h5  style={{color:"white",margin:"15px",padding:"0px"}}  onClick={()=>{navigate('/register')}}>Donot have an account?</h5>
    //     </Form>
    //   </div>
    // </div>
    //  </div>