import { Table } from "react-bootstrap";
import ProductEditModal from "./ProductEditModal";
import ProdcutViewModal from "./ProdcutViewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ProductContext from "../../ContextApi/ProductContext";
import UserContext from "../../ContextApi/UserContext";

export default function ManagePendingProducts() {
    const { pendingProducts, deleteProduct, productApproveFn, productRejectFn } = useContext(ProductContext)
    const { signUser } = useContext(UserContext)
    const filterProduct = signUser?.role === "Admin" ? pendingProducts : pendingProducts?.filter(product => product.userId?._id === signUser._id)
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Title</th>
                        <th>Accept/Reject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filterProduct?.map((product, ind) => (
                        <tr key={ind}>
                            <td>{product.type}</td>
                            <td>{product.category}</td>
                            <td>{product.subCategory}</td>
                            <td>{product.title}</td>
                            <td>
                                <FontAwesomeIcon className="me-3" icon={faCheck} onClick={() => productApproveFn(product._id)} />
                                <FontAwesomeIcon icon={faClose} onClick={() => productRejectFn(product._id)} />
                            </td>
                            <td>
                                <ProdcutViewModal productId={product._id} />
                                <ProductEditModal productId={product._id} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteProduct(product._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
