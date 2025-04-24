import { useEffect, useState } from "react";
import ProductContext from "./ProductContext";
import apiUrl from "../ApiEndpoint";
import Swal from "sweetalert2"
export default function ProductProvider({ children }) {
    const [products, setProducts] = useState([])
    const [productById, setProductById] = useState([])
    const [productListing, setProductListing] = useState("")
    const allProducts = async () => {
        const res = await fetch(`${apiUrl}/api/product/uploaded-products`, {
            method: "GET"
        })
        const data = await res.json()
        setProducts(data)
    }

    const getProductById = (id) => {
        const filterProduct = products?.find(product => product._id === id)
        setProductById(filterProduct)
    }
    const productApproveFn = async (id) => {
        const res = await fetch(`${apiUrl}/api/product/approved-product/${id}`, {
            method: "PUT"
        })
        if (res.ok) {
            allProducts()
        }
    }
    const productRejectFn = async (id) => {
        const res = await fetch(`${apiUrl}/api/product/reject-product/${id}`, {
            method: "PUT"
        })
        if (res.ok) {
            allProducts()
        }
    }
    const productViewsFn = async (id) => {
        const res = await fetch(`${apiUrl}/api/product/updateViews/${id}`, {
            method: "PUT"
        })
        if (res.ok) {
            allProducts()
        }
    }

    const deleteProduct = async (id) => {
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
            await fetch(`${apiUrl}/api/product/delProduct/${id}`, {
                method: "DELETE"
            })
            allProducts()
        }
    }

    useEffect(() => {
        allProducts()
    }, [])

    return (
        <ProductContext.Provider value={{ products, productListing, setProductListing, getProductById, productById, setProductById, deleteProduct, allProducts, productApproveFn, productRejectFn, productViewsFn }}>
            {children}
        </ProductContext.Provider>
    )
}