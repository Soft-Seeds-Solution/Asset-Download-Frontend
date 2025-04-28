import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Col, Form, Image, Modal, Row } from "react-bootstrap";
import ProductContext from "../../ContextApi/ProductContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ProdcutViewModal({ productId }) {
    const [viewProductModal, setViewProductModal] = useState(false);
    const { getProductById, productById } = useContext(ProductContext)
    const openViewModal = () => {
        setViewProductModal(true)
        getProductById(productId)
    }

    const productFormData = [
        { name: "categoryId", value: productById.categoryId?.category, label: "Category", type: "select", star: "*" },
        { name: "subCategoryId", value: productById.subCategoryId?.subCategory, label: "Sub Category", type: "select", star: "*" },
        { name: "title", value: productById.title, label: "Title", type: "text", star: "*" },
        { name: "description", value: productById.description, label: "Description", type: "textarea", star: "*" },
        { name: "features", value: productById.features, label: "Features", type: "textarea", star: "*" },
        { name: "featureImg", label: "Feature Image", value: productById.featureImg, type: "file", star: "*" },
        { name: "screenshots", label: "Screenshots", value: productById.screenshots, type: "file", star: "*" },
        { name: "authorName", value: productById.authorName, label: "Author Studio Name", type: "text", star: "*" },
    ]
    return (
        <>
            <FontAwesomeIcon icon={faEye} className="me-3" onClick={() => openViewModal()} />
            <Modal
                size="lg"
                show={viewProductModal}
                onHide={() => setViewProductModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productFormData?.map((data, index) => (
                        <Form.Group key={index} className='mb-3'>
                            <Form.Label style={{ fontWeight: "Bold", fontSize: "20px" }}>{data.label}</Form.Label>
                            {data.type === "select" ? (
                                <Form.Control type={data.type} name={data.name} value={data.value} readOnly />
                            ) : data.type === "radio" ? (
                                <Form.Check
                                    type="radio"
                                    name={data.name}
                                    label={data.value}
                                    value={data.value}
                                    checked
                                    readOnly />
                            ) : data.type === "textarea" ? (
                                <ReactQuill
                                    className="mb-3"
                                    theme="snow"
                                    name={data.name}
                                    value={data.value} />
                            ) : data.type === "file" ? (
                                data.name === "screenshots" ? data.value?.map((screenshot, ind) => (
                                    <Image className="me-3" key={ind} src={screenshot} style={{ width: "100px", height: "100px" }} readOnly />
                                )) : (
                                    <Image src={data.value} style={{ width: "100px", height: "100px" }} readOnly />
                                )
                            ) : (
                                <Form.Control type={data.type} name={data.name} value={data.value} readOnly />
                            )}
                        </Form.Group>
                    ))}
                    <h4 className='mt-4'>Versions</h4>
                    {productById.versions?.map((ver, idx) => (
                        <Row key={idx} className="g-3 align-items-end">
                            <Col md={3}>
                                <Form.Label>Version</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="version"
                                    value={ver.version}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Direct URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="directUrl"
                                    value={ver.directUrl}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Download URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="downloadUrl"
                                    value={ver.downloadUrl}
                                />
                            </Col>
                        </Row>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    )
}
