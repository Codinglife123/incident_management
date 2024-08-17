import React, { useState } from "react";
import {useLocation } from "react-router-dom";
import './User.css';

// import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Snav from "./sidenav";
function User() {
 
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [campus, setcampus] = useState("");
  const [typeofplace, settypeofplace] = useState("");

  const [typeofdamage, settypeofdamage] = useState("");
  // const[id,setId]=useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [accepted, setAccepted] = useState(0);

  

  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    file: yup.mixed().required(),
    terms: yup.bool().required().oneOf([true], "terms must be accepted"),
  });
  // const savedata = () => {
  //   try {
  //     debugger;
     
  //     debugger;
  //     console.log(fname, lname,email, campus, typeofdamage,typeofplace);
      
  //   } catch (error) {
  //     debugger;
  //     console.log(error);
  //   }
  // };


  //const navigate = useNavigate();
//   const savedata=()=> {
//     debugger
//     alert("button clicked")
//     //fetrch ra post method
    
//     const date = new Date();
//     console.log(date);
      
//     debugger
//     fetch("http://localhost:1000/User",{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({

//         "fname":fname,
//         "lname":lname,
//         "campus":campus,
//         "email" : email,
//         "typeofdamage":typeofdamage,
//         "typeofplace":typeofplace,
//         "date":date

//   }),
//       // body:JSON.stringify(password)
      
//     })
//              .then(res => res.json())
//              .then(
//                 (result) => {
//                   if(result!==0){
//                     navigate('/success');

//                   }
//                   debugger
//                 //  if(result.length===0){
//                 //   alert("Invalid Username or Password");
//                 //  }
//                 //  else{
//                 //   // navigate('/User');

//                 //  }
//                    console.log(result);
//                    debugger
//                 },
//                 (error) => {
//                  console.log('Error:', error);
//                 }
//              )
       
//  }
const navigate = useNavigate();
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// const saveData = async () => {
//   debugger;
//   // alert("button clicked");

//   const date = new Date();
//   console.log(date);

//   try {
//     const response = await fetch("http://localhost:1000/User", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "fname": fname,
//         "lname": lname,
//         "campus": campus,
//         "email": email,
//         "typeofdamage": typeofdamage,
//         "typeofplace": typeofplace,
//         "date": date
//       })
//     });

//     const result = await response.json();

//     if (result !== 0) {
//       navigate('/success');
//     }

//     console.log(result);
//     debugger;

//   } catch (error) {
//     console.log('Error:', error);
//   }
// }
 
const saveData = async (event) => {
  if (!validateEmail(email)) {
    setError('Please enter a valid email address.');
    alert("Please put the correct Email");
    return;
  }

  const id=localStorage.getItem('id');
  const date = new Date();
  event.preventDefault();
  setSubmitted(false);
  setError('');
  // setAccepted(0);
  //alert(accepted)

  const formData = { fname,lname,campus,email,typeofdamage,typeofplace,date,id,accepted};
  // if(fname===undefined&&lname===undefined&&campus===undefined&&email===undefined&&typeofdamage===undefined&&typeofplace===undefined&&date===undefined&&id===undefined){
  //   alert("Filled all the attribute");
  //   }/
  if (!fname || !lname || !campus || !email || !typeofdamage || !typeofplace || !date || !id) {
    alert("Please fill all the fields.");
    return;
}
  try {
    const response = await fetch('http://localhost:1000/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      navigate('/success')
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setfname('');
      setlname('');
      setcampus('');
     setemail('');
     settypeofdamage('');
     settypeofplace('');


    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Something went wrong');
    }
  } catch (err) {
    setError('Network error');
  }
};


  return (
  // <>
  //   <Snav/>
  //   <div className="outer">   
  //   <h2 style={{fontFamily:"serif",color:"#6EACDA",padding:"0px"}}>MAKE A COMPLAIN HERE</h2>
  //    <div
  //     className="container container1"
  //     style={{ border: "1px solid Black", marginTop: "80px" ,maxWidth:"600px",boxShadow:"10px",height:"auto"}}
  //   >
      
  //     <Formik
  //       validationSchema={schema}
  //       onSubmit={console.log}
  //       initialValues={{
  //         firstName: "",
  //         lastName: "",
  //         username: "",
  //         city: "",
  //         state: "",
  //         zip: "",
  //         file: null,
  //         terms: false,
  //       }}
  //     >
  //       {({ handleChange, values, touched, errors }) => (
  //         <Form noValidate >
  //           <Row className="mb-3">
  //             <Form.Group
  //               as={Col}
  //               md="6"
  //               controlId="validationFormik101"
  //               className="position-relative"
  //             >
  //               <h4>First name</h4>
  //               <Form.Control
  //               className="formcontrol"
  //                 type="text"
  //                 name="firstName"
  //                 value={fname}
  //                 onChange={(event) => setfname(event.target.value)}
  //                 isValid={touched.firstName && !errors.firstName}
  //               />
  //               <Form.Control.Feedback tooltip>
  //                 Looks good!
  //               </Form.Control.Feedback>
  //             </Form.Group>
  //             <Form.Group
  //               as={Col}
  //               md="6"
  //               controlId="validationFormik102"
  //               className="position-relative"
  //             >
  //               <h4>Last name</h4>
  //               <Form.Control
  //               className="formcontrol"
  //                 type="text"
  //                 name="lastName"
  //                 value={lname}
  //                 onChange={(e) => setlname(e.target.value)}
  //                 isValid={touched.lastName && !errors.lastName}
  //               />
                

  //               <Form.Control.Feedback tooltip>
  //                 Looks good!
  //               </Form.Control.Feedback>
  //             </Form.Group>
  //             <Form.Group as={Col} md="12" controlId="validationFormikUsername2">
  //               <h4>Username</h4>
  //               <InputGroup >
  //                 <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
  //                 <Form.Control
  //                 className="formcontrol"
  //                   type="text"
  //                   placeholder="Username"
  //                   aria-describedby="inputGroupPrepend"
  //                   name="username"
  //                   value={email}
  //                   onChange={(e) => setemail(e.target.value)}
                   
  //                 />
  //                 <Form.Control.Feedback type="invalid" tooltip>
  //                   {errors.username}
  //                 </Form.Control.Feedback>
  //               </InputGroup>
  //             </Form.Group>
  //           </Row>
  //           <Row className="mb-3">
  //             <Form.Group
              
  //               as={Col}
  //               md="6"
  //               controlId="validationFormik103"
  //               className="position-relative "
  //             >
  //               <h4>Campus</h4>
  //               <Form.Select onChange={(e) => setcampus(e.target.value)} value={campus} aria-label="Default select example"
  //               className="formcontrol">
  //                 console.log({campus});
  //     <option>Select Campus</option>
  //     <option value="One">One</option>
  //     <option value="Two">Two</option>
  //     <option value="Three">Three</option>
  //   </Form.Select>
  //             </Form.Group>
  //             <Form.Group
  //               as={Col}
  //               md="6"
  //               controlId="validationFormik104"
  //               className="position-relative"
  //             >
  //               <h4>Type Of Place</h4>
  //               <Form.Select aria-label="Default select example" onChange={(e) => settypeofplace(e.target.value)} value={typeofplace}
  //                 className="formcontrol">
  //     <option>Select Place</option>
  //     <option value="Hostel">Hostel</option>
  //     <option value="Class Room">Class Room</option>
  //     <option value="Campus">Campus</option>
  //   </Form.Select>
  //               <Form.Control.Feedback type="invalid" tooltip>
  //                 {errors.state}
  //               </Form.Control.Feedback>
  //             </Form.Group>
  //             <Form.Group
  //               as={Col}
  //               md="6"
  //               controlId="validationFormik105"
  //               className="position-relative"
  //             >
  //               <h4>Type Of Damage</h4>
  //               <Form.Select aria-label="Default select example" onChange={(e) => settypeofdamage(e.target.value)} value={typeofdamage}
  //                 className="formcontrol">
  //     <option>Select Damage Type</option>
  //     <option value="Pipeline">Pipeline</option>
  //     <option value="Electrical">Electrical</option>
  //     <option value="Building">Buildings</option>
  //   </Form.Select>

  //               <Form.Control.Feedback type="invalid" tooltip>
  //                 {errors.zip}
  //               </Form.Control.Feedback>
  //             </Form.Group>
  //             <Form.Group 
  //              as={Col}
  //              md="6"
  //              controlId="validationFormik105"
  //             //  className="position-relative"
  //             className="position-relative mb-6">
  //             <h4>File</h4>
  //             <Form.Control
  //               type="file"
  //               required
  //               name="file"
  //               onChange={handleChange}
  //               isInvalid={!!errors.file}
  //             />
  //             <Form.Control.Feedback type="invalid" tooltip>
  //               {errors.file}
  //             </Form.Control.Feedback>
  //           </Form.Group>
  //           </Row>
           
  //           <Form.Group className="position-relative mb-3">
  //             <Form.Check
  //             style={{fontSize:"20px",color:"white"}}
  //               required
  //               name="terms"
  //               label="Agree to terms and conditions"
  //               onChange={handleChange}
  //               isInvalid={!!errors.terms}
  //               feedback={errors.terms}
  //               feedbackType="invalid"
  //               id="validationFormik106"
  //               feedbackTooltip
  //             />
  //           </Form.Group>
  //           <Button type="submit" style={{margin:"20px"}} onClick={saveData}>Submit form</Button>
  //         </Form>
  //       )}
  //     </Formik>
  //   </div>
  //   </div>
  //   </>


<>
  <Snav />
  <div
    className="outer"
    style={{
      padding: "20px",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <h2
      style={{
        fontFamily: "serif",
        color: "#283c86",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
        fontSize: "2rem",
      }}
    >
      Make a Complaint Here
    </h2>
    <div
      className="container"
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          city: "",
          state: "",
          zip: "",
          file: null,
          terms: false,
        }}
      >
        {({ handleChange, values, touched, errors }) => (
          <Form noValidate>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                controlId="validationFormik101"
                className="position-relative"
              >
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>First Name</h4>
                <Form.Control
                  className="formcontrol"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={fname}
                  onChange={(event) => setfname(event.target.value)}
                  isValid={touched.firstName && !errors.firstName}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    borderColor: "#ccc",
                    fontSize: "1rem",
                  }}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                controlId="validationFormik102"
                className="position-relative"
              >
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Last Name</h4>
                <Form.Control
                  className="formcontrol"
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lname}
                  onChange={(e) => setlname(e.target.value)}
                  isValid={touched.lastName && !errors.lastName}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    borderColor: "#ccc",
                    fontSize: "1rem",
                  }}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs={12} controlId="validationFormikUsername2">
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Username</h4>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    className="formcontrol"
                    type="text"
                    placeholder="Enter your username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      padding: "10px",
                      borderColor: "#ccc",
                      fontSize: "1rem",
                    }}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                controlId="validationFormik103"
                className="position-relative"
              >
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Campus</h4>
                <Form.Select
                  onChange={(e) => setcampus(e.target.value)}
                  value={campus}
                  aria-label="Select Campus"
                  className="formcontrol"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    borderColor: "#ccc",
                    fontSize: "1rem",
                  }}
                >
                  <option>Select Campus</option>
                  <option value="One">One</option>
                  <option value="Two">Two</option>
                  <option value="Three">Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                controlId="validationFormik104"
                className="position-relative"
              >
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Type Of Place</h4>
                <Form.Select
                  aria-label="Select Place"
                  onChange={(e) => settypeofplace(e.target.value)}
                  value={typeofplace}
                  className="formcontrol"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    borderColor: "#ccc",
                    fontSize: "1rem",
                  }}
                >
                  <option>Select Place</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Class Room">Class Room</option>
                  <option value="Campus">Campus</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                controlId="validationFormik105"
                className="position-relative"
              >
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Type Of Damage</h4>
                <Form.Select
                  aria-label="Select Damage Type"
                  onChange={(e) => settypeofdamage(e.target.value)}
                  value={typeofdamage}
                  className="formcontrol"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    borderColor: "#ccc",
                    fontSize: "1rem",
                  }}
                >
                  <option>Select Damage Type</option>
                  <option value="Pipeline">Pipeline</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Building">Building</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                controlId="validationFormik106"
                className="position-relative mb-6"
              >
                <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Upload File</h4>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  onChange={handleChange}
                  isInvalid={!!errors.file}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    borderColor: "#ccc",
                    fontSize: "1rem",
                  }}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.file}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="position-relative mb-3">
              <Form.Check
                style={{ fontSize: "16px", color: "#283c86", fontWeight: "bold" }}
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormik106"
                feedbackTooltip
              />
            </Form.Group>
            <Button
              type="submit"
              style={{
                backgroundColor: "#283c86",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                width: "100%",
                transition: "background-color 0.3s ease",
                fontSize: "1rem",
                width:"85%"
                
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a247")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#283c86")}
              onClick={saveData}
            >
              Submit Form
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
</>


  
  );
}

export default User;
