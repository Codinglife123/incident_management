import { Link, useNavigate,useReducer } from "react-router-dom";

import React, { useState, useEffect } from "react";
import Snav from "./sidenav";
import { Button } from "react-bootstrap";

// import './logincss/Mycomplain.css'

function MyComplain() {
  const [data1, setData1] = useState([]);
  const [id, setId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [timeLeft, setTimeLeft] = useState(5);
   const [message,setMessage]=useState('');
  const navigate = useNavigate();
  
//   useEffect(() => {
//     // async function fetchData() {
//     //   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//     //   const jsonData = await response.json();
//     //   setData(jsonData);
//     // }
//     // fetchData();
//     GetAPICAll();
//   }, []);

//   const GetAPICAll =async () => {
//   const id= localStorage.getItem('id');
//   alert(id);
//     //fetrch ra post method
//     try {
//         const response = await fetch(`http://localhost:1000/complain?id=${id}`, {
//           method: 'GET',
//         });
        
//         const result = await response.json();
//         // modifydat(result);
//         console.log('Response from server:', result);
//       } catch (error) {
//         console.error('Error:', error);
//       }
    
//   };
//   debugger;
//   const modifydat = (data) => {
//     // let kk = data;
//     setData1(data);
//     debugger;
//   };
useEffect(() => {
    const id= localStorage.getItem('id');
    // alert(id);
    if(id<=0){
     
      navigate('/User')
    }

    // alert(id);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1000/complain?id=${id}`);
        if (!response.ok) {
          
          
          // navigate('/User')
          alert("You have not Given Any complain....")
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        modifydat(data);
        
        // console.log(data);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        // alert("error");
      }
    };

    fetchData();
  }, [message,navigate]);
  const modifydat = (data) => {
    // let kk = data;
    setData1(data);
    debugger;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
 function Update(id) {
  const data = { message: id };
  navigate('/Edit', { state: data });
  }


  const deleteValue = async (ID) => {
    
    // alert(ID);

    try {
     
      const response = await fetch(`http://localhost:1000/deleteUser?id=${ID}`);
      debugger;
      const data = await response.json();
      
      // console.log(response);
      if (response.ok) {
        setMessage(data.success);
        // window.location.reload();
        
        // alert("delete successfully");
        //  navigate('/MyComplain')
       
setTimeout(() => {
  // navigate('MyComplain');
  setMessage('');
 
},1000);

       

      }
      else{
        throw new Error("Network response was not ok");
      }
      // alert("working");

      // const data = await response.json();
     
      //   alert(data[0].typeofplaces);

      //   modifydat(data);

      // console.log(data);
      setUserData(data);
      // setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      // alert("error");
    }
  };
  
  return (
    <>
    <Snav/>
    <div className="container-xl" style={{ width: "100%", marginTop: "20px" }}>
    <div className="table-responsive">
      <div className="table-wrapper" style={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)", borderRadius: "5px", padding: "20px" }}>
        <div className="table-title" style={{ marginBottom: "20px", backgroundColor: "#4CAF50", color: "white", padding: "15px 30px", borderRadius: "5px" }}>
          <div className="row" style={{ width: "100%", margin: "0", padding: "0%" }}>
            <div className="col-sm-6">
              <h2 style={{ margin: "0" }}>INCIDENT <b>LIST</b></h2>
            </div>
            <div className="col-sm-6 text-right" >
            <button 
                    className="btn text-danger text-act"
                    onClick={()=>{navigate('/User')}}
                    style={{ border: "none", backgroundColor: "transparent" ,backgroundColor:"white"}}
                  >
                  New Complain
                  </button>
            </div>
          </div>
        </div>

        <table className="table table-striped table-hover" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>ID</th>

              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Date</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
              {/* <th style={{ padding: "8px", border: "1px solid #ddd" }}>Lname</th> */}
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Campus</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Email</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type-of-place</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type-of-damage</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Edit</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>delete</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Status</th>

            </tr>
          </thead>
          <tbody>
            <p>{message}</p>
            {data1.map((head, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.id}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.date}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.fname } {head.lname}</td>
                {/* <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.lname}</td> */}
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.campus}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.email}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.typeofplaces}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.typeofdamage}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                 { head.status===1?(
                       <td style={{ color: 'red' ,fontSize:"20px"}}>
                         You can't edit
                       </td>
                     ) :(
                  
                  <Button
                    className="btn text-warning text-act"
                    data-toggle="modal"
                    style={{ border: "none", backgroundColor: "transparent" }}
                    onClick={()=>{Update(head.id)}}
                  >
                    edit
                  </Button>
                     )
}
                 
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                <button 
                    className="btn text-danger text-act"
                    
                    style={{ border: "none", backgroundColor: "transparent" }}
                    onClick={()=>{deleteValue(head.id)}}
                  >
                    delete
                  </button>
                  </td>
                  {
                    // const status={head.status}
                     <td>
                     {/* {head.status === 1 ? (
                       <td style={{ color: 'green' ,fontSize:"20px"}}>
                         Completed
                       </td>
                     ) : head.status === 2 ? (
                       <td style={{ color: 'red',fontSize:"20px" }}>
                        Rejected
                       </td>
                     ) : (
                       <td style={{ color: 'Orange',fontSize:"20px" }}>
                         Pending
                       </td>
                     )} */}
                     {head.status === 1 ? (
  <td style={{ color: 'green', fontSize: '20px' }}>
    Completed
  </td>
) : head.status === 2 ? (
  <td style={{ color: 'red', fontSize: '20px' }}>
    Rejected
  </td>
) : head.status === 3 ? (
  <td style={{ color: 'blue', fontSize: '20px' }}>
    Accepted by {head.accepted_by}
  </td>
) : (
  <td style={{ color: 'orange', fontSize: '20px' }}>
    Not Completed
  </td>
)}
                   </td>
                   }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </>
);
}

export default MyComplain;
