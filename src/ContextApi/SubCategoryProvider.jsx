import { useEffect, useState } from "react";
import apiUrl from "../ApiEndpoint";
import Swal from "sweetalert2";
import SubCategoryContext from "./SubCategoryCntext";

export default function SubCategoryProvider({ children }) {
    const [allSubCategory, setAllSubCategory] = useState([])
    const [subCategoryById, setSubCategoryById] = useState("")

    const allSubCategoryFn = async () => {
        const res = await fetch(`${apiUrl}/api/subCategory/allSubCategories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setAllSubCategory(data)
    }

    const getSubCategoryById = (id) => {
        const filterSubCat = allSubCategory?.find(subCat => subCat._id === id)
        setSubCategoryById(filterSubCat)
    }

    const delteSubCategory = async (id) => {
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
            await fetch(`${apiUrl}/api/subCategory/delSubCategory/${id}`, {
                method: "DELETE"
            })
            allSubCategoryFn()
        }
    }

    useEffect(() => {
        allSubCategoryFn()
    }, [])

    return (
        <SubCategoryContext.Provider value={{ allSubCategory, allSubCategoryFn, getSubCategoryById, subCategoryById, setSubCategoryById, delteSubCategory }}>
            {children}
        </SubCategoryContext.Provider>
    )
}