import { useContext } from "react";
import ProductContext from "../../ContextApi/ProductContext";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function PortfolioProducts() {
    const { products, productViewsFn } = useContext(ProductContext)
    const { portfolio } = useParams()
    const changeTitle = portfolio?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    const PortfolioName = portfolio?.replace(/-/g, " ")
    const listingPoducts = products?.filter(product => product.authorName === PortfolioName)

    return (
        <div className="py-4">

            {/* search end */}
            {listingPoducts && (
                <section>
                    <Container>
                        <Row className="g-4">
                            <h4 style={{ color: "white", opacity: ".7" }} >{changeTitle}</h4>
                            {listingPoducts?.map((product, ind) => (
                                <Col md={3} key={ind}>
                                    <Link to={`/detail-page/${product.title.replace(/\s+/g, "-")}`}>
                                        <Card style={{ border: "1px solid white", borderRadius: "10px" }} onClick={() => productViewsFn(product._id)}>
                                            <Image src={product.featureImg} style={{ height: "370px", borderRadius: "10px" }} />
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            )}
        </div>
    )
}