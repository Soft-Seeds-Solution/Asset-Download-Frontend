import { useContext } from "react";
import MembershipContext from "../ContextApi/MembershipContext";
import UserContext from "../ContextApi/UserContext";
import { Col, Container, Row } from "react-bootstrap";

export default function ActiveMembershipPlan() {
    const { allMembers } = useContext(MembershipContext)
    const { signUser } = useContext(UserContext)
    const userMembership = Array.isArray(allMembers)
        ? allMembers.filter(member => member.userId?._id === signUser?._id && member.status === "true")
        : null;

    const localDate = (date) => {
        return new Date(date).toLocaleDateString()
    }
    return (
        <>
            <Container>
                <h3 className="text-center mb-5">Active Membership Plans</h3>
                {userMembership?.map((member, ind) => (
                    <Row key={ind} className="text-white membership-span mb-5">
                        <Col md={2}>
                            <h6>Plan Duration</h6>
                            <span>{member?.planDuration} days</span>
                        </Col>
                        <Col md={3}>
                            <h6>Daily Download Limit</h6>
                            <span>{member?.dailyLimit}</span>
                        </Col>
                        <Col md={2}>
                            <h6>Today Downloads</h6>
                            <span>{member?.todayDownloads}</span>
                        </Col>
                        <Col md={2}>
                            <h6> Amount Paid </h6>
                            <span>{member?.amount} $</span>
                        </Col>
                        <Col md={3}>
                            <h6> Paln Subscription Date </h6>
                            <span>{localDate(member?.createdAt)}</span>
                        </Col>
                    </Row>
                ))}
            </Container >
        </>
    )
}
