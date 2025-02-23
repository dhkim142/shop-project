'use client'
import Button from '@/components/button/Button'
import Heading from '@/components/heading/Heading'
import Loader from '@/components/loader/Loader'
import useFetchDocument from '@/hooks/useFetchDocument'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './EditProduct.module.scss'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '@/firebase/firebase'
import { categories } from '../../add-product/AddProductClient'
import { toast } from 'react-toastify'

const EditProductClient = () => {
    const { id } = useParams()
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { document } = useFetchDocument('products', id as string)
    const [product, setProduct] = useState(document)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setProduct({ ...product, [name]: value })
        }
    
        const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
            if(!e.target.files) return;
            const file = e.target.files[0];
    
            const storageRef = ref(storage, `images/${Date.now()}${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
    
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100            
                setUploadProgress(progress)
            },
                (error) => {
                    toast.error(error.message)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setProduct({...product, imageURL: downloadURL})
                        toast.success('Upload the image successfully')
                    })
                }
            )
        }

    useEffect(() => {
        setProduct(document)
    }, [document])

    const editProduct = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if(!product || !document) return;

        if(product.imageURL !== document.imageURL) {
            const storageRef = ref(storage, document.imageURL)
            deleteObject(storageRef)
        }

        try {                                               
            setDoc(doc(db, "products", id as string), {
                name: product.name,
                imageURL: product.imageURL,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: document.createdAt,
                editedAt: Timestamp.now().toDate()
            })

            toast.success("This product is successful edited")
            router.push("/admin/all-products")
        }
        catch (error) {
            setIsLoading(false);
            toast.error(getErrorMessage(error))
        }

    }
    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.product}>
                <Heading title="Edit Product" />
                {product === null ? (
                    <Loader />
                ) : (
                    <form onSubmit={editProduct}>
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
                        {                                                   
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
                            />
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
                        Edit Product
                    </Button>
                </form>
                )}
            </div>
        </>
    )
}

export default EditProductClient