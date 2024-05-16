import React from 'react';
import { Col, Row } from 'react-bootstrap';
import "../App.css";
import { SocialIcon } from "react-social-icons";

function Footer() {
    return (
        <footer className="container-fluid">
            <Row className="d-flex justify-content-center main">
                <Col className='text-center'>
                    <h2>
                        On<span style={{color:"#EAAB4E"}}>broda</span>
                    </h2>
                        <p>Empower your brand's story with StoryYell's localised marketing solutions</p>  
                </Col>
                <Col className='contact'>
                    <h4 style={{paddingBottom:"12px"}}>Contact Us</h4>
                    <p style={{lineHeight:"10px"}}>Address : Pune, Maharashtra, India</p>
                    <p style={{lineHeight:"10px"}}>Email : <a href="mailto:apps@storyyell.in" style={{color:"white", textDecoration:"none"}}>apps@storyyell.in</a></p>
                    {/* <p style={{lineHeight:"10px"}}>Contact : +91 1234567890</p> */}
                </Col>
                <Col>
                    <h4>Get in touch</h4>
                    <SocialIcon url="https://instagram.com" style={{height:"40px", width:"65px"}}/>
                    <SocialIcon url="https://linkedin.com" id="linkedin" style={{height:"40px", width:"65px"}}/>
                    <SocialIcon url="https://twitter.com" style={{height:"40px", width:"65px"}}/>
                    <div className='policy'>
                        <p style={{lineHeight:"10px", paddingTop:"10px"}}><a href="/" style={{color:'white'}}>Terms and Conditions</a></p>
                        <p style={{lineHeight:"10px"}}><a href="/privacypolicy.html" style={{color:'white'}}>Privacy Policy</a></p>
                    </div>
                </Col>
            </Row>
            <Row>
                <p style={{color:"#808080", paddingTop:"5px", textAlign:"left",paddingLeft:"60px"}}>Copyright © 2024 <a href='https://storyyell.in/'>StoryYell.in.</a></p>
            </Row>
        </footer>
    );
}

export default Footer;
