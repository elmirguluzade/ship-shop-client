import axios from "axios"
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import { IoIosArrowForward } from "react-icons/io"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link } from "react-router-dom"
import { top4I } from "../../types/Interfaces"
import home from '../../assets/home.png'
import { toast, ToastContainer } from 'react-toastify';
import box from '../../assets/box.svg'
import star from '../../assets/medal-star.svg'
import card from '../../assets/card-pos.svg'
import homeM from '../../assets/home-m.png'
import { addToCart } from '../../redux/features/cartSlice';
import { addFavorite } from '../../redux/features/favouriteSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Home = () => {
  const [top4T, setTop4T] = useState<top4I[] | undefined>([])
  const [top4P, setTop4P] = useState<top4I[] | undefined>([])
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.user.isLogged)
  const heartStatus = useAppSelector(state => state.favorite.favouriteItems)

  function toggleHeart(id: string) {
    if (isAuth.length === 0) {
      toast.error('Please login for adding to favorite', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
    } else {
      dispatch(addFavorite(id))
    }
  }

  useEffect(() => {
    axios.get('https://shipshop-server.vercel.app//product/top4price')
      .then(res => setTop4P(res.data.products))
      .catch(err => console.log(err))
    axios.get('https://shipshop-server.vercel.app//product/top4time')
      .then(res => setTop4T(res.data.products))
      .catch(err => console.log(err))
    window.scrollTo(0, 0)
  }, [])

  const addToCartItem = (product: any) => {
    if (isAuth.length === 0) {
      toast.error('Please login for adding to cart', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
    } else {
      dispatch(addToCart(product))
    }
  }

  return (
    <div className={styles.Home} >
      <div className={styles.main}>
        <img src={home} alt="Home" />
        <div className={styles.mobileView}>
          <img src={homeM} alt="Home" />
          <h1>Buy & Sell What's Now & Next</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis malesuada et leo faucibus </p>
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.productsHeader}>
          <p>Best selling products</p>
          <Link to={'/products'}><button>All Products <IoIosArrowForward /></button></Link>
        </div>
        <div className={styles.allProducts}>
          {
            top4P?.map((product, i) => {
              const image = product.images[0];
              return (
                <div className={styles.product} key={i}>
                  <Link to={`/products/${product._id}`}>
                    <div className={styles.productImg}>
                      <img src={image} alt="Product" />
                    </div>
                  </Link>
                  <div className={styles.productContent}>
                    <Link to={`/products/${product._id}`} >
                      <p>{product.title}</p>
                    </Link>
                    <div className={styles.price}>
                      <p className={styles.productPrice}>{product.price}$</p>
                      <div className={styles.icon}>
                        <p className={styles.heart} onClick={() => toggleHeart(product._id)}>
                          {heartStatus[product._id] ? <FaHeart /> : <FaRegHeart />}
                        </p>
                        <p className={styles.shopcart} title='Add to cart' onClick={() => addToCartItem(product)}>  <AiOutlineShoppingCart /></p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.productsHeader}>
          <p>New arrival products</p>
          <Link to={'/products'}><button>All Products <IoIosArrowForward /></button></Link>
        </div>
        <div className={styles.allProducts}>
          {
            top4T?.map((product, i) => {
              const image = product.images[0];
              return (
                <div className={styles.product} key={i}>
                  <Link to={`/products/${product._id}`}>
                    <div className={styles.productImg}>
                      <img src={image} alt="Product" />
                    </div>
                  </Link>
                  <div className={styles.productContent}>
                    <Link to={`/products/${product._id}`} >
                      <p>{product.title}</p>
                    </Link>
                    <div className={styles.price}>
                      <p className={styles.productPrice}>{product.price}$</p>
                      <div className={styles.icon}>
                        <p className={styles.heart} onClick={() => toggleHeart(product._id)}>
                          {heartStatus[product._id] ? <FaHeart /> : <FaRegHeart />}
                        </p>
                        <p className={styles.shopcart} title='Add to cart' onClick={() => addToCartItem(product)}>  <AiOutlineShoppingCart /></p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.services}>
        <div className={styles.service}>
          <img src={box} alt="Card" />
          <div>
            <h3>Delivery</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
          </div>
        </div>
        <div className={styles.service}>
          <img src={star} alt="Card" />
          <div>
            <h3>Credit</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
          </div>
        </div>
        <div className={styles.service}>
          <img src={card} alt="Card" />
          <div>
            <h3>Guarantee</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home