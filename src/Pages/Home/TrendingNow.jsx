import { useContext } from "react"
import ProductContext from "../../ContextApi/ProductContext"
import { Card, Col, Container, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function TrendingNow() {
    const { products, productViewsFn } = useContext(ProductContext)
    return (
        <>
            <Container className="mb-4">
                <Row>
                    <h3>TRENDING NOW</h3>
                    {[...products]?.reverse().map((product, ind) => (

                        <Col md={3} key={ind}>
                            <Link to={`/detail-page/${product.title.replace(/\s+/g, "-")}`}>
                                <Card style={{ border: "1px solid white", borderRadius: "10px" }} onClick={() => productViewsFn(product._id)}>
                                    <Image src={product.featureImg} style={{ height: "370px", borderRadius: "10px" }} />
                                    {/* <div className="p-4">
                                    <h6>{product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}</h6>
                                </div> */}
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}
