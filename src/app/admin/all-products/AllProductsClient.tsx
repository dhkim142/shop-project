'use client'
import React, { useEffect, useState } from 'react'
import styles from './AllProduct.module.scss'
import useFetchCollection from '@/hooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, STORE_PRODUCTS } from '@/redux/slice/productSlice'
import { FILTER_BY_SEARCH, selectFilteredProducts } from '@/redux/slice/filterSlice'
import Loader from '@/components/loader/Loader'
import Heading from '@/components/heading/Heading'
import Search from '@/components/search/Search'
import priceFormat from '@/utils/priceFormat'
import Image from 'next/image'
import Link from 'next/link'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Pagination from '@/components/pagination/Pagination'
import Notiflix from 'notiflix'
import { db, storage } from '@/firebase/firebase'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'
import { deleteDoc, doc } from 'firebase/firestore'

const AllProductsClient = () => {

    const [search, setSearch] = useState('')
    const {data, isLoading} = useFetchCollection('products')
    const products = useSelector(selectProducts)
    const filteredProducts = useSelector(selectFilteredProducts);
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(10)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstproduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstproduct ,indexOfLastProduct)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({products: data})
        )
    }, [dispatch, data])

    useEffect(()=> {
        dispatch(
            FILTER_BY_SEARCH({products, search})
        )
    },[dispatch, products, search])

    const confirmDelete = (id:string, imageURL: string) => {
        Notiflix.Confirm.show(
            "Remove this product",
            "This product is removed",
            "Remove",
            "Cancel",
            function okCb() {
                deleteProduct(id, imageURL)
            },
            function cancelCb() {
                console.log("The removal was canceled")
            },
            {
                width: "320px",
                borderRadius: '3px',
                titleColor: '#4385F4',
                okButtonBackground: "#4385F4",
                cssAnimationStyle: 'zoom'
            }
        )
    }
    const deleteProduct = async (id: string, imageURL: string) => {
        try {
            await deleteDoc(doc(db, "products", id))
            const storageRef = ref(storage, imageURL)
            await deleteObject(storageRef)
            toast.success('The product is completely removed')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }
   return (
    <>
        {isLoading && <Loader />}
        <div className={styles.table}>
            <Heading title="Total Products" subtitle={`Total: ${filteredProducts.length}`} />
            
            <div className={styles.search}>
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>

            {currentProducts.length === 0 ? (
                <p>No Product</p>
            ) : (
                <table>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product, index) => {
                                const {id, name, category, imageURL, price} = product;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Image src={imageURL} alt={name} width={100} height={100}/>
                                        </td>
                                        <td>
                                            {name}
                                        </td>
                                        <td>
                                            {category}
                                        </td>
                                        <td>
                                            ${" "}{priceFormat(price)}
                                        </td>
                                        <td>
                                            <Link href={`/admin/edit-product/${id}`}>
                                                <FaEdit size={20} color='green'/>
                                            </Link>
                                            {" "}
                                            <FaTrashAlt size={20} color='red' onClick={() => confirmDelete(id, imageURL)}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
            )}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalProducts={filteredProducts.length}
                productsPerPage={productsPerPage}
            />
        </div>
    </>
  )
}

export default AllProductsClient