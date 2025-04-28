import { Container, Image, Row, Table } from "react-bootstrap";
import ProductEditModal from "./ProductEditModal";
import ProdcutViewModal from "./ProdcutViewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ProductContext from "../../ContextApi/ProductContext";
import UserContext from "../../ContextApi/UserContext";

export default function ManageProducts() {
    const { products, deleteProduct } = useContext(ProductContext)
    const { signUser } = useContext(UserContext)
    const filterProduct = signUser?.role === "Admin" ? products : products?.filter(product => product.userId?._id === signUser?._id)
    return (
        <>
            <Container>
                <Row>
                    <h3 className="mb-4">Uploaded Products</h3>
                    {filterProduct?.map((product, ind) => (
                        <div style={{ backgroundColor: "var(--dark)", borderRadius: "10px" }} className="d-flex justify-content-between align-items-center px-3 py-2 mb-3" key={ind}>
                            <div className="d-flex">
                                <Image className="me-3" src={product.thumbnail} style={{ width: "40px", height: "40px", borderRadius: "5px" }} />
                                <div>
                                    <p>{product.title}</p>
                                    <p style={{ color: "var(--border)" }}>Category : {product.categoryId?.category}</p>
                                </div>
                            </div>
                            <div>
                                <ProdcutViewModal productId={product._id} />
                                <ProductEditModal productId={product._id} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteProduct(product._id)} />
                            </div>
                        </div>
                    ))}
                </Row>
            </Container>
        </>
    )
}