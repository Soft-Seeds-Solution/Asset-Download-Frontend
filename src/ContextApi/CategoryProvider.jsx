import { useEffect, useState } from "react";
import apiUrl from "../ApiEndpoint";
import Swal from "sweetalert2";
import CategoryContext from "./CategoryContext";

export default function CategoryProvider({ children }) {
    const [allCategory, setAllCategory] = useState([])
    const [categoryById, setCategoryById] = useState("")

    const allCategoryFn = async () => {
        const res = await fetch(`${apiUrl}/api/category/allCategories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setAllCategory(data)
    }

    const getCategoryById = (id) => {
        const filterCat = allCategory?.find(cat => cat._id === id)
        setCategoryById(filterCat)
    }

    const delteCategory = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "This game deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });
        if (isConfirmed) {
            await fetch(`${apiUrl}/api/category/delCategory/${id}`, {
                method: "DELETE"
            })
            allCategoryFn()
        }
    }

    useEffect(() => {
        allCategoryFn()
    }, [])

    return (
        <CategoryContext.Provider value={{ allCategory, allCategoryFn, categoryById, getCategoryById, setCategoryById, delteCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}