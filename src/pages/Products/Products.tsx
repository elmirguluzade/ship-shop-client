// import { handleLog } from "../../redux/features/userSlice"
import axios from "axios"
import { useEffect, useState } from 'react'
import { useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './Products.module.scss'
import { fetchProducts } from "../../redux/features/productSlice"
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { filterI, stateI } from "../../types/Interfaces"
import Pagination from "../../components/Paginate/Paginate"
import { toast, ToastContainer } from 'react-toastify';
import LoadingSpinner from "../../components/Loading/Loading"

const Products: React.FC = () => {
  const dispatch = useAppDispatch()
  const [filterState, setFilterState] = useState({ brandState: false, priceState: false })
  const [filters, setFilters] = useState<filterI>({ brand: [], priceLt: 0, priceGt: 1800 })
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [tempProducts, setTempProducts] = useState([])
  const params = useParams()
  const isLoading = useSelector((state: stateI) => state.product.loading)

  useEffect(() => {
    const fetchingProducts = async () => {
      const response = await dispatch(fetchProducts())
      setProducts(response.payload);
      setTempProducts(response.payload)
    }
    fetchingProducts()
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('https://shipshop-server.vercel.app/product/category')
      .then((res) => {
        const allCategories = res.data.categories
        setCategories(allCategories)
        const brands: { clicked: boolean, name: string }[] = []
        allCategories.forEach((c: string) => {
          if (params.brand === c) {
            brands.push({ clicked: true, name: c })
          }
          else {
            brands.push({ clicked: false, name: c })
          }
        })
        setFilters({ ...filters, brand: [...brands] })
      })
    if (params.brand) {
      setFilterState({ priceState: false, brandState: true })
    }
  }, [])

 

  const brandHandler = (name: string) => {
    const updatedFilters = { ...filters };
    updatedFilters.brand = updatedFilters.brand.map((brand) => {
      if (brand.name === name) {
        return { ...brand, clicked: !brand.clicked };
      }
      return brand;
    });
    setFilters(updatedFilters);
  }

  const filterHandler = () => {
    const gt = filters.priceGt
    const lt = filters.priceLt
    // Error cases
    if (isNaN(lt) || isNaN(gt)) {
      toast.error('Please enter both prices.', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }
    if (gt <= lt) {
      toast.error('Min price cannot be less than or equal max price', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }
    if (gt < 0 || lt < 0) {
      toast.error('Prices must be positive number', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }

    // Selected brands
    const selectedCatergories: string[] = []
    filters.brand.forEach((f) => {
      if (f.clicked) selectedCatergories.push(f.name)
    })

    // All brands
    if (selectedCatergories.length === 0 && lt === 0 && gt >= 1750) {
      setProducts(tempProducts)
    }

    // Only price filter
    if (selectedCatergories.length === 0 && (lt !== 0 || gt !== 1800)) {
      const priceFilterProducts = tempProducts.filter((p: { price: number }) => {
        return p.price >= filters.priceLt && p.price <= filters.priceGt;
      })
      setProducts(priceFilterProducts)
    }

    // Selected brands
    if (selectedCatergories.length > 0) {
      let newProducts = tempProducts.filter((p: { category: string }) => {
        return selectedCatergories.includes(p.category)
      })
      newProducts = newProducts.filter((p: { price: number }) => {
        return p.price >= filters.priceLt && p.price <= filters.priceGt;
      })
      setProducts(newProducts)
    }
  }

  useEffect(() => {
    if(params.brand){
      filterHandler()
    }
  }, [products])

  const style= {
    ...((products.length === 0) && { height: '100vh' }),
    ...(params.brand ? { marginTop: '100px' } : { marginTop: '95px' }),
  };

  return (
    <div className={styles.Products} style={style}>
      {isLoading ? <LoadingSpinner /> :
        <div className={styles.productsContainer}>
          <div className={styles.filters}>
            <div className={styles.filter}>
              <div className={styles.filterHeader} onClick={() => setFilterState({ ...filterState, brandState: !filterState.brandState })}>
                <p>Brand</p>
                {!filterState.brandState ? <AiOutlinePlus /> : <AiOutlineMinus />}
              </div>
              {
                filterState.brandState &&
                <div className={styles.filterContent}>
                  <ul>
                    {
                      categories.map((c: string, i) => (
                        <li key={i}>
                          <input
                            type="checkbox"
                            name={c}
                            id={c}
                            onChange={(e) => brandHandler(e.target.name)}
                            checked={filters.brand.find(brand => brand.name === c)?.clicked || false}
                          />
                          <label htmlFor={c}> {c.charAt(0).toUpperCase() + c.slice(1)}</label>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              }
            </div>
            <div className={styles.filter}>
              <div className={styles.filterHeader} onClick={() => setFilterState({ ...filterState, priceState: !filterState.priceState })}>
                <p>Price</p>
                {!filterState.priceState ? <AiOutlinePlus /> : <AiOutlineMinus />}
              </div>
              {filterState.priceState && <div className={styles.price}>
                <input type="number" placeholder="Min" value={filters.priceLt} onChange={(e) => setFilters({ ...filters, priceLt: parseInt(e.target.value) })} />
                ---
                <input type="number" placeholder="Max" value={filters.priceGt} onChange={(e) => setFilters({ ...filters, priceGt: parseInt(e.target.value) })} />
              </div>}
            </div>
            {filterState.brandState || filterState.priceState ? <button onClick={filterHandler}>Filter</button> : ""}
          </div>
          <div className={styles.products}>
            <p className={styles.length}><span>{products.length}</span> products found</p>
            <Pagination items={products} itemsPerPage={9} />
          </div>
        </div>}
      <ToastContainer />
    </div >
  )
}

export default Products