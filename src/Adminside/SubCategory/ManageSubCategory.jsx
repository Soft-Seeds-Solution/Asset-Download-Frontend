import { Button, Form, Modal, Table } from "react-bootstrap";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import apiUrl from "../../ApiEndpoint";
import Swal from "sweetalert2";
import SubCategoryContext from "../../ContextApi/SubCategoryCntext";
import AddSubCategory from "./AddSubCategory";
import categoryContext from "../../ContextApi/CategoryContext";

export default function ManageSubCategory() {
    const { allSubCategory, allSubCategoryFn, getSubCategoryById, subCategoryById, setSubCategoryById, delteSubCategory } = useContext(SubCategoryContext)

    const { allCategory } = useContext(categoryContext)
    const [gameCatEditModal, setGameCatEditModal] = useState(false)

    const openEditGameCat = (id) => {
        setGameCatEditModal(true)
        getSubCategoryById(id)
    }

    const updateSubCatFn = async (e) => {
        e.preventDefault()
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });

        if (isConfirmed) {
            const { categoryId, subCategory } = subCategoryById
            const res = await fetch(`${apiUrl}/api/subCategory/updateSubCategory/${subCategoryById._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ categoryId, subCategory })
            })
            if (res.ok) {
                Swal.fire("Saved!", "", "success");
                allSubCategoryFn();
            }
        } else {
            Swal.fire("Error saving changes", "", "error");
        }
    }

    const onchange = (e) => {
        const { name, value } = e.target
        setSubCategoryById({ ...subCategoryById, [name]: value })
    }
    return (
        <>
            < AddSubCategory />

            {/* categories table */}
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allSubCategory?.map((cat, ind) => (
                        <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{cat.categoryId?.category}</td>
                            <td>{cat.subCategory}</td>
                            <td>
                                <FontAwesomeIcon icon={faEdit} className="me-3" onClick={() => openEditGameCat(cat._id)} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => delteSubCategory(cat._id)} />
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
                    {/* <Modal.Title id="example-modal-sizes-title-sm">
                        Game Modal
                    </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateSubCatFn}>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" name="categoryId" value={subCategoryById?.categoryId?._id} onChange={onchange}>
                                {allCategory?.map((cat, ind) => (
                                    <option key={ind} value={cat._id}>{cat.category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Control name="subCategory" value={subCategoryById?.subCategory} onChange={onchange}></Form.Control>
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-3">
                            <Button type="submit">Update Category</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal >
        </>
    )
}
