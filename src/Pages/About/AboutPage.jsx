import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import aboutImg from "../../assets/about-img.webp"
import { Link } from "react-router-dom"

export default function AboutPage() {
    return (
        <div className="py-5">
            <section>
                <Container>
                    <Row className="text-white justify-content-between align-items-center">
                        <Col md={12}>
                            <h3 style={{ fontSize: "85px", lineHeight: "6rem" }}>Bringing Gamers & Creators Together!</h3>
                        </Col>
                        <Col md={5}>
                            <p>Welcome to [Your Website Name], the ultimate destination for gamers and creators! Whether you're here to discover thrilling new games, share your own creations, or connect with fellow gaming enthusiasts, you've come to the right place. Let’s redefine gaming together!"</p>
                            <Button as={Link} to="/login" className="primary-btn">Subscribe Plan</Button>
                        </Col>
                        <Col md={4}>
                            <Image src={aboutImg} style={{ width: "100%" }} />
                        </Col>
                    </Row>
                    <div style={{ backgroundColor: "white" }} className="mt-5">
                        <hr />
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    <Row className="text-white justify-content-between pt-5">
                        <Col md={6}>
                            <h1>Our Mission</h1>
                        </Col>
                        <Col md={6} className="mission">
                            <p>Our mission is to create a dynamic and inclusive platform where gamers and developers come together to share, discover, and experience games like never before. We strive to provide an accessible space where indie developers can showcase their creativity, gamers can explore a vast library of games, and the community can thrive through collaboration and engagement. Our goal is to bridge the gap between developers and players, fostering a culture of innovation and creativity. We believe that every game has a story to tell, and we are dedicated to providing a stage for those stories to be heard. Through continuous improvements, strong community interactions, and cutting-edge technology, we aim to redefine the way games are experienced and appreciated.</p>
                        </Col>
                    </Row>
                    <div style={{ backgroundColor: "white" }} className="mt-5">
                        <hr />
                    </div>
                </Container>
            </section>
            <section>
                <Container>
                    <Row className="text-white pt-5">
                        <Col md={6} className="vision">
                            <p>We envision a future where gaming knows no boundaries—a world where developers of all levels can bring their ideas to life and gamers can access an ever-growing universe of unique and innovative games. Our goal is to be the go-to platform for game sharing, fostering creativity, connection, and limitless possibilities in the gaming industry. We strive to create an environment where passionate developers can collaborate, gain recognition, and transform their visions into reality. By providing tools, resources, and a supportive community, we empower creators to push the limits of game development. At the same time, we aim to offer players a diverse and immersive gaming experience, where they can discover hidden gems, support independent developers, and engage in meaningful interactions. Together, we are shaping the future of gaming—one idea, one game, and one connection at a time.</p>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                            <h1>Our Vision</h1>
                        </Col>
                    </Row>
                    <div style={{ backgroundColor: "white" }} className="mt-5">
                        <hr />
                    </div>
                </Container>
            </section>

            <section>
                <Container>
                    <Row className="text-white pt-4 justify-content-between">
                        <h1 className="mb-4">What We Offer?</h1>
                        <Col md={4}>
                            <div style={{ backgroundColor: "var(--light-color)", borderRadius: "15px", border: "1px solid var(--border)", height: "100%" }} className="text-center p-4">
                                <h4>Upload Your Games</h4>
                                <p className="mt-3">Are you a game developer? Share your creations with the world! Our platform makes it easy to upload and showcase your games, whether they’re indie projects or full-fledged titles.</p>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div style={{ backgroundColor: "var(--light-color)", borderRadius: "15px", border: "1px solid var(--border)", height: "100%" }} className="text-center p-4">
                                <h4>Explore & Play Unlimited Games</h4>
                                <p className="mt-3">Dive into a massive collection of games from various genres. Whether you love action, adventure, RPGs, or casual games, there’s something for everyone.</p>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div style={{ backgroundColor: "var(--light-color)", borderRadius: "15px", border: "1px solid var(--border)", height: "100%" }} className="text-center p-4">
                                <h4>Fast & Easy Downloads</h4>
                                <p className="mt-3">Download and play games instantly without any hassle. Enjoy a smooth experience with secure and optimized game hosting.</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center mt-4">
                        <Button as={Link} className="primary-btn">Subscribe Plan</Button>
                    </div>
                </Container>
            </section>

        </div >
    )
}
