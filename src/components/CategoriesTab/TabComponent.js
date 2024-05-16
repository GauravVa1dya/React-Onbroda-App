import { Box, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Login from "../Login";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "../Signup";
import { UserAuthContextProvider, useUserAuth } from "../../context/UserAuthContext";
import "../tabstyle.css";
import Dropdown from "react-bootstrap/Dropdown";
import { SocialIcon } from "react-social-icons";
import RequestContent from "../RequestContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

const TabComponent = () => {
  const { logOut, user } = useUserAuth();
  const [val, setVal] = useState("one");
  const [show, setShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showRequest, setShowRequest] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTab = (e, newVal) => {
    setVal(newVal);
  };

  const handleShow = (productId) => {
    if (user) {
      navigate(`/home/${productId}`);
    } else {
      setSelectedProductId(productId);
      setShow(true);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://apicdn.storyyell.in/"
      );
      const jsonData = await response.json();
      setData(jsonData.images);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRequestClick = () => {
    setShowRequest(true);
  };

  const [query, setQuery] = useState("");

  const search_parameters = Object.keys(Object.assign({}, ...data));

  function search(data) {

    return data.filter((data) =>

      search_parameters.some((parameter) =>

        data[parameter].toString().toLowerCase().includes(query)

      )

    );

  }


  const renderProducts = () => {
    if (val === "one") {
      return (
        <>
        <Container className="pb-5">
          <Row className="product-row">
                {search(data).map((product, index) => (
                  <Col className="product-images col-md-3">
                    <img
                      src={product.imageSrc}
                      alt={product.name}
                      type="button"
                      key={index}
                      onClick={() => handleShow(product.id)}
                    />
                    <img className="product-subimage"
                      src={product.logo}
                      alt={product.name}
                      type="button"
                      key={index}
                      onClick={() => handleShow(product.id) }
                    />
                    <p id="product-name">{product.name}  </p>
                    <p id="product-subname">{product.subname}</p>
                  </Col>
                ))}
          </Row>
        </Container>

          <Modal show={show} onHide={handleClose} className="login_popupform">
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Container>
              <Row>
                <Col>
                  <UserAuthContextProvider>
                    <Routes>
                      <Route
                        path="/"
                        element={<Login productId={selectedProductId} />}
                      />
                      <Route path="/signup" element={<Signup />} />
                    </Routes>
                  </UserAuthContextProvider>
                </Col>
              </Row>
            </Container>
          </Modal>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
    <center>
      <Container>
        <Row>
          <header className="App-header">
            <div>
              <h1 className="home-heading">
                On<span>broda</span>
              </h1>
              {user && (
              <div id="sidebar-menu">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className="btn-warning">
                    <FontAwesomeIcon icon={faBars} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item id="name">{user.email.substring(0,user.email.indexOf("@"))}</Dropdown.Item>
                    <Dropdown.Item id="email"> {user.email}</Dropdown.Item>
                    <Dropdown.Item id="button-content" className="btn" onClick={handleRequestClick}>
                      Request Content
                    </Dropdown.Item>
                    <Dropdown.Item id="connect-us">Connect us with :</Dropdown.Item>
                    <Dropdown.Item id="icon">
                      <SocialIcon url="https://instagram.com" />
                      <SocialIcon url="https://linkedin.com" id="linkedin" />
                      <SocialIcon url="://twitter.com" />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="d-grid gap-2">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="login-name btn-secondary"  style={{ paddingLeft: "2px", paddingTop: "1px" }}>
                      {user.email.charAt(0).toUpperCase()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogout} >Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              )}
            </div>
          </header>
        </Row>
        <Modal show={showRequest} onHide={() => setShowRequest(false)} className="request-model">
            <Modal.Header closeButton>
            </Modal.Header>
            <Container style={{background:"white"}} >
              <Row>
                <Col>
                <RequestContent/>
                </Col>
              </Row>
            </Container>
          </Modal>
        <Row>
          <div className="search ....">
            <div className="search-container">
              <div className="search-input-container">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input
                      type="text"
                      placeholder="Search Onbordings..."
                      onChange={(e) => setQuery(e.target.value)}
                      className="search-input" // Add a class for styling
                  />
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div
            style={{
              color: "#e5dada",
              lineHeight: "0.5",
              marginTop: "22px",
              fontSize: "12px",
            }}
          >
            <p>
              Discover the ease of onboarding for user satisfaction with a{" "}
            </p>
            <p>seamless experience that makes a lasting impression!</p>
          </div>
        </Row>
      </Container>
      <div
        style={{
          paddingBottom:"1px",
          color: "#EAAB4E",
          marginTop: "16px",
          fontSize: "12px",
          fontWeight: "bold",
          borderBottom: "1px solid #2B3139",
        }}
      >
        <p>100+ ONBOARDING SCREENS</p>
      </div>
      <Container>
        {/* <Row className="tab-row">
          <Col className="tab-col">
              <Box>
                <Tabs
                  value={val}
                  onChange={handleTab}
                  textColor="primary"
                  indicatorColor="secondary"
                  variant="scrollable"
                >
                  <Tab value="one" label="All" />
                  <Tab value="two" label="Health & Fitness" />
                  <Tab value="three" label="Shopping" />
                  <Tab value="four" label="Events" />
                  <Tab value="five" label="Task Management" />
                  <Tab value="six" label="Games & Comic " />
                  <Tab value="seven" label="Self Help & Meditation" />
                  <Tab value="eight" label="Food Delivery" />
                  <Tab value="nine" label="Informative" />
                  <Tab value="ten" label="Auto vehicle" />
                  <Tab value="eleven" label="Chat & Communication" />
                  <Tab value="twl" label="Design" />
                  <Tab value="thrteen" label="Photos" />
                  <Tab value="fourteen" label="OTT" />
                  <Tab value="fiveteen" label="Education & Learning" />
                  <Tab value="fourteen" label="Business" />
                  <Tab value="fifteen" label="Online workspace" />
                  <Tab value="sixteen" label="Tools" />
                  <Tab value="seventeen" label="Travel" />
                </Tabs>
              </Box>
          </Col>
        </Row> */}
          <div>{renderProducts()}</div>
      </Container>
      <Footer/>
    </center>
    </>
  );
};
export default TabComponent;
