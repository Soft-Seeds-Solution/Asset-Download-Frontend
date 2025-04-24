import { useContext, useState } from 'react'
import { Container, Row, Form, Button, Col } from 'react-bootstrap'
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiUrl from '../../ApiEndpoint';
import UserContext from '../../ContextApi/UserContext';
import ProductContext from '../../ContextApi/ProductContext';
import categoryContext from '../../ContextApi/CategoryContext';
import SubCategoryContext from '../../ContextApi/SubCategoryCntext';

function UploadProduct() {
    const { signUser } = useContext(UserContext)
    const { allProducts } = useContext(ProductContext)
    const { allCategory } = useContext(categoryContext)
    const { allSubCategory } = useContext(SubCategoryContext)
    const [selectedCat, setSelectedCat] = useState("")
    const [product, setProduct] = useState({
        categoryId: "",
        subCategoryId: "",
        title: "",
        featureImg: null,
        sourceCode: null,
        screenshots: [],
        userId: "",
        authorName: "",
        directUrl: "",
        downloadUrl: "",
        accessLevel: "",
        version: ""
    })
    const [quillData, setQuillData] = useState({
        description: "",
        features: "",
    })

    const allCategories = allCategory?.map(cat => (
        { value: cat._id, label: cat.category }
    ))
    const allSubCategories = allSubCategory?.filter(subCat => subCat.categoryId?._id === selectedCat).map(subCat => (
        { value: subCat._id, label: subCat.subCategory }
    ))

    const productFormData = [
        { name: "categoryId", value: product.categoryId, label: "Category", type: "select", options: [...allCategories], star: "*" },
        { name: "subCategoryId", value: product.subCategoryId, label: "Sub Category", type: "select", options: [...allSubCategories], star: "*" },
        { name: "accessLevel", value: product.accessLevel, label: "Access Level", type: "radio", options: ["Free", "Premium", "Both"], star: "*" },
        { name: "title", value: product.title, label: "Title", type: "text", star: "*" },
        { name: "description", value: quillData.description, label: "Description", type: "textarea", star: "*" },
        { name: "features", value: quillData.features, label: "Features", type: "textarea", star: "*" },
        { name: "featureImg", label: "Feature Image", type: "file", star: "*" },
        { name: "screenshots", label: "Screenshots", type: "file" },
        { name: "authorName", value: product.authorName, label: "Author Studio Name", type: "text", star: "*" },
        { name: "version", value: product.version, label: "Version", type: "text" },
        { name: "directUrl", value: product.directUrl, label: "Direct Url", type: "text" },
        { name: "downloadUrl", value: product.downloadUrl, label: "Download Url", type: "text" },
    ]

    const uploadProductFn = async (e) => {
        e.preventDefault()

        const { categoryId, subCategoryId, title, featureImg, screenshots, authorName, directUrl, downloadUrl, accessLevel, version } = product
        const { features, description } = quillData
        const formData = new FormData()
        formData.append("title", title)
        formData.append("userId", signUser?._id)
        formData.append("status", signUser?.role === "Admin" ? "Approved" : "Pending")
        formData.append("categoryId", categoryId)
        formData.append("subCategoryId", subCategoryId)
        formData.append("features", features)
        formData.append("description", description)
        formData.append("featureImg", featureImg)
        formData.append("authorName", authorName)
        formData.append("directUrl", directUrl)
        formData.append("version", version)
        formData.append("accessLevel", accessLevel)
        formData.append("downloadUrl", downloadUrl)
        screenshots?.forEach(file => formData.append("screenshots", file))

        const res = await fetch(`${apiUrl}/api/product/uploadProduct`, {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        const productDataError = document.getElementById("productDataError")
        data.message !== undefined ? productDataError.innerText = data.message : productDataError.innerText = ""

        if (res.ok) {
            allProducts()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Product uploaded successfully!",
                showConfirmButton: true,
            });
            setProduct({
                categoryId: "",
                subCategoryId: "",
                title: "",
                featureImg: null,
                screenshots: [],
                authorName: "",
                directUrl: "",
                downloadUrl: "",
                accessLevel: "",
                version: ""
            })

            setQuillData({
                description: "",
                features: "",
            })
        }
    }

    const onchange = (e) => {
        const { name, value, files, type } = e.target;
        name === "categoryId" ? setSelectedCat(value) : ""

        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === "file"
                ? (name === "screenshots" ? Array.from(files) : files[0])
                : value
        }));
    };

    const handleQuillChange = (name, html) => {
        setQuillData((prevProduct) => ({
            ...prevProduct,
            [name]: html
        }));
    };

    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <div id="productDataError" className='text-danger'></div>
                        <Form onSubmit={uploadProductFn} className='upload-form'>
                            {productFormData?.map((data, index) => (
                                <Form.Group key={index} className='mb-3'>
                                    <Form.Label style={{ fontWeight: "Bold", fontSize: "20px" }}>{data.label} <span className="text-danger">{data.star}</span> </Form.Label>
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
                                                        checked={product[data.name] === option}
                                                        onChange={onchange}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : data.type === "textarea" ? (
                                        <ReactQuill
                                            className="mb-3 custom-quill"
                                            theme="snow"
                                            name={data.name}
                                            value={data.value}
                                            onChange={(html) => handleQuillChange(data.name, html)}
                                        />
                                    ) : data.type === "file" ? (
                                        <Form.Control name={data.name} type={data.type} onChange={onchange} multiple={data.name === "screenshots"} />
                                    ) : (
                                        <Form.Control type={data.type} name={data.name} value={data.value} onChange={onchange} />
                                    )}
                                </Form.Group>
                            ))}

                            <div className="d-flex justify-content-center">
                                <Button type='submit'>Upload</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UploadProduct;