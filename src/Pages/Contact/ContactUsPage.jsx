import { Button, Col, Container, Form, Row } from "react-bootstrap";
import emailjs from "@emailjs/browser"
import { useState } from "react";
import Swal from "sweetalert2";

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        companyName: "",
        message: ""
    })
    const [errorMessage, setErrorMessage] = useState("")

    const sendEmail = (e) => {
        e.preventDefault()
        const { name, email, companyName, message } = formData

        if (!name || !email || !companyName || !message) {
            setErrorMessage("Field with * should be filled")
            return null;
        }
        setErrorMessage("")
        emailjs.send("service_x3zug9a", "template_m05fwfs", formData, "BMWnnRIrv3qh2w5AZ")
            .then(res => {
                setFormData({
                    name: "",
                    email: "",
                    companyName: "",
                    message: ""
                })
                console.log(res);
                Swal.fire({
                    title: "Success",
                    text: "Your message has been sent successfully",
                    icon: "success",
                    confirmButtonText: "Ok"
                }
                )
            })
            .catch(err => console.log(err))
    }

    const onchangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div className="py-5">
            <section>
                <Container>
                    <Row className="justify-content-center pt-4">
                        <h1 style={{ fontSize: "105px" }} className="text-center text-white"><span style={{ color: "var(--border)" }}>Say Hi!</span> and Get in touch with us.</h1>
                        <Col md={8} className="pt-5">
                            <div >
                                <Form className="p-4 text-white rounded contact-form" onSubmit={sendEmail}>
                                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                                                <Form.Control className="input" name="name" value={formData.name} onChange={onchangeHandler} type="text" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                                <Form.Control className="input" name="email" value={formData.email} onChange={onchangeHandler} type="email" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Company Name <span className="text-danger">*</span></Form.Label>
                                        <Form.Control className="input" name="companyName" value={formData.companyName} onChange={onchangeHandler} type="text" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Additional Detail <span className="text-danger">*</span></Form.Label>
                                        <Form.Control className="input" name="message" value={formData.message} onChange={onchangeHandler} as="textarea" rows="7" />
                                    </Form.Group>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button className="dark-btn" type="submit" style={{ width: "100%", fontSize: "19px", fontWeight: "normal" }} >Submit</Button>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div >
    )
}
