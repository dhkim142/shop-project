'use client'
import React, { useState } from 'react'
import styles from './AddProduct.module.scss'
import { useRouter } from 'next/navigation'
import Button from '@/components/button/Button'
import Loader from '@/components/loader/Loader'
import Heading from '@/components/heading/Heading'
import { getDownloadURL, ref ,uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '@/firebase/firebase'
import { toast } from 'react-toastify'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

const categories = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Health & Beauty"},
    { id: 5, name: "Phone" },
    { id: 6, name: "Movies & TV" },
    { id: 7, name: "Home & Kitchen" },
    { id: 8, name: "Automotive" },
    { id: 9, name: "Software" },
    { id: 10, name: "Video Games" },
    { id: 11, name: "Sports & Outdoor" },
    { id: 12, name: "Toys & Games" }
]

const initialState = {
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: ""
}

const AddProductClient = () => {

    const [product, setProduct] = useState({ ...initialState })
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleInputChange = (e) => {                              //입력에 대한 이벤트가 발생했을 때 입력값 업데이트
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const storageRef = ref(storage, `images/${Date.now()}${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snapshot) => {                          // 업로드 실시간 진행 상황 
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100            
            setUploadProgress(progress)
        },
            (error) => {
                toast.error(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {             //업로드 완료 후 
                    setProduct({...product, imageURL: downloadURL})
                    toast.success('Upload the image successfully')
                })
            }
        )
    }

    const addProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {                                               //firebase에 상품 정보 저장장
            addDoc(collection(db, "products"), {
                name: product.name,
                imageURL: product.imageURL,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: Timestamp.now().toDate().toISOString()
            })
            // 저장 후
            setIsLoading(false);
            setUploadProgress(0);
            setProduct({...initialState})

            toast.success("Saved the product")
            router.push("/admin/all-products")
        }
        catch(error) {
            setIsLoading(false);
            toast.error(error.message)
        }

    }
    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.product}>
                <Heading title="Create New Product" />
                <form onSubmit={addProduct}>
                    <label>Product name:</label>
                    <input
                        type='text'
                        placeholder='Product name'
                        required
                        name='name'
                        value={product.name}
                        onChange={e => handleInputChange(e)}
                    />

                    <div>
                        {                                                   //이미지 업로드 진행 현황 표현
                            uploadProgress === 0 ? null :
                                <div className={styles.progress}>
                                    <div className={styles["progress-bar"]} style={{ width: `${uploadProgress}%` }}>
                                        {uploadProgress < 100 ? `Uploading... ${uploadProgress}` : `Upload Complete ${uploadProgress}%`}
                                    </div>
                                </div>
                        }

                        <input
                            type='file'
                            placeholder='Product image'
                            accept='image/*'
                            name='image'
                            required
                            onChange={(e) => handleImageChange(e)}
                        />

                        {product.imageURL === "" ? null :
                            <input
                                type='text'
                                name='imageURL'
                                disabled
                                value={product.imageURL}
                                required
                                placeholder='Image URL'
                            /> // firestorage에 이미지가 있다면 그 이미지의 URL을 가져와서 보여줌
                        }
                    </div>

                    <label>Product price:</label>
                    <input
                        type='number'
                        placeholder='Product price'
                        required
                        name='price'
                        value={product.price}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <label>Product category:</label>
                    <select
                        required
                        name="category"
                        value={product.category}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="" disabled>
                            --Select product category
                        </option>
                        {
                            categories.map((category) => {
                                return (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <label>Product brand/company:</label>
                    <input
                        type='text'
                        placeholder='Product brand/company'
                        name='brand'
                        value={product.brand}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <label>Product description:</label>
                    <textarea
                        name='desc'
                        value={product.desc}
                        cols={10}
                        rows={10}
                        required
                        onChange={(e) => handleInputChange(e)}
                    >
                    </textarea>
                    <Button type='submit' className={styles.button}>
                        Create Product
                    </Button>
                </form>
            </div>
        </>
    )
}

export default AddProductClient