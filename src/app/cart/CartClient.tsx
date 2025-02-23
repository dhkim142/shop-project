'use client'
import React, { useEffect } from 'react'
import styles from './CartClient.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '@/redux/slice/cartSlice'
import { selectIsLoggedIn } from '@/redux/slice/authSlice'
import { useRouter } from 'next/navigation'
import Heading from '@/components/heading/Heading'
import Link from 'next/link'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat'
import { FaTrashAlt } from 'react-icons/fa'
import Button from '@/components/button/Button'
import { ICartItem } from '@/types'

const CartClient = () => {

    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    const dispatch = useDispatch();
    const router = useRouter();

    const isLoggedIn = useSelector(selectIsLoggedIn)

    const increaseCart = (cart: ICartItem) => {
        dispatch(ADD_TO_CART({ ...cart, quantity: 1 }));
    }

    const decreaseCart = (cart: ICartItem) => {
        dispatch(DECREASE_CART(cart));
    }

    const removeFromCart = (cart: ICartItem) => {
        dispatch(REMOVE_FROM_CART(cart));
    }

    const clearCart = () => {
        dispatch(CLEAR_CART());
    }

    const url = typeof window !== "undefined" ? window.location.href : "";
    const checkout = () => {
        if (isLoggedIn) {
            router.push('/checkout-address');
        } else {
            dispatch(SAVE_URL(url));
            router.push('/login')
        }
    }

    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL());
        dispatch(CALCULATE_TOTAL_QUANTITY());
        dispatch(SAVE_URL(''));
    }, [dispatch, cartItems])

    return (
        <section className={styles.table}>
            <Heading title='Cart' />
            {cartItems.length === 0 ? (
                <>
                    <p className={styles.emptyText}>No items in your cart</p>
                    <div className={styles.emptyText}>
                        <Link href={'/'}>Continue Shopping</Link>
                    </div>
                </>
            ) :
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => {
                                const { id, name, price, imageURL, cartQuantity } = item;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <p>
                                                <b>{name}</b>
                                            </p>
                                            <Image
                                                src={imageURL}
                                                alt={name}
                                                width={100}
                                                height={100}
                                            />
                                        </td>
                                        <td>
                                            ${" "}{priceFormat(price)}
                                        </td>
                                        <td>
                                            <div className={styles.count}>
                                                <button onClick={() => decreaseCart(item)}>
                                                    -
                                                </button>

                                                <p>
                                                    <b>{cartQuantity}</b>
                                                </p>

                                                <button onClick={() => increaseCart(item)}>
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            ${" "}{priceFormat(price * cartQuantity)}
                                        </td>
                                        <td className={styles.icons}>
                                            <FaTrashAlt
                                                size={19}
                                                color='red'
                                                onClick={() => removeFromCart(item)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className={styles.summary}>
                        <Button onClick={clearCart}>
                            Delete All
                        </Button>
                        <div className={styles.checkout}>
                            <div className={styles.text}>
                                <h4>Total items:</h4>
                                <p>{cartTotalQuantity}</p>
                            </div>
                            <div className={styles.text}>
                                <h4>Total Price:</h4>
                                <p>${" "}{priceFormat(cartTotalAmount)}</p>
                            </div>
                            <Button onClick={checkout}>
                                Buy Now
                            </Button>
                        </div>
                    </div>

                </>
            }
        </section>
    )
}

export default CartClient