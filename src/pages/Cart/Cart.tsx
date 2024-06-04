import { useEffect } from 'react'
import styles from './Cart.module.scss'
import { FiShoppingCart } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { removeFromCart, addToCart, clearFromCart } from '../../redux/features/cartSlice'



const Cart = () => {
    const cart: any = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    const totalPrice = () => {
        let sum = 0
        cart.cartItems.forEach((c: any) => {
            sum = sum + c.quantity * c.cart.price
        });
        return sum
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.Cart}>
            {<h2>Cart ({cart.cartItems.length} product)</h2>}
            {
                cart.cartItems.length === 0 ?
                    <div className={styles.cartDetails}>
                        <FiShoppingCart />
                        <p>Your cart is empty</p>
                        <Link to={'/products'}>
                            <button>Go Products</button>
                        </Link>
                    </div> :
                    <div className={styles.cartProducts}>
                        <div className={styles.products}>
                            {
                                cart.cartItems.map((c: any, i: any) => (
                                    <div className={styles.product} key={i}>
                                        <div className={styles.productDetails}>
                                            <div>
                                                <img src={c.cart.images[0]} alt="Phone" />
                                                <div>
                                                    <p>{c.cart.description}</p>
                                                    <p style={{ color: "red" }}>{c.cart.price} $</p>
                                                </div>
                                            </div>
                                            <div className={styles.counter}>
                                                <button onClick={() => dispatch(removeFromCart(c.cart._id))}>-</button>
                                                <p>{c.quantity}</p>
                                                <button onClick={() => dispatch(addToCart(c.cart))}>+</button>
                                                <BsTrash className='removeIcon' onClick={() => dispatch(clearFromCart(c.cart._id))} style={{cursor: "pointer"}}/>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.total}>
                            <div className={styles.content}>
                                <h2 style={{ padding: 0 }}>Total</h2>
                                <p>Price: {totalPrice()}$</p>
                                <p className={styles.lastChild}>Delivery: 0 $ </p>
                                <p>Sum: <span style={{ color: 'red' }}>{totalPrice()}$</span></p>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Cart