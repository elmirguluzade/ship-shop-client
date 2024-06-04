import { useState } from 'react'
import styles from './Orders.module.scss'
import { SlBasket } from "react-icons/sl"
import phone from '../../assets/phone.png'

const Orders = () => {
    const [cart, setCart] = useState(true)

    return (
        !cart ? <div className={styles.ordersContent}>
            <h2>My Orders</h2>
            <div className={styles.orders}>
                <div className={styles.basket}>
                    <SlBasket />
                </div>
                <h2>You currently have no orders in your cart</h2>
            </div>
        </div> :
                <div className={styles.product}>
                    <div>
                        <div className={styles.productDetails}>
                            <img src={phone} alt="Phone" />
                            <div className={styles.productInformations}>
                                <p>Date of order:</p>
                                <p>03.30.2024</p>
                                <p>Status:</p>
                                <p>On the way</p>
                                <p>Total Amount</p>
                                <p style={{ color: "red" }}>240 ₼</p>
                                <button>Order Details</button>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <div className={styles.productDetails}>
                            <img src={phone} alt="Phone" />
                            <div className={styles.productInformations}>
                                <p>Date of order:</p>
                                <p>03.30.2024</p>
                                <p>Status:</p>
                                <p>Delivered</p>
                                <p>Total Amount</p>
                                <p style={{ color: "red" }}>240 ₼</p>
                                <button>Order Details</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.productDetails}>
                            <img src={phone} alt="Phone" />
                            <div className={styles.productInformations}>
                                <p>Date of order:</p>
                                <p>03.30.2024</p>
                                <p>Status:</p>
                                <p>Refused</p>
                                <p>Total Amount</p>
                                <p style={{ color: "red" }}>240 ₼</p>
                                <button>Order Details</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.productDetails}>
                            <img src={phone} alt="Phone" />
                            <div className={styles.productInformations}>
                                <p>Date of order:</p>
                                <p>03.30.2024</p>
                                <p>Status:</p>
                                <p>On the way</p>
                                <p>Total Amount</p>
                                <p style={{ color: "red" }}>240 ₼</p>
                                <button>Order Details</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.productDetails}>
                            <img src={phone} alt="Phone" />
                            <div className={styles.productInformations}>
                                <p>Date of order:</p>
                                <p>03.30.2024</p>
                                <p>Status:</p>
                                <p>On the way</p>
                                <p>Total Amount</p>
                                <p style={{ color: "red" }}>240 ₼</p>
                                <button>Order Details</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.productDetails}>
                            <img src={phone} alt="Phone" />
                            <div className={styles.productInformations}>
                                <p>Date of order:</p>
                                <p>03.30.2024</p>
                                <p>Status:</p>
                                <p>On the way</p>
                                <p>Total Amount</p>
                                <p style={{ color: "red" }}>240 ₼</p>
                                <button>Order Details</button>
                            </div>
                        </div>
                    </div> */}
                </div>
    )
}

export default Orders