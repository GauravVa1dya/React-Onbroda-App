import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./tabstyle.css";
import Dropdown from "react-bootstrap/Dropdown";
import { SocialIcon } from "react-social-icons";
import RequestContent from "./RequestContent";
import { Modal } from "react-bootstrap";
import Footer from "./Footer";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showRequest, setShowRequest] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://apicdn.storyyell.in/");
      const jsonData = await response.json();
      setData(jsonData.images);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Find the product with the corresponding ID
    const foundProduct = data.find((p) => p.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId, data]);

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

  const handleBack = async () => {
    navigate("/");
  };

  const handleScroll = (direction) => {
    const scrollAmount = 200; // Adjust scroll amount as needed
    if (direction === "left") {
      setScrollPosition((prevPosition) =>
        Math.max(prevPosition - scrollAmount, 0)
      );
    } else {
      setScrollPosition((prevPosition) =>
        Math.min(
          prevPosition + scrollAmount,
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        )
      );
    }
  };

  const handleShow = (productId) => {
    if (user) {
      navigate(`/home/${productId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSelectedProductId(productId);
      setShow(true);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <header className="App-header-home">
            <h1 className="home-heading">
              On<span>broda</span>
            </h1>
            <div id="sidebar-menu">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="btn-warning">
                  <FontAwesomeIcon icon={faBars} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item id="name">
                    {user.email.substring(0, user.email.indexOf("@"))}
                  </Dropdown.Item>
                  <Dropdown.Item id="email"> {user.email}</Dropdown.Item>
                  <Dropdown.Item
                    id="button-content"
                    className="btn"
                    onClick={handleRequestClick}
                  >
                    Request Content
                  </Dropdown.Item>
                  <Dropdown.Item id="connect-us">
                    Connect us with :
                  </Dropdown.Item>
                  <Dropdown.Item id="icon">
                    <SocialIcon url="https://instagram.com" />
                    <SocialIcon url="https://linkedin.com" id="linkedin" />
                    <SocialIcon url="https://twitter.com" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="d-grid gap-2">
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="login-name btn-secondary"
                    style={{ paddingLeft: "2px", paddingTop: "1px" }}
                  >
                    {user.email.charAt(0).toUpperCase()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </header>
        </Row>
        <Modal
          show={showRequest}
          onHide={() => setShowRequest(false)}
          className="request-model"
        >
          <Modal.Header closeButton></Modal.Header>
          <Container style={{ background: "white" }}>
            <Row>
              <Col>
                <RequestContent />
              </Col>
            </Row>
          </Container>
        </Modal>
      </Container>
      <div className="p-3 box mt-3 home">
        <Container>
          <Row>
            <Col>
              <button className="home-back btn" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} /> Onboarding Details
              </button>{" "}
              <br />
            </Col>
          </Row>
          <Row className="product-details pt-3">
            <Col>
              {product && (
                <>
                  <Row>
                    <div className="col-md-12">
                      <p className="logo">
                        <img
                          src={`${product.logo}`}
                          alt={`Product ${product.id}`}
                          style={{ borderRadius: "40px" }}
                        />
                        <h3>
                          {product.name} : {product.subname}{" "}
                        </h3>
                        <p className="rating">{product.rating}</p>
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <div
                      className="pt-4"
                      style={{
                        position: "relative",
                        overflowX: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <button
                          className="scroll-button left"
                          onClick={() => handleScroll("left")}
                          hidden={scrollPosition === 0}
                          style={{
                            zIndex: "1",
                            width: "40px",
                            background: "#1E2228",
                            boxShadow:
                              "25px 0 20px 10px rgba(30, 34, 40, 0.45)",
                            border: "none",
                            marginLeft: "-13px",
                          }}
                        >
                          <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <div
                          className="scrollable-images"
                          ref={scrollRef}
                          style={{
                            transform: `translateX(-${scrollPosition}px)`,
                          }}
                        >
                          {product.category &&
                            product.category.map((cat, index) => (
                              <img
                                key={index}
                                src={`${cat.image}`}
                                alt={`Category ${index + 1}`}
                              />
                            ))}
                        </div>
                        <button
                          className="scroll-button right"
                          onClick={() => handleScroll("right")}
                          hidden={
                            scrollPosition ===
                            scrollRef.current?.scrollWidth -
                              scrollRef.current?.clientWidth
                          }
                          style={{
                            zIndex: "1",
                            width: "40px",
                            background: "#1E2228",
                            boxShadow:
                              "-25px 0px 20px 10px rgba(30, 34, 40, 0.45)",
                            border: "none",
                          }}
                        >
                          <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                      </div>
                    </div>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          <Row className="pb-4">
            <p style={{ color: "white", fontSize: "23px" }} className="pt-5">
              Other App you may like!
            </p>
            {data.map((product, index) => (
              <Col className="product-images col-md-3">
                <img
                  src={`${product.imageSrc}`}
                  alt={`Product ${product.id}`}
                  type="button"
                  key={index}
                  onClick={() => handleShow(product.id)}
                />
                <img
                  className="product-subimage"
                  src={`${product.logo}`}
                  alt={product.name}
                  type="button"
                  key={index}
                  onClick={() => handleShow(product.id)}
                />
                <p id="product-name">{product.name} </p>
                <p id="product-subname">{product.subname}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Home;
