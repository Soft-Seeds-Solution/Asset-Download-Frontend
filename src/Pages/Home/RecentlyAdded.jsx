import { useContext } from "react"
import ProductContext from "../../ContextApi/ProductContext"
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function RecentlyAdded() {
    const { products, productViewsFn } = useContext(ProductContext)
    return (
        <>
            <Container className="mb-4">
                <Row>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h3>RECENTLY ADDED</h3>
                        <Button as={Link} to="all/recently-added" className="primary-btn">View All</Button >
                    </div>
                    {products?.map((product, ind) => (
                        <Col md={3} key={ind}>
                            <Link to={`/detail-page/${product.title.replace(/\s+/g, "-")}`}>
                                <Card style={{ border: "1px solid white", borderRadius: "10px", backgroundColor: "var(--light-bg)" }} onClick={() => productViewsFn(product._id)}>
                                    <Image src={product.thumbnail} style={{ height: "250px", borderRadius: "10px" }} />
                                    <div>
                                        <h6 className="text-white p-3">{product.title?.length > 28 ? product.title.slice(0, 28) + "..." : product.title}</h6>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}
