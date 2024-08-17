import { useNavigate,useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Snav from "./sidenav";

function RoleWork() {
  const [data1, setData1] = useState([]);
  const[success,setSuccess]=useState("");
  // const[acc,setAcc]=useState("Accept");
  
  const location = useLocation();
 

  // const [status,setStatus]=useState('');
  const navigate = useNavigate();

  useEffect(() => {
    GetAPICAll();
  }, [success]);
 
  const { message } = location.state || { message: "No message received" };
  //  alert(message);
  const role =message;
  const name=localStorage.getItem('name');
//   alert(role);
//   const GetAPICAll = () => {
//     fetch("http://localhost:1000/RoleWise")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           // setStatus(result[0].status);
//           // alert(status);
//         setData1(result);
//         setSuccess(result.success)
//         setTimeout(() => {
//           // navigate('MyComplain');
//           setSuccess('');
         
//         },1000);
//         },
//         (error) => {
//           console.error("Error fetching data:", error);
//         }
//       );
//   };
const  GetAPICAll=async ()=>{
     try{
       
       const response= await fetch(`http://localhost:1000/RoleWise?role=${role}`);
       const data = await response.json();
       setData1(data);
       const status=data[0].status;
       console.log(status);
       
      //  const data = await response.json();
       if(response.ok){
        console.log("Completed")
       }

     }catch(error){
      console.error("Error fetching data:", error);
     }
}

 const Accept=async (id)=>{
//     setAcc("Accepted");
try{
       
    const response= await fetch(`http://localhost:1000/Accept?id=${id}&id1=${name}`);
    const data = await response.json();
    // alert(data);
    // setData1(data);
    if(response.ok){
     console.log("Completed")
     
    //  setAcc("Accepted");
    }

  }catch(error){
   console.error("Error fetching data:", error);
  }


 }
 const complete=async (id)=>{
     try{
       const response= await fetch(`http://localhost:1000/status?id=${id}`);
       if(response.ok){
        console.log("Completed")
       }

     }catch(error){
      console.error("Error fetching data:", error);
     }
}
const Uncomplete=async(id)=>{
  try{
    const response= await fetch(`http://localhost:1000/status1?id=${id}`);
    if(response.ok){
     console.log("Completed")
    }

  }catch(error){
   console.error("Error fetching data:", error);
  }   
}

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
           
            </div>
            </div>
          </div>
          <table className="table table-striped table-hover" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Id</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Date</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
                {/* <th style={{ padding: "8px", border: "1px solid #ddd" }}>Lname</th> */}
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Campus</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Email</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type-of-place</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type-of-damage</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Accept</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Complete</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Reject</th>
                {/* <th style={{ padding: "8px", border: "1px solid #ddd" }}>Reject</th> */}
                {/* <th style={{ padding: "8px", border: "1px solid #ddd" }}>Status</th> */}
        
                

              </tr>
            </thead>
            <tbody>
              {data1.map((head, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.id}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.date}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.fname} {head.lname}</td>
                  {/* <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.lname}</td> */}
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.campus}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.email}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.typeofplaces}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.typeofdamage}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    <button 
                      className="btn text-warning text-act"
                      data-toggle="modal"
                      style={{ border: "none", backgroundColor: "transparent" }}
                       onClick={()=>{Accept(head.id)}}
                     
                    >

                   {head.status === 3 ? "Accepted" :"Accept"}
                    </button>
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    <button 
                      className="btn text-warning text-act"
                      data-toggle="modal"
                      style={{ border: "none", backgroundColor: "transparent" }}
                      onClick={()=>{complete(head.id)}}
                     
                    >
                       {head.status === 1 ? "Completed" :"Complete"}
                    </button>
                   
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  <button 
                      className="btn text-danger text-act"
                      
                      style={{ border: "none", backgroundColor: "transparent" }}
                      onClick={()=>{Uncomplete(head.id)}}
                    >
                      {head.status === 2 ? "Rejected" :"Reject"}

                    </button>
                    </td>
                   
                 
                    {/* <td style={{ padding: "8px", border: "1px solid #ddd" }}>{head.status}</td> */}

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

export default RoleWork;
