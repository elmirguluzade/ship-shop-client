import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom'
import styles from './Product.module.scss'
import LoadingSpinner from '../../components/Loading/Loading';
import { singleProductI } from '../../types/Interfaces';
import axios from 'axios';
import { useAppDispatch } from '../../redux/store';
import {addAllToCart} from '../../redux/features/cartSlice'


const Product = () => {
    const [productCount, setProductCount] = useState(0)
    const [product, setProduct] = useState<singleProductI>({title: '', price: 0, description: "", images: []})
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get(`https://shipshop-server.vercel.app//product/${params.id}`)
            .then(res => {
                setProduct(res.data.product)
            })
            .then(() => setLoading(false))
    }, [params])


    const counterHandler = (sign: string) => {
        if (sign === "+") {
            setProductCount(productCount + 1)
        }
        else if (sign === "-") {
            if (productCount == 0) {
                return
            }
            setProductCount(productCount - 1)
        }
    }

    const addProductToCart = () => {
        if (productCount > 0) {
            dispatch(addAllToCart({ id: params.id!, quantity: productCount, product }));
        }
    }

    return (
        <div className={styles.Product}>
            {
                !loading ? <div className={styles.productContainer}>
                <div className={styles.productImg}>
                    <Carousel showIndicators={false} showArrows={true} width={"70%"} className={styles.carousel}>
                     {
                        product.images.map((image, i) => (
                            <img src={image} alt="product" key={i}/>
                        ))
                     }
                    </Carousel>
                </div>
                <div className={styles.productDetails}>
                    <div className={styles.productContent}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <h4>{product.price} $</h4>
                    </div>
                    <div className={styles.counter}>
                        <button onClick={() => counterHandler('-')}>-</button>
                        <p>{productCount}</p>
                        <button onClick={() => counterHandler('+')}>+</button>
                    </div>
                    <button onClick={() => addProductToCart()}>Add to cart</button>
                </div>
            </div> : <LoadingSpinner />
            }
        </div>
    )
}

export default Product