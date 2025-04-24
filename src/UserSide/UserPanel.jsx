import {
    Button,
    Col,
    Container,
    Accordion,
    Row,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function UserPanel() {
    const adminBar = [
        {
            path: "membership-plans",
            title: "Membership Plans",
            type: "adminLinks",
            icon: faListCheck,
        },
        {
            path: "active-membership-plan",
            title: "Active Membership Plan",
            type: "adminLinks",
            icon: faListCheck,
        },
    ];

    return (
        <>
            <Container fluid>
                <Row className="admin-links">
                    <Col md={3} style={{ backgroundColor: "var(--light-color)", minHeight: "100vh" }} className="py-4">
                        {adminBar &&
                            adminBar.map((admin, index) => {
                                return (
                                    <div key={index} className="admin-sidebar">
                                        <Button className="mb-4 primary-btn text-center w-100" as={Link} to={admin.path} style={{ borderRadius: "15px" }}>
                                            <h6 className="py-1 text-white">{admin.title}</h6>
                                        </Button>
                                    </div>
                                );
                            })}
                    </Col>
                    <Col md={9} >
                        <div className="p-4">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}