import { useContext } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import ProductContext from "../../ContextApi/ProductContext";
import { Link } from "react-router-dom";

export default function Categories() {
    const { products } = useContext(ProductContext);

    // Extract unique categories from products
    const categories = products?.map(product => product.categoryId);
    const uniqueCategories = Array.from(new Set(categories.map(JSON.stringify))).map(item => JSON.parse(item));
    return (
        <>
            <Container className="mb-4">
                <div style={{ backgroundColor: "var(--light-color)" }}>
                    <hr />
                </div>
                <Row>
                    {uniqueCategories?.map((cat, ind) => (
                        <Col md={2} key={ind} className="text-white">
                            <Link to={`/${cat.category.replace(/\s+/g, "-")}`}>
                                <div className="d-flex justify-content-center ">
                                    <div className="mb-3" style={{ backgroundColor: "var(--light-bg)", width: "35%", borderRadius: "50px" }}>
                                        <Image fluid src={cat.logo} className="p-2" />
                                    </div>
                                </div>
                                <h6 className="text-center">{cat.category}</h6>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <div style={{ backgroundColor: "var(--light-color)" }}>
                    <hr />
                </div>
            </Container>
        </>
    )
}
