import { Button, Form, Modal, Table } from "react-bootstrap";
import AddCategory from "./AddCategory";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import apiUrl from "../../ApiEndpoint";
import Swal from "sweetalert2";
import categoryContext from "../../ContextApi/CategoryContext";

export default function ManageCategory() {
    const { allCategory, categoryById, getCategoryById, setCategoryById, allCategoryFn, delteCategory } = useContext(categoryContext)
    const [gameCatEditModal, setGameCatEditModal] = useState(false)

    const openEditGameCat = (id) => {
        setGameCatEditModal(true)
        getCategoryById(id)
    }

    const updateCatFn = async (e) => {
        e.preventDefault()
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });

        if (isConfirmed) {
            const { logo, category } = categoryById
            const formData = new FormData()
            formData.append("category", category)
            formData.append("logo", logo)

            const res = await fetch(`${apiUrl}/api/category/updateCategory/${categoryById._id}`, {
                method: "PUT",
                body: formData
            })
            if (res.ok) {
                Swal.fire("Saved!", "", "success");
                allCategoryFn();
            }
        } else {
            Swal.fire("Error saving changes", "", "error");
        }
    }

    const onchange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo' && files) {
            setCategoryById({ ...categoryById, logo: files[0] });
        } else {
            setCategoryById({ ...categoryById, [name]: value });
        }
    };

    return (
        <>
            <AddCategory />

            {/* categories table */}
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allCategory?.map((cat, ind) => (
                        <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{cat.category}</td>
                            <td>
                                <FontAwesomeIcon icon={faEdit} className="me-3" onClick={() => openEditGameCat(cat._id)} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => delteCategory(cat._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* edit cat modal */}
            <Modal
                size="lg"
                show={gameCatEditModal}
                onHide={() => setGameCatEditModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {/* Game Modal */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateCatFn}>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control name="category" value={categoryById.category} onChange={onchange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category Logo</Form.Label>
                            <Form.Control type="file" name="logo" onChange={onchange}></Form.Control>
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-3">
                            <Button type="submit">Update Category</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
