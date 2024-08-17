// import React, { useState } from 'react';

// const Success = () => {
//   // const [submitted, setSubmitted] = useState(false);


//   return (
//     <div>
//      <h1>Form submitted successfully</h1>
//     </div>
//   );
// };



// export default Success;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// const Success = () => {
//   const [timeLeft, setTimeLeft] = useState(5); // 5 seconds countdown
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (timeLeft === 0) {
//       navigate('/User'); // Redirect to home page
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(timer);
//   }, [timeLeft, navigate]);
//   // const location = useLocation();
//   // const { message } = location.state || { message: 'No message received' };

//   return (
//     <div>
//       <h1>Form submitted successfully</h1>
//       <p>Redirecting in {timeLeft} seconds...</p>
//       {/* <p>{message}</p> */}
//     </div>
//   );
// };

// export default Success;






import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const Success = () => {
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds countdown
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/User'); // Redirect to home page
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f4f4f4' }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <Card.Body className="text-center">
          <h1 style={{ color: '#28a745' }}>Success!</h1>
          <p style={{ fontSize: '1.2em', marginTop: '20px' }}>
            Your form has been submitted successfully.
          </p>
          <p style={{ fontSize: '1em', color: '#6c757d' }}>
            Redirecting in {timeLeft} seconds...
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/User')}
            style={{ marginTop: '20px' }}
          >
            Go to User Page
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Success;
