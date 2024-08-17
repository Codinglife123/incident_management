// import { useNavigate } from "react-router-dom";

// import React, { useState, useEffect } from "react";


// function Administrator() {
//   const [data1, setData1] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     // async function fetchData() {
//     //   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//     //   const jsonData = await response.json();
//     //   setData(jsonData);
//     // }
//     // fetchData();
//     GetAPICAll();
//   }, []);

//   const GetAPICAll = () => {
//     //fetrch ra post method
//     debugger;
//     fetch("http://localhost:1000/Administrator")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           debugger;
//           modifydat(result);
//           console.log(result);
//           debugger;
//         },
//         (error) => {
//           this.setState({
//             isLoaded: false,
//             error,
//           });
//         }
//       );
//   };
//   debugger;
//   const modifydat = (data) => {
//     // let kk = data;
//     setData1(data);
//     debugger;
//   };

//   return (
//     <>
//       <div className="container-xl" style={{ width: "100%" }}>
//         <div className="table-responsive">
//           <div className="table-wrapper">
//             <div className="table-title">
//               <div
//                 className="row"
//                 style={{ width: "100%", margin: "0", padding: "0%" }}
//               >
//                 <div className="col-sm-6">
//                   <h2>
//                     INCIDENT<b> LIST</b>
//                   </h2>
//                 </div>

//                 <div className="col-sm-6">
//                   <a className="btn btn-success" data-toggle="modal">
//                     <i className="material-icons">&#xE147;</i>{" "}
//                     {/*onClick={()=>{navigate('/Arr')}}*/}
//                     {/* <span onClick={()=>{navigate('/Arr')}} >Add New Employee</span> */}
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <table className="table table-striped table-hover">
//               <thead style={{ width: "180" }}>
//                 <tr>
//                   <th>Date</th>
//                   <th>FName</th>
//                   <th>Lname</th>
//                   <th>Campus</th>
//                   <th>Email</th>
//                   <th>Type-of-place</th>
//                   <th>Type-of-damage</th>
                
//                   <th>Edit</th>

//                 </tr>
//               </thead>

//               <tbody>
//                 {data1.map((head) => (
//                   <tr key={head.key}>
//                     <td>{head.date}</td>
//                     <td>{head.fname}</td>
//                     <td>{head.lname}</td>
//                     <td>{head.campus}</td>
//                     <td>{head.email}</td>
//                     <td>{head.typeofplaces}</td>
//                     <td>{head.typeofdamage}</td>
//                     {/* <td>{head.date}</td> */}

//                     <td>
//                       <button
//                         className="btn text-warning text-act"
//                         data-toggle="modal"
//                       >
//                         <i
//                           className="material-icons"
//                           data-toggle="tooltip"
//                           title="Edit"
//                         >
//                           &#xE254;
//                         </i>
//                       </button>
//                       {/* onClick={()=>navigate('/Arr', { state: head})} */}
//                       <button
//                         className="btn text-danger tect-act"
//                         data-toggle="modal"
//                       >
//                         <i
//                           className="material-icons"
//                           data-toggle="tooltip"
//                           title="Delete"
//                         >
//                           &#xE872;
//                         </i>
//                       </button>
//                       {/* onClick={()=>deleteRow(head)} */}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Administrator;
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Administrator() {
  const [data1, setData1] = useState([]);
  const[success,setSuccess]=useState("");

  // const [status,setStatus]=useState('');
  const navigate = useNavigate();

  useEffect(() => {
    GetAPICAll();
  }, [success]);

  const GetAPICAll = () => {
    fetch("http://localhost:1000/Administrator")
      .then((res) => res.json())
      .then(
        (result) => {
          // setStatus(result[0].status);
          // alert(status);
        setData1(result);
        setSuccess(result.success)
        setTimeout(() => {
          // navigate('MyComplain');
          setSuccess('');
         
        },1000);
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );
  };
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
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Complete</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Reject</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Status</th>
        
                

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
                       {head.status === 1 ? "Rejected" :"Reject"}
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
                     ) : 
                     head.status===3?(
                      <td style={{ color: 'blue',fontSize:"20px" }}>
                        Acecpted by {head.accepted_by}
                        </td>
                     ):(
                       <td style={{ color: 'Orange',fontSize:"20px" }}>
                         Not Completed
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
  );
}

export default Administrator;
