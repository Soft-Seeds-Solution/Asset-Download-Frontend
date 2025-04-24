import React, { useContext } from 'react'
import ProductContext from '../../ContextApi/ProductContext'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

export default function SubCategorySpecificProducts() {
    const { products, productViewsFn } = useContext(ProductContext)
    const { subCategory } = useParams()
    const productSubCategory = subCategory?.replace(/-/g, " ")
    return (
        <>
            <Container>
                <Row>
                    <h4 className='py-3' style={{ color: "white", opacity: ".7" }} >Sub Category : {subCategory}</h4>
                    {products?.filter(product => product.subCategoryId?.subCategory === productSubCategory).map((product, ind) => (
                        <Col md={3} key={ind}>
                            <Link to={`/detail-page/${product.title.replace(/\s+/g, "-")}`}>
                                <Card onClick={() => productViewsFn(product._id)}>
                                    <Image src={product.featureImg} style={{ height: "200px" }} />
                                    <div className="p-4">
                                        <h6>{product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}</h6>
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
