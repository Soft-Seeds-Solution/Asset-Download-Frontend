import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <section className="mt-5">
                <div className="footer-bg">
                    <div className="footer-bg-overlay">
                        <Container>
                            <Row className="justify-content-between align-items-end py-4">
                                <Col md={3}>
                                    <h3>LOGO</h3>
                                    <Link to="/"><p className="mb-3">Home</p></Link>
                                    <Link to="/"><p className="mb-3">Categories</p></Link>
                                    <Link to="/"><p className="mb-3">About</p></Link>
                                    <div className="text-white d-flex">
                                        <p className="me-3">Copyright</p>
                                        <p>Terms Of Service</p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <h3 className="text-center">Contact Us</h3>
                                    <div className="d-flex text-white align-items-center mb-3">
                                        <FontAwesomeIcon icon={faGlobe} className="me-3" />
                                        <p>mywebsite@gmail.com</p>
                                    </div>
                                    <div className="d-flex text-white align-items-center mb-3">
                                        <FontAwesomeIcon icon={faPhone} className="me-3" />
                                        <p>+92 314 0000000</p>
                                    </div>
                                    <div className="d-flex justify-content-center text-white">
                                        <FontAwesomeIcon icon={faFacebookF} className="me-3" />
                                        <FontAwesomeIcon icon={faInstagram} className="me-3" />
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </section >
        </>
    )
}
