import React, { useContext, useState } from "react";
import { Card, Button, Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import UserContext from "../ContextApi/UserContext";
import MembershipContext from "../ContextApi/MembershipContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MembershipPlans = () => {
    const [planType, setPlanType] = useState("monthly");
    const { signUser } = useContext(UserContext)
    const { allMembers, setPlanAmount, setDailyLimit, setPlanDuration, setPlanTitle } = useContext(MembershipContext)
    const navigate = useNavigate()

    const handleChange = (val) => setPlanType(val);

    const plans = {
        monthly: [
            {
                title: "30 DAYS - BASIC",
                price: "5.99",
                dailyLimit: 2,
                planDuration: 30,
                features: [
                    "2 Assets per Day",
                    "Up to 60 assets",
                    "Direct Downloads",
                    "No Waiting Time",
                    "No ADS",
                ],
            },
            {
                title: "30 DAYS - PRO",
                price: "9.99",
                dailyLimit: 4,
                planDuration: 30,
                features: [
                    "4 Assets per Day",
                    "Up to 120 assets",
                    "Direct Downloads",
                    "No Waiting Time",
                    "No ADS",
                ],
            },
            {
                title: "30 DAYS - VIP",
                price: "12.99",
                dailyLimit: 7,
                planDuration: 30,
                features: [
                    "7 Assets per Day",
                    "Up to 150 assets",
                    "Direct Downloads",
                    "No Additional Download Costs",
                    "No Waiting Time",
                    "NO ADS",
                ],
            },
        ],
        yearly: [
            {
                title: "1 YEAR - BASIC",
                price: "49.99",
                dailyLimit: 2,
                planDuration: 365,
                features: [
                    "2 Assets per Day",
                    "Up to 700 assets/year",
                    "Direct Downloads",
                    "No Waiting Time",
                    "No ADS",
                ],
            },
            {
                title: "1 YEAR - PRO",
                price: "79.99",
                dailyLimit: 4,
                planDuration: 365,
                features: [
                    "4 Assets per Day",
                    "Up to 1400 assets/year",
                    "Direct Downloads",
                    "No Waiting Time",
                    "No ADS",
                ],
            },
            {
                title: "1 YEAR - VIP",
                price: "125.99",
                dailyLimit: 7,
                planDuration: 365,
                features: [
                    "7 Assets per Day",
                    "Up to 2555 assets/year",
                    "Direct Downloads",
                    "No Waiting Time",
                    "No ADS",
                ],
            },
        ],
    };

    const openModalShowPayment = (amount, planDuration, dailyLimit, title) => {
        const userMembership = Array.isArray(allMembers)
            ? allMembers.find(member => member.userId?._id === signUser?._id && member.status === "true" && member.planTitle === title)
            : null;
        if (userMembership) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You Already Activate This Plan",
                showConfirmButton: true,
            });
            return;
        }
        setPlanAmount(amount)
        setPlanDuration(planDuration)
        setDailyLimit(dailyLimit)
        setPlanTitle(title)
        navigate("/userPanel/payment")
    }

    return (
        <div className="container my-5">
            <h2 className="text-center text-white mb-4">Choose Your Membership</h2>

            <div className="text-center mb-4">
                <ToggleButtonGroup
                    type="radio"
                    name="planType"
                    value={planType}
                    onChange={handleChange}
                >
                    <ToggleButton id="monthly" value="monthly" className={planType === "monthly" ? "primary-btn" : "primary-btn-outline"}>
                        Monthly
                    </ToggleButton>
                    <ToggleButton id="yearly" value="yearly" className={planType === "yearly" ? "primary-btn" : "primary-btn-outline"}>
                        Yearly
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <Row className="g-4 justify-content-center">
                {plans[planType].map((plan, index) => (
                    <Col key={index} md={6} lg={4}>
                        <Card style={{ backgroundColor: "var(--light-bg)", border: "1px solid var(--border)" }} className="text-center text-white shadow-sm h-100">
                            <Card.Header className="primary-btn">{plan.title}</Card.Header>
                            <Card.Body>
                                <Card.Title>$ {plan.price}</Card.Title>
                                <ul className="list-unstyled text-start">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>✅ {feature}</li>
                                    ))}
                                </ul>
                                <Button className="primary-btn" onClick={() => openModalShowPayment(plan.price, plan.planDuration, plan.dailyLimit, plan.title)}>Select Plan</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}

            </Row>

            {/* payment modal */}

        </div >
    );
};

export default MembershipPlans;
