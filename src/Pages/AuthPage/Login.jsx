import { useState, useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import apiUrl from "../../ApiEndpoint";
import UserContext from "../../ContextApi/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login() {

    const { setSignUser } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const userLoginFn = async (e) => {
        e.preventDefault()
        const res = await fetch(`${apiUrl}/api/user/signIn`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        const userError = document.getElementById("userError")
        data.message !== undefined ? userError.innerText = data.message : userError.innerText = ""

        if (res.ok) {
            sessionStorage.setItem("userData", JSON.stringify(data))
            setSignUser(data)
            data.role === "Admin" ? navigate("/adminPanel/upload-product") : navigate("/userPanel/membership-plans")
        }
    }

    return (
        <section>
            <div className="auth-page-hero-section text-center text-white">
                <div className="auth-page-hero-overlay">
                    <div className="py-5">
                        <h3>Login</h3>
                        <h6>Welcome to the official site blog.</h6>
                    </div>
                </div>
            </div>
            <Container>
                <Row className="justify-content-between py-5">
                    <Col md={5}>
                        <div>
                            <h2 className="text-white py-3">Login</h2>
                            <Form onSubmit={userLoginFn} className="text-white rounded login-form">
                                <div id="userError" className="text-danger text-center"></div>
                                <Form.Group className="mb-4 input">
                                    {/* <Form.Label>User Email <span className="text-danger">*</span></Form.Label> */}
                                    <FontAwesomeIcon className="me-3" icon={faEnvelope} style={{ fontSize: "30px" }} />
                                    <div style={{ backgroundColor: "var(--border)", height: "30px", width: "1px" }}></div>
                                    <Form.Control name="email" type="email" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="input">
                                    {/* <Form.Label>User Password <span className="text-danger">*</span></Form.Label> */}
                                    <FontAwesomeIcon className="me-3" icon={faLock} style={{ fontSize: "30px" }} />
                                    <div style={{ backgroundColor: "var(--border)", height: "30px", width: "1px" }}></div>
                                    <Form.Control name="password" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button className="primary-btn mt-4" type="submit">LOGIN NOW</Button>

                            </Form>
                        </div>
                    </Col>
                    <Col md={1}>
                        <div style={{ backgroundColor: "var(--border)", height: "100%", width: "1px" }}></div>
                    </Col>
                    <Col md={4}>
                        <h4 className="text-white mt-3">Dont’ Have An Account?</h4>
                        <Button as={Link} to="/signup" className="primary-btn mt-3" type="submit" style={{ fontSize: "19px", fontWeight: "normal" }} >RESGISTER NOW</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
