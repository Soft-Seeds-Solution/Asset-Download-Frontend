import { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import apiUrl from '../../ApiEndpoint';
import { Link } from 'react-router-dom';
import SubCategoryContext from '../../ContextApi/SubCategoryCntext';
import categoryContext from '../../ContextApi/CategoryContext';

function AddSubCategory() {
    const [show, setShow] = useState(false);
    const { allCategory } = useContext(categoryContext)
    const { allSubCategoryFn } = useContext(SubCategoryContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [subCategory, setSubCategory] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const AddCategory = async (e) => {
        e.preventDefault();

        const res = await fetch(`${apiUrl}/api/subCategory/addSubCategory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ categoryId, subCategory }),
        });
        const data = await res.json()
        const cate = document.getElementById('categoryError');
        data.message !== undefined ? cate.innerText = data.message : cate.innerText = ""
        if (res.ok) {
            setSubCategory("")
            setCategoryId("")
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sub Category added successfully!",
                showConfirmButton: true,
            });
            allSubCategoryFn();
        }
    };

    return (
        <>
            <div className="d-flex justify-content-end mb-5">
                <Button as={Link} to="/signin" className="me-3">Log Out</Button>
                <Button className='first-button' onClick={handleShow}>
                    Add Sub Category
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* <Modal.Title></Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <Form className='form-group admin-form p-3' onSubmit={AddCategory} style={{ boxShadow: "none" }}>
                        <div id='categoryError' className='text-center text-danger'></div>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" name='categoryId' value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
                                <option value="">Select Category</option>
                                {allCategory?.map((cat, ind) => (
                                    <option key={ind} value={cat._id}>{cat.category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Control type='text' placeholder="Add Sub Category" name='category' value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
                        </Form.Group>

                        <div className="text-center">
                            <Button type='submit' className='first-button mt-3 text-white'>Add Sub Category</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddSubCategory;