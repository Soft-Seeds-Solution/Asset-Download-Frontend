import { useState, useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import apiUrl from "../../ApiEndpoint";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../ContextApi/UserContext";

export default function SignUp() {
    const { setSignUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
        role: ""
    })

    const userSignupFn = async (e) => {
        e.preventDefault()
        const { name, email, password, confirmPassword, number } = userData
        const res = await fetch(`${apiUrl}/api/user/addUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, confirmPassword, number, role: "User" })
        })
        const data = await res.json()
        const userError = document.getElementById("userError")
        data.message !== undefined ? userError.innerText = data.message : userError.innerText = ""

        if (res.ok) {
            sessionStorage.setItem("userData", JSON.stringify(data))
            setSignUser(data)
            navigate("/signin")
        }
    }

    const onchange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    return (
        <section >
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
                                <h2 className="text-white py-3">Create A New Account</h2>
                                <Form onSubmit={userSignupFn} className="rounded login-form">
                                    <div id="userError" className="text-danger text-center"></div>
                                    <Form.Group className="mb-3 input">
                                        {/* <Form.Label>User Name <span className="text-danger">*</span></Form.Label> */}
                                        <Form.Control name="name" type="text" placeholder="Full Name" value={userData.name} onChange={onchange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 input">
                                        {/* <Form.Label>User Email <span className="text-danger">*</span></Form.Label> */}
                                        <Form.Control name="email" type="email" placeholder="Email" value={userData.email} onChange={onchange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 input">
                                        {/* <Form.Label>User Number <span className="text-danger">*</span></Form.Label> */}
                                        <Form.Control name="number" type="number" placeholder="Phone Number" value={userData.number} onChange={onchange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 input">
                                        {/* <Form.Label>User Password <span className="text-danger">*</span></Form.Label> */}
                                        <Form.Control name="password" type="password" placeholder="Password" value={userData.password} onChange={onchange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 input">
                                        {/* <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label> */}
                                        <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" value={userData.confirmPassword} onChange={onchange} />
                                    </Form.Group>

                                    <Button as={Link} className="primary-btn mt-4" type="submit" >SIGN UP</Button>

                                </Form>

                            </div>
                        </Col>
                        <Col md={1}>
                            <div style={{ backgroundColor: "var(--border)", height: "100%", width: "1px" }}></div>
                        </Col>
                        <Col md={4}>
                            <h4 className="text-white mt-3">Already Have An Account?</h4>
                            <Button as={Link} to="/signin" className="primary-btn mt-3" type="submit" style={{ fontSize: "19px", fontWeight: "normal" }} >LOGIN NOW</Button>
                        </Col>
                    </Row>
                </Container>
            </section>
            
        </section>
    )
}
