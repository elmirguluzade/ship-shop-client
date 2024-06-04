import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.scss";
import person from "../../assets/person.png";
import cartI from "../../assets/shopping-cart.png";
import Search from "./Search";
import Statement from "./Statement";
import axios from "axios";
import logo from '../../assets/logo4.png'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { handleLog } from "../../redux/features/userSlice";
import { removeFromCart } from "../../redux/features/cartSlice";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [menuState, setMenuState] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>("Keyword");
  const [categories, setCategories] = useState([]);
  const [cartClicked, setCartClicked] = useState(false);
  const navigate = useNavigate();
  const cartItemsRef = useRef<HTMLDivElement>(null);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const states = useAppSelector((state) => state);
  const isLogged = states.user.isLogged;
  const cart = states.cart;
  const favortie = states.favorite;

  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get("http://localhost:4000/product/category").then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  const logout = () => {
    axios
      .post(
        "http://localhost:4000/user/logout",
        {
          cart: cart.cartItems,
          favortie: favortie.favouriteItems,
          id: isLogged,
        },
        { withCredentials: true }
      )
      .then(() => {
        navigate("/");
        dispatch(handleLog({ id: "" }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://shipshop-server.vercel.app/user/verify", { withCredentials: true })
      .then((res) => {
        dispatch(handleLog({ id: res.data.user.id }));
      })
      .catch((err) => console.log(err.response.data.message));
  }, [dispatch]);

  // clicking outside of cart div hide this div
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartIconRef.current &&
        cartIconRef.current.contains(event.target as Node)
      )
        return;
      if (
        cartItemsRef.current &&
        !cartItemsRef.current.contains(event.target as Node)
      )
        setCartClicked(false);
    };
    if (cartClicked) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [cartClicked]);

  window.onresize = (): void => {
    setInnerWidth(window.innerWidth);
  };

  const cartClickHandler = () => {
    if (cart.cartItems.length != 0) {
      setCartClicked(!cartClicked);
    }
  };

  return (
    <header className={styles.Navbar}>
      <nav>
        <div className={styles.logo}>
          {innerWidth > 768 ? null : !menuState ? (
            <RxHamburgerMenu onClick={() => setMenuState(!menuState)} />
          ) : (
            <RxCross1 onClick={() => setMenuState(!menuState)} />
          )}
          <Link to={'/'}><img src={logo} alt="Logo" /></Link>
        </div>
        {innerWidth > 768 ?  <div className={styles.searchContainer}>
          <select
            className={styles.searchTypeSelect}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}>
            <option value="Keyword">Keyword</option>
            <option value="Statement">Statement</option>
          </select>
          {searchType === "Keyword" ? <Search /> : <Statement />}
        </div> : null}
        {isLogged.length === 0 ? (
          <div className={styles.links}>
            <Link to={"/login"}>Login</Link>
          </div>
        ) : (
          <div className={styles.icons}>
            <div className={styles.icon}>
              <Link to={"/profile"}>
                <img src={person} alt="icon" className={styles.profile} />
              </Link>
              <p style={{ cursor: "pointer" }} onClick={() => logout()}>
                Logout
              </p>
            </div>
            <div
              className={`${styles.icon} ${styles.cart}`}
              ref={cartIconRef}
              onClick={cartClickHandler}
            >
              <img src={cartI} alt="icon" />
              <p>{cart.cartItems.length}</p>
            </div>
            {cartClicked ? (
              <div className={styles.cartItems} ref={cartItemsRef}>
                {cart.cartItems.map((c, i) => (
                  <div
                    className={`${styles.item} ${
                      i === cart.cartItems.length - 1 ? styles.lastItem : ""
                    }`}
                    key={i}
                  >
                    <div>
                      <img src={c.cart.images[0]} alt="iphone" />
                      <p className={styles.title}>
                        {c.cart.title} <br />
                        <span>quantity: {c.quantity}</span>
                      </p>
                    </div>
                    <div>
                      <p
                        className={styles.icon}
                        onClick={() => dispatch(removeFromCart(c.cart._id))}
                      >
                        <BsTrash />
                      </p>
                    </div>
                  </div>
                ))}
                <Link to={"/cart"}>
                  <button>Go To Cart</button>
                </Link>
              </div>
            ) : ("")}
          </div>
        )}
      </nav>
      {innerWidth > 768 ? (
        <NavMenu {...{ categories }} />
      ) : menuState ? (
        <NavMenu {...{ categories }} />
      ) : null}
      {innerWidth <= 768 ?  <div className={styles.searchContainer}>
          <select
            className={styles.searchTypeSelect}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}>
            <option value="Keyword">Keyword</option>
            <option value="Statement">Statement</option>
          </select>
          {searchType === "Keyword" ? <Search /> : <Statement />}
        </div> : null}
    </header>
  );
};

export default Navbar;