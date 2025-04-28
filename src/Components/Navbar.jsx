import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SubCategoryContext from "../ContextApi/SubCategoryCntext";
import ProductContext from "../ContextApi/ProductContext";
import UserContext from "../ContextApi/UserContext";
import UserImg from "../assets/user-logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MainNavbar = () => {
    const [hoveredCat, setHoveredCat] = useState(null);
    const { allSubCategory } = useContext(SubCategoryContext);
    const { products } = useContext(ProductContext);
    const { signUser, setSignUser } = useContext(UserContext)
    const navigate = useNavigate()
    // Extract unique categories from products
    const categories = products?.map(product => product.categoryId);
    const uniqueCategories = Array.from(new Set(categories.map(JSON.stringify))).map(item => JSON.parse(item));

    const signUserPanelLinks = (() => {
        if (signUser && signUser.role === "User") {
            return [
                { path: "/userPanel/membership-plans", text: "Membership Plans" },
                { path: "/userPanel/active-membership-plan", text: "Active Membership Plan" }
            ];
        } else {
            return [
                { path: "/adminPanel/manage-category", text: "Manage Category" },
                { path: "/adminPanel/manage-sub-category", text: "Manage Sub Category" },
                { path: "/adminPanel/upload-product", text: "Upload Product" },
                { path: "/adminPanel/manage-products", text: "Manage Products" },
            ];
        }
    })();

    const logOutButton = () => {
        sessionStorage.removeItem("userData");
        setSignUser("");
        navigate("/");
    };

    return (
        <Navbar style={{ backgroundColor: "var(--light-color)" }} variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">LOGO</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto position-relative">
                        <Nav.Link as={Link} to="/" className="text-white me-3">
                            <FontAwesomeIcon icon={faHome} style={{ color: "var(--body-color)" }} />  Home
                        </Nav.Link>
                        <NavDropdown title="Categories" id="categories-nav-dropdown" >
                            {uniqueCategories?.map((cat) => (
                                <div
                                    key={cat._id}
                                    className="nav-link position-relative"
                                    onMouseEnter={() => setHoveredCat(cat._id)}
                                    onMouseLeave={() => setHoveredCat(null)}
                                    style={{ backgroundColor: "var(--light-color)" }}
                                >
                                    <NavDropdown.Item
                                        className="position-relative"
                                        as={Link}
                                        to={`/${cat.category.replace(/\s+/g, "-")}`}
                                        style={{ backgroundColor: "var(--dark-color)", borderRadius: "10px", color: "white" }}
                                    >
                                        {cat.category}
                                    </NavDropdown.Item>

                                    {hoveredCat === cat._id && (
                                        <div
                                            className="position-absolute"
                                            style={{
                                                top: 0,
                                                left: "100%",
                                                zIndex: 1000,
                                                minWidth: "200px",
                                                padding: "0.5rem 1rem",
                                                whiteSpace: "nowrap",
                                                backgroundColor: "var(--light-color)",
                                                border: "1px solid white",
                                                borderRadius: "10px"
                                            }}
                                        >
                                            {allSubCategory
                                                ?.filter(sub => sub.categoryId?._id === hoveredCat)
                                                ?.map(sub => (
                                                    <div key={sub._id}>
                                                        <Nav.Link as={Link} to={`/${cat.category.replace(/\s+/g, "-")}/${sub.subCategory.replace(/\s+/g, "-")}`} className="text-white mb-2"
                                                            style={{ backgroundColor: "var(--dark-color)", borderRadius: "10px", color: "white" }}
                                                        >
                                                            {sub.subCategory}
                                                        </Nav.Link>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                        </NavDropdown>
                        <Nav.Link as={Link} to="/about" className="text-white me-3">
                            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "var(--body-color)" }} /> About
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="text-white me-3">
                            <FontAwesomeIcon icon={faEnvelope} style={{ color: "var(--body-color)" }} /> Contact
                        </Nav.Link>
                    </Nav>
                    {!signUser?.role && (
                        <div className="d-flex align-items-center">
                            <p className="me-2" style={{ fontSize: "18px", color: "white" }}><Link to="/signin">Login</Link> / <Link to="/signup">Sign Up</Link></p>
                            <img
                                src={UserImg}
                                alt=""
                                className="img-fluid me-2"
                                style={{ width: "30px" }}
                            />
                        </div>
                    )}
                    {signUser && (
                        <DropdownButton
                            id="dropdown-basic-button"
                            className="user-drop"
                            align="start"
                            title={signUser && signUser.name.slice(0, 10)}
                            style={{ backgroundColor: "transparent" }}
                        >
                            {signUserPanelLinks.map((panelLinks, index) => (
                                <Dropdown.Item className="mb-2" key={index} as={Link} to={panelLinks.path}>
                                    <span className="text-dark p-1" style={{ border: "1px solid var(--primary-color)", borderRadius: "10px" }}> {panelLinks.text}</span>
                                </Dropdown.Item>
                            ))}
                            <Dropdown.Item className="primary-btn text-center" onClick={logOutButton}>Logout</Dropdown.Item>
                        </DropdownButton>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNavbar;
