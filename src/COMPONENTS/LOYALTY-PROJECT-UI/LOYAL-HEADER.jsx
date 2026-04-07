import React, {useState} from "react";
import "./LOYAL_HEADER.css";
import { Container, Row, Col, Carousel, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";


import {FaInfoCircle} from "react-icons/fa";

const LOYAL_HEADER = ({
    bottonText = "More Info", 
    modalTitle = "Loyalty Project Details" ,
    modalContent =  (

        <>
        <p>The Loyalty Project</p>
        <ul>
            <li>Feature  A is now available</li>
            <li>Improved Performance </li>
            <li>Dark mode Support coming soon.</li>
        </ul>
        <p>Need help ? contact support anytime.</p>
        </>

    ),
    modalButtonLabel = "Close " ,
    size = "med" , 
    variant  = "outline-primary" ,
    className = "me-2" ,
} = {}) => {

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 





  // 5 vibrant music education images from search
  const images = [
    "https://images.unsplash.com/photo-1522863602463-afebb8886ab2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1734014584080-f90fa3757708?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1734014583260-184257f9a1c1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1635990210239-5d6de53f09ba?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1609320813770-14bc12a48ad9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <React.Fragment>
      <section className="header-section">
        <Container>
          <Row className="align-items-center">
            {/* Left: Text */}
            <Col md={6} className="header-text mb-4 mb-md-0">
              {/*<h4>Best Coach Music</h4>8*/}
              <h1>Welcome to the Loyalty Project 🎶</h1>
              {/*<p>
                Unlock your musical potential with us! Join our vibrant
                community and take your skills to the next level. Whether you're
                a beginner or a seasoned musician, we have something for
                everyone. Get started today and let the music flow! 🎸🎤
              </p>/*/}
              <Button
                variant={variant}
                className={`d-flex align-items-center gap-2 ${className}`}
                onClick={handleShow}
              >
                <FaInfoCircle className="me-2 text-orange" size={20} /> {bottonText}
              </Button>

              <Modal show={show} onHide={handleClose} size={size} centered animation={true} backdrop="static"> 
                <ModalHeader closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold text-orange">{modalTitle}</Modal.Title>
                    <ModalBody className="pt-2">
                        <div className="modal-content-text">
                            {modalContent}
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-0 pt-0">
                        <Button variant="variant-secondary" onClick={handleClose}>{modalButtonLabel}</Button>
                    </ModalFooter>

                </ModalHeader>
              </Modal>
            </Col>

            {/* Right: Slider */}
            <Col md={6}>
              <Carousel
                fade={true}
                interval={5000}
                controls={false}
                indicators={true}
              >
                {images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100 img-fluid"
                      src={img}
                      alt={`Music education slide ${idx + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default LOYAL_HEADER;
