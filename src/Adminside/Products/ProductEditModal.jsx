import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ProductContext from "../../ContextApi/ProductContext";
import Swal from "sweetalert2";
import apiUrl from "../../ApiEndpoint";
import categoryContext from "../../ContextApi/CategoryContext";
import SubCategoryContext from "../../ContextApi/SubCategoryCntext";

export default function ProductEditModal({ productId }) {
    const [editProductModal, setEditProductModal] = useState(false);
    const { getProductById, productById, setProductById, allProducts } = useContext(ProductContext)
    const [selectedCat, setSelectedCat] = useState(null)
    const { allCategory } = useContext(categoryContext)
    const { allSubCategory } = useContext(SubCategoryContext)

    const openEditModal = () => {
        setEditProductModal(true)
        getProductById(productId)
    }

    const allCategories = allCategory?.map(cat => (
        { value: cat._id, label: cat.category }
    ))
    const allSubCategories = allSubCategory?.filter(subCat => subCat.categoryId?._id === selectedCat).map(subCat => (
        { value: subCat._id, label: subCat.subCategory }
    ))

    const productFormData = [
        { name: "categoryId", value: productById.categoryId?._id, label: "Category", type: "select", options: [...allCategories] },
        { name: "subCategoryId", value: productById.subCategoryId?._id, label: "Sub Category", type: "select", options: [...allSubCategories] },
        { name: "accessLevel", value: productById.accessLevel, label: "Access Level", type: "radio", options: ["Free", "Premium", "Both"] },
        { name: "title", value: productById.title, label: "Title", type: "text" },
        { name: "description", value: productById.description, label: "Description", type: "textarea" },
        { name: "features", value: productById.features, label: "Features", type: "textarea" },
        { name: "featureImg", label: "Feature Image", value: productById.featureImg, type: "file" },
        { name: "thumbnail", label: "Thumbnail", value: productById.thumbnail, type: "file" },
        { name: "authorName", value: productById.authorName, label: "Author Studio Name", type: "text" },
        { name: "version", value: productById.version, label: "Version", type: "text" },
        { name: "version", value: productById.directUrl, label: "Direct Url", type: "text" },
        { name: "downloadUrl", value: productById.downloadUrl, label: "Download Url", type: "text" },
        { name: "sampleUrl", value: productById.sampleUrl, label: "Sample Url", type: "text" },
    ]

    const updateProductFn = async (e) => {
        e.preventDefault()
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });
        if (isConfirmed) {
            const { type, categoryId, subCategoryId, frameWork, title, featureImg, thumbnail, youtubeLink, googlePlayLink, appStoreLink, singleAppLicense, multiAppLicense, developmentHours, authorName, features, description, accessLevel, version, sampleUrl } = productById
            const formData = new FormData()
            formData.append("type", type)
            formData.append("title", title)
            if (categoryId && typeof categoryId !== "object") formData.append("categoryId", categoryId);
            if (subCategoryId && typeof subCategoryId !== "object") formData.append("subCategoryId", subCategoryId);
            // formData.append("categoryId", categoryId)
            // formData.append("subCategoryId", subCategoryId)
            formData.append("features", features)
            formData.append("frameWork", frameWork)
            formData.append("description", description)
            formData.append("thumbnail", thumbnail)
            formData.append("featureImg", featureImg)
            formData.append("youtubeLink", youtubeLink)
            formData.append("googlePlayLink", googlePlayLink)
            formData.append("appStoreLink", appStoreLink)
            formData.append("version", version)
            formData.append("sampleUrl", sampleUrl)
            formData.append("singleAppLicense", singleAppLicense)
            formData.append("accessLevel", accessLevel)
            formData.append("multiAppLicense", multiAppLicense)
            formData.append("developmentHours", developmentHours)
            formData.append("authorName", authorName)

            const res = await fetch(`${apiUrl}/api/product/editProduct/${productById?._id}`, {
                method: "PUT",
                body: formData
            })

            if (res.ok) {
                allProducts()
                Swal.fire("Saved!", "", "success");
            } else {
                Swal.fire("Error saving changes", "", "error");
            }
        }
    }

    const onchange = (e) => {
        const { name, value, files } = e.target
        name === "categoryId" ? setSelectedCat(value) : ""
        if (files) {
            setProductById({ ...productById, [name]: files[0] })
        } else {
            setProductById({ ...productById, [name]: value })
        }
    }
    const handleQuillChange = (name, html) => {
        setProductById({ ...productById, [name]: html })
    }

    useEffect(() => {
        if (productById?.categoryId?._id) {
            setSelectedCat(productById.categoryId._id);
        }
    }, [productById]);

    return (
        <>
            <FontAwesomeIcon icon={faEdit} className="me-3" onClick={() => openEditModal()} />
            <Modal
                size="lg"
                show={editProductModal}
                onHide={() => setEditProductModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateProductFn}>
                        {productFormData?.map((data, index) => (
                            <Form.Group key={index} className='mb-3'>
                                <Form.Label style={{ fontWeight: "Bold", fontSize: "20px" }}>{data.label} </Form.Label>
                                {data.type === "select" ? (
                                    <Form.Control as="select" name={data.name} value={data.value} onChange={onchange}>
                                        <option value="" style={{ color: "initial" }}>Select {data.label}</option>
                                        {data.options?.map((option, index) => (
                                            <option key={index} value={option.value} style={{ color: "initial" }}>{option.label}</option>
                                        ))}
                                    </Form.Control>
                                ) : data.type === "radio" ? (
                                    <Row className='g-3'>
                                        {data.options.map((option, index) => (
                                            <Col md={2} key={index}>
                                                <Form.Check
                                                    type="radio"
                                                    name={data.name}
                                                    label={option}
                                                    value={option}
                                                    checked={productById[data.name] === option}
                                                    onChange={onchange}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                ) : data.type === "textarea" ? (
                                    <ReactQuill
                                        className="mb-3"
                                        theme="snow"
                                        name={data.name}
                                        value={data.value}
                                        onChange={(html) => handleQuillChange(data.name, html)}
                                    />
                                ) : data.type === "file" ? (
                                    <div>
                                        <Image className="mb-3" src={data.value} style={{ width: "70px", height: "70px" }} />
                                        <Form.Control name={data.name} type={data.type} onChange={onchange} multiple={data.name === "screenshots"} />
                                    </div>
                                ) : (
                                    <Form.Control type={data.type} name={data.name} value={data.value} onChange={onchange} />
                                )}
                            </Form.Group>
                        ))}
                        <div className="d-flex justify-content-center">
                            <Button type='submit' className='mt-3'>Update Product</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
