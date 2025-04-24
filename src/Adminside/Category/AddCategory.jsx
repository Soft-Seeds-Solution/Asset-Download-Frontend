import { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import apiUrl from '../../ApiEndpoint';
import { Link } from 'react-router-dom';
import categoryContext from '../../ContextApi/CategoryContext';

function AddCategory() {
    const [show, setShow] = useState(false);
    const { allCategoryFn } = useContext(categoryContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [catCredentials, setCatCredentials] = useState({
        category: "",
        logo: ""
    });

    const AddCategory = async (e) => {
        e.preventDefault();
        const { logo, category } = catCredentials
        const formData = new FormData()
        formData.append("category", category)
        formData.append("logo", logo)

        const res = await fetch(`${apiUrl}/api/category/addCategory`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json()
        const cate = document.getElementById('categoryError');
        data.message !== undefined ? cate.innerText = data.message : cate.innerText = ""
        if (res.ok) {
            setCatCredentials({
                category: ""
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Category added successfully!",
                showConfirmButton: true,
            });
            allCategoryFn();
        }
    };

    const onchange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo' && files) {
            setCatCredentials({ ...catCredentials, logo: files[0] });
        } else {
            setCatCredentials({ ...catCredentials, [name]: value });
        }
    };

    return (
        <>
            <div className="d-flex justify-content-end mb-5">
                <Button className='first-button' onClick={handleShow}>
                    Add Category
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
                            <Form.Control type='text' placeholder="Add Category" name='category' value={catCredentials.category} onChange={onchange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category Logo</Form.Label>
                            <Form.Control type='file' placeholder="Add Category" name='logo' onChange={onchange} />
                        </Form.Group>

                        <div className="text-center">
                            <Button type='submit' className='first-button mt-3 text-white'>Add Category</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddCategory;