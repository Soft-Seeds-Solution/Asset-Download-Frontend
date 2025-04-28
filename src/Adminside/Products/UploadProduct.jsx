import { useContext, useState } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiUrl from '../../ApiEndpoint';
import UserContext from '../../ContextApi/UserContext';
import ProductContext from '../../ContextApi/ProductContext';
import categoryContext from '../../ContextApi/CategoryContext';
import SubCategoryContext from '../../ContextApi/SubCategoryCntext';

function UploadProduct() {
    const { signUser } = useContext(UserContext);
    const { allProducts } = useContext(ProductContext);
    const { allCategory } = useContext(categoryContext);
    const { allSubCategory } = useContext(SubCategoryContext);

    const [selectedCat, setSelectedCat] = useState("");

    const [product, setProduct] = useState({
        categoryId: "",
        subCategoryId: "",
        title: "",
        featureImg: null,
        thumbnail: null,
        screenshots: [],
        userId: "",
        authorName: "",
        sampleUrl: ""
    });

    const [quillData, setQuillData] = useState({
        description: "",
        features: ""
    });

    const [versions, setVersions] = useState([
        { version: '', directUrl: '', downloadUrl: '' }
    ]);

    const allCategories = allCategory?.map(cat => ({
        value: cat._id, label: cat.category
    }));

    const allSubCategories = allSubCategory?.filter(
        subCat => subCat.categoryId?._id === selectedCat
    ).map(subCat => ({
        value: subCat._id, label: subCat.subCategory
    }));

    const productFormData = [
        { name: "categoryId", value: product.categoryId, label: "Category", type: "select", options: allCategories, star: "*" },
        { name: "subCategoryId", value: product.subCategoryId, label: "Sub Category", type: "select", options: allSubCategories, star: "*" },
        // { name: "accessLevel", value: product.accessLevel, label: "Access Level", type: "radio", options: ["Free", "Premium", "Both"], star: "*" },
        { name: "title", value: product.title, label: "Title", type: "text", star: "*" },
        { name: "description", value: quillData.description, label: "Description", type: "textarea", star: "*" },
        { name: "features", value: quillData.features, label: "Features", type: "textarea", star: "*" },
        { name: "featureImg", label: "Feature Image", type: "file", star: "*" },
        { name: "thumbnail", label: "Thumbnail", type: "file", star: "*" },
        { name: "screenshots", label: "Screenshots", type: "file" },
        { name: "authorName", value: product.authorName, label: "Author Studio Name", type: "text", star: "*" },
        { name: "sampleUrl", value: product.sampleUrl, label: "Sample Url", type: "text" }
    ];

    const uploadProductFn = async (e) => {
        e.preventDefault();

        const {
            categoryId, subCategoryId, title, thumbnail,
            featureImg, screenshots, authorName,
            sampleUrl
        } = product;
        const { features, description } = quillData;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("userId", signUser?._id);
        formData.append("categoryId", categoryId);
        formData.append("subCategoryId", subCategoryId);
        formData.append("features", features);
        formData.append("description", description);
        formData.append("featureImg", featureImg);
        formData.append("thumbnail", thumbnail);
        formData.append("authorName", authorName);
        formData.append("sampleUrl", sampleUrl);

        // Add versions array as string
        formData.append("versions", JSON.stringify(versions));

        screenshots?.forEach(file => formData.append("screenshots", file));

        const res = await fetch(`${apiUrl}/api/product/uploadProduct`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        const productDataError = document.getElementById("productDataError");

        if (!res.ok) {
            productDataError.innerText = data.message || "Error uploading product.";
            return;
        }

        productDataError.innerText = "";
        allProducts();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Product uploaded successfully!",
            showConfirmButton: true
        });

        // Reset
        setProduct({
            categoryId: "",
            subCategoryId: "",
            title: "",
            featureImg: null,
            thumbnail: null,
            screenshots: [],
            authorName: "",
            sampleUrl: ""
        });

        setQuillData({ description: "", features: "" });
        setVersions([{ version: '', directUrl: '', downloadUrl: '' }]);
    };

    const onchange = (e) => {
        const { name, value, files, type } = e.target;
        if (name === "categoryId") setSelectedCat(value);

        setProduct(prev => ({
            ...prev,
            [name]: type === "file"
                ? (name === "screenshots" ? Array.from(files) : files[0])
                : value
        }));
    };

    const handleQuillChange = (name, html) => {
        setQuillData(prev => ({
            ...prev,
            [name]: html
        }));
    };

    const handleVersionChange = (index, field, value) => {
        const newVersions = [...versions];
        newVersions[index][field] = value;
        setVersions(newVersions);
    };

    const addVersion = () => {
        setVersions([...versions, { version: '', directUrl: '', downloadUrl: '' }]);
    };

    const removeVersion = (index) => {
        if (versions.length > 1) {
            const newVersions = versions.filter((_, i) => i !== index);
            setVersions(newVersions);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div id="productDataError" className='text-danger'></div>
                    <Form onSubmit={uploadProductFn} className='upload-form'>
                        {productFormData.map((data, index) => (
                            <Form.Group key={index} className='mb-3'>
                                <Form.Label style={{ fontWeight: "Bold", fontSize: "20px" }}>
                                    {data.label} <span className="text-danger">{data.star}</span>
                                </Form.Label>

                                {data.type === "select" ? (
                                    <Form.Control as="select" name={data.name} value={data.value} onChange={onchange}>
                                        <option value="">Select {data.label}</option>
                                        {data.options?.map((option, i) => (
                                            <option key={i} value={option.value}>{option.label}</option>
                                        ))}
                                    </Form.Control>
                                ) : data.type === "radio" ? (
                                    <Row className='g-3'>
                                        {data.options.map((option, i) => (
                                            <Col md={2} key={i}>
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
                                        value={data.value}
                                        onChange={(html) => handleQuillChange(data.name, html)}
                                    />
                                ) : data.type === "file" ? (
                                    <Form.Control
                                        name={data.name}
                                        type="file"
                                        onChange={onchange}
                                        multiple={data.name === "screenshots"}
                                    />
                                ) : (
                                    <Form.Control
                                        type={data.type}
                                        name={data.name}
                                        value={data.value}
                                        onChange={onchange}
                                    />
                                )}
                            </Form.Group>
                        ))}

                        <h4 className='mt-4'>Versions</h4>
                        {versions.map((ver, idx) => (
                            <Row key={idx} className="g-3 align-items-end">
                                <Col md={3}>
                                    <Form.Label>Version *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ver.version}
                                        onChange={(e) => handleVersionChange(idx, 'version', e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Direct URL *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ver.directUrl}
                                        onChange={(e) => handleVersionChange(idx, 'directUrl', e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Download URL *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ver.downloadUrl}
                                        onChange={(e) => handleVersionChange(idx, 'downloadUrl', e.target.value)}
                                        required
                                    />
                                </Col>
                                {(idx !== 0) && (
                                    <Col md={1}>
                                        <Button variant="danger" onClick={() => removeVersion(idx)}>-</Button>
                                    </Col>
                                )}
                            </Row>
                        ))}
                        <Button className="my-3" onClick={addVersion}>+ Add Version</Button>

                        <div className="d-flex justify-content-center">
                            <Button type='submit'>Upload</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UploadProduct;
