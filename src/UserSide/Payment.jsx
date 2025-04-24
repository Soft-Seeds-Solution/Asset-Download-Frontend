import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap";
import card1 from "../assets/card1.png"
import card2 from "../assets/card2.png"
import card3 from "../assets/card3.png"
import card4 from "../assets/card4.png"
import card5 from "../assets/card5.png"
import card6 from "../assets/card6.png"
import card7 from "../assets/card7.png"
import apiUrl from "../ApiEndpoint";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useState } from "react";
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import MembershipContext from "../ContextApi/MembershipContext";
import UserContext from "../ContextApi/UserContext";
import Swal from "sweetalert2";
const stripePromise = loadStripe("pk_test_51R6mLWE4Yns2ZvXWXgboy7Lcm2chD11JjWAbDQPzDj787lyarUTFOYjPfRkHztDNLRj3TcTHIKimw8K3KHNJI5St00ziBvfECd");

function Payment() {
    const [loading, setLoading] = useState(false);
    const { planAmount, setPlanAmount, dailyLimit, setDailyLimit, planDuration, setPlanDuration, planTitle, setPlanTitle, allMembersFn } = useContext(MembershipContext)
    const { signUser } = useContext(UserContext)
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()
        if (!stripe || !elements) return;

        try {
            const response = await fetch(`${apiUrl}/api/payment/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Math.round(planAmount * 100), currency: "usd" })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const { clientSecret } = await response.json();
            if (!clientSecret) {
                throw new Error("Client secret is missing from response");
            }

            const paymentMethod = {
                card: elements.getElement(CardNumberElement),
            };

            const result = await stripe.confirmCardPayment(clientSecret, { payment_method: paymentMethod });

            if (result.error) {
                Swal.fire({
                    position: "center",
                    icon: "danger",
                    title: "Payment failed: " + result.error.message,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You Successfully Activate Memberhip Plan",
                    showConfirmButton: true,
                });
                setPlanAmount("")
                setPlanDuration("")
                setDailyLimit("")
                setPlanTitle("")
                allMembersFn()
                await fetch(`${apiUrl}/api/subscribe/membership`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: signUser?._id,
                        amount: planAmount,
                        planDuration,
                        dailyLimit,
                        planTitle,
                        status: true
                    })
                });
            }
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed, please try again.");
        }

        setLoading(false);
    };
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col md={3}><Image fluid src={card1} /></Col>
                <Col md={2}><Image fluid src={card2} /></Col>
                <Col md={3}><Image fluid src={card3} /></Col>
                <Col md={3}><Image fluid src={card4} className="p-1" style={{ backgroundColor: "white" }} /></Col>
                <Col md={3}><Image fluid src={card5} className="p-1" style={{ backgroundColor: "white" }} /></Col>
                <Col md={2}><Image fluid src={card6} /></Col>
                <Col md={2}><Image fluid src={card7} /></Col>
            </Row>
            <Form className="rounded text-white signup-form" onSubmit={handleSubmit}>
                <div id="userError" className="text-danger text-center"></div>

                <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <div className="p-2" style={{ border: "1px solid var(--border)", borderRadius: "15px" }}><CardNumberElement className="p-2 w-100" options={{ style: { base: { color: "white" } } }} /></div>
                </Form.Group>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Expiry Date</Form.Label>
                            <div className="p-2" style={{ border: "1px solid var(--border)", borderRadius: "15px" }}><CardExpiryElement className="p-2 w-100" options={{ style: { base: { color: "white" } } }} /></div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter CVC</Form.Label>
                            <div className="p-2" style={{ border: "1px solid var(--border)", borderRadius: "15px" }}><CardCvcElement className="p-2 w-100" options={{ style: { base: { color: "white" } } }} /></div>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-center mt-3">
                    <Button type="submit" disabled={!stripe || loading} className="primary-btn px-5 mt-3">
                        {loading ? <Spinner as="span" animation="border" size="sm" /> : "Pay"}
                    </Button>
                </div>
            </Form>
        </>
    )
}

const StripePayment = () => (
    <div>
        <Elements stripe={stripePromise}>
            <Payment />
        </Elements>
    </div>
);
export default StripePayment;