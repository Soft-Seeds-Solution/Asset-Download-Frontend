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

export default function AdminPanel() {
    const adminBar = [
        {
            path: "manage-category",
            title: "Manage Category",
            type: "adminLinks",
            icon: faListCheck,
        },
        {
            path: "manage-sub-category",
            title: "Manage Sub Category",
            type: "adminLinks",
            icon: faListCheck,
        },
        {
            path: "upload-product",
            title: "Upload Product",
            type: "adminLinks",
            icon: faListCheck,
        },
        {
            path: "manage-products",
            title: "Manage Products",
            type: "adminLinks",
            icon: faListCheck,
        },
    ];

    return (
        <>
            <Container fluid>
                <Row className="admin-links">
                    <Col md={3} style={{ backgroundColor: "var(--light-color)", minHeight: "100vh", border: "1px solid var(--border)", borderRadius: "15px" }} className="py-4">
                        {adminBar &&
                            adminBar.map((admin, index) => {
                                return (
                                    <div key={index} className="admin-sidebar">
                                        <Button className="mb-4 admin-btn text-center w-100" as={Link} to={admin.path} style={{ backgroundColor: "var(--light-uper-color)", borderRadius: "15px" }}>
                                            <h6 className="py-1 text-dark">{admin.title}</h6>
                                        </Button>
                                    </div>
                                );
                            })}
                    </Col>
                    <Col md={9} >
                        <div style={{ backgroundColor: "var(--light-color)", border: "1px solid var(--border)", borderRadius: "15px", minHeight: "100vh" }} className="p-4">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
