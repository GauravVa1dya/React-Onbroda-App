import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useUserAuth } from "../context/UserAuthContext";
import Login from "./Login"; // Import the Login component

const Signup = ({ handleSignupSuccess }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const { signUp } = useUserAuth();
  // let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      handleSignupSuccess();// Update signup success state
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-2 pt-0 box">
        <div className="pb-4">
        </div>
        
        {error && <Alert variant="danger">{error}</Alert>}

        {!signupSuccess ? ( // Render signup form if signup is not successful
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit" style={{color:"white"}}>
                Sign up
              </Button>
            </div>
          </Form>
        ) : (
          <Login /> // Render login component if signup is successful
        )}
      </div>
    </>
  );
};

export default Signup;
