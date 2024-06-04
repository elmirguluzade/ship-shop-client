/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styles from './Paginate.module.scss'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/features/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface PaginationProps {
    items: any[];
    itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ items, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.user.isLogged)

    const handlePageChange = (newPage: number) => {
        if (newPage !== currentPage) {
            window.scroll(0, 0)
        }
        setCurrentPage(newPage);
    };

    const handleArrowChange = (page: number, arrowType: string) => {
        if (arrowType == "left" && page == 0) {
            return
        }
        if (arrowType == "right" && totalPages + 1 == page) {
            return
        }
        window.scroll(0, 0)
        setCurrentPage(page)
    }

    const addToCartItem = (product: any) => {
        if (isAuth.length === 0) {
            toast.error('Please login for adding cart', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        } else {
            dispatch(addToCart(product))
            localStorage.setItem('cart', product)
        }

    }

    const [heartStatus, setHeartStatus] = useState<{ [key: string]: boolean }>({});

  function toggleHeart(id: string) {
    setHeartStatus(prevStatus => ({
      ...prevStatus,
      [id]: !prevStatus[id]
    }));
  }
    return (
        <div>
            <div className={styles.container}>
                {
                    currentItems.map((product: { _id: string, images: string[], price: number, title: string }) => (
                        <div className={styles.product} key={product._id}>
                            <Link to={`/products/${product._id}`} >
                                <div className={styles.productImg}>
                                    <img src={product.images[product.images.length - 1]} alt="Product" />
                                </div>
                            </Link>
                            <div className={styles.productContent}>
                                <Link to={`/products/${product._id}`} >
                                    <p>{product.title}</p>
                                </Link>
                                <div className={styles.price}>
                                    <p className={styles.productPrice}>{product.price}$</p>
                                    <div className={styles.icon}>
                                      <p className={styles.heart} onClick={() => toggleHeart(product._id)}> {heartStatus[product._id] ? <FaHeart /> : <FaRegHeart />}</p>
                                      <p className={styles.shopcart} title='Add to cart' onClick={() => addToCartItem(product)}>  <AiOutlineShoppingCart /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <ToastContainer />
            {items.length < itemsPerPage ? <div className={styles.noPagination}></div> :
                <div className={styles.pagination}>
                    <button onClick={() => handleArrowChange(currentPage - 1, "left")}><AiOutlineArrowLeft /></button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? styles.active : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => handleArrowChange(currentPage + 1, "right")}><AiOutlineArrowRight /></button>
                </div>
            }
        </div>
    );
};

export default Pagination;
