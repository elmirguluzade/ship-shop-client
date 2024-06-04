import { AiOutlineSearch } from "react-icons/ai";
import styles from "./Navbar.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/features/productSlice";
import { ProductItem } from "../../types/Interfaces";
import { Link } from "react-router-dom";

const Statement = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [result, setResult] = useState<ProductItem[]>([]);
  const dispatch = useAppDispatch();

  const extractKeywords = (query: string) => {
    const colorRegex = /(blue|red|green|black|white|yellow|grey|gold|silver)/i;
    const priceRegex = /\$(\d+)|(\d+)\sdollars?/;
    const nameRegex = /iphone|macbook|samsung|microsoft/i;

    const colorMatch = query.match(colorRegex);
    const priceMatch = query.match(priceRegex);
    const nameMatch = query.match(nameRegex);

    const color = colorMatch ? colorMatch[0] : null;
    const price = priceMatch ? (priceMatch[1] ? priceMatch[1] : priceMatch[2]) : null;
    const name = nameMatch ? nameMatch[0] : null;

    return { price, name, color };
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await dispatch(fetchProducts());
      setProducts(response.payload);
    };
    fetchProductsData();
  }, [dispatch]);

  useEffect(() => {
    const filterProducts = () => {
      const { price, name, color } = extractKeywords(search);

      let filteredProducts = products;

      if (name) {
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(name.toLowerCase()));
      }
      if (color) {
        filteredProducts = filteredProducts.filter(product => product.colors.includes(color.toLowerCase()));
      }
      if (price) {
        filteredProducts = filteredProducts.filter(product => product.price <= parseInt(price));
      }
      console.log(filteredProducts)
      setResult(filteredProducts);
    };

    const result = setTimeout(() => {
      filterProducts();
    }, 500);

    return () => clearTimeout(result);
  }, [search, products]);

  return (
    <div className={styles.input}>
      <label htmlFor="search">
        <AiOutlineSearch />
      </label>
      <input
        type="text"
        placeholder="Search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search !== "" ? (
        <div>
          <ul>
            {result.map((r: ProductItem, i) => (
              <Link to={`/products/${r._id}`} key={i} onClick={() => setSearch("")}>
                <li key={i}>{r.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Statement;
