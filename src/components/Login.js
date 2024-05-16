import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./tabstyle.css";
import Signup from "./Signup";

const Login = ({ productId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate(`/home/${productId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate(`/home/${productId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignupLinkClick = () => {
    setShowSignup(true);
  };

  const handleLoginLinkClick = () => {
    setShowSignup(false);
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
    setSignupSuccess(true);
  };

  return (
    <>
      {!showSignup && (
      <div className="p-2 pt-0 box login">
        <div className="login-header">
          <h1>On<span>broda</span></h1>
        </div>
        <p className="pt-0 mt-0 loginP">Unlock onbording scrren with one-step <br></br> by singing up ! </p>

        {error && <Alert variant="danger">{error}</Alert>}
        {signupSuccess && (
        <Alert variant="success" className="p-2 pt-0 box login">
          Signup successful! Please log in.
        </Alert>
        )}
        <div>
          <button className="g-btn" onClick={handleGoogleSignIn}>
            <img src="images/google.png" style={{width:"13%"}}/>
            <span style={{color: "#FFFFFF",paddingLeft: "16px"}}>Continue with Google</span>
          </button>
        </div>
        <p style={{color:"whitesmoke"}} className="pt-1 pb-0 mb-0"><span style={{textDecoration:"line-through",color:"#292E35", textDecorationColor: "white",paddingRight:"5px"}}> qqqqqqqqqqq    </span>  OR  <span style={{textDecoration:"line-through",color:"#292E35", textDecorationColor: "white"}}> qqqqqqqqqqq </span></p>
        <Form onSubmit={handleSubmit} className="pt-2">
          
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

          <div className="d-grid gap-2 log-submit">
            <Button type="Submit">
              SUBMIT
            </Button>
          </div>
        </Form>
        <div className="box text-center mb-2" style={{color:"white"}}>
          Don't have an account? <span style={{ color: "#EAAB4E", cursor: "pointer" }} onClick={handleSignupLinkClick}>
          Sign up
          </span>
        </div>
      </div>
)}

 
 {showSignup && !signupSuccess && (
      <Modal show={showSignup} onHide={() => setShowSignup(false)} >
        <Modal.Header closeButton>
          <Modal.Title className="login-header pt-5"><h1>On<span>broda</span></h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Signup handleSignupSuccess={handleSignupSuccess} />
          <div className="p-2 box text-center" style={{color:"white"}}>
        Already have an account? <span
          style={{ color: "#EAAB4E", cursor: "pointer" }}
          onClick={handleLoginLinkClick}
        >
          Log In
        </span>
      </div>
        </Modal.Body>
      </Modal>
)}
    </>
  );
};

export default Login;