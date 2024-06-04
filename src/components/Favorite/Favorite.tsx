import styles from './Favorite.module.scss'
import { BsTrash } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { removeFavorite } from '../../redux/features/favouriteSlice'
import { useEffect, useState } from 'react';


const Favorite = () => {
  const products: any = useAppSelector(state => state.product)
  const favorite: any = useAppSelector(state => state.favorite)
  const [favoriteProducts, setFavoriteProducts] = useState<any>([])
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const favoriteIds = Object.keys(favorite.favouriteItems);
    const favorites = products.products.filter((product: any) => favoriteIds.includes(product._id));
    setFavoriteProducts(favorites)
  }, [products, favorite])

  const removeProduct = (id: any) => {
    dispatch(removeFavorite(id))
  }

  return (
      <div className={styles.product}>
        {
          favoriteProducts.map((p: any) => (
          <div className={styles.productDetails}>
            <img src={p.images[0]} alt="Phone" />
            <div className={styles.productInformations}>
              <p>{p.title}</p>
              <div className={styles.bottom}>
                <p>{p.price} $</p>
                <BsTrash className={styles.trash} onClick={() => removeProduct(p._id)}/>
              </div>
            </div>
          </div>
          ))
        }
      </div>
  )
}

export default Favorite