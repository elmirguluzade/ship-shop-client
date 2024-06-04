import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'

interface ICategory {
    categories: string[]
}
const NavMenu: React.FC<ICategory> = (props: ICategory) => {
    const menus = props.categories.sort()
    return (
        <>
        {
            window.location.pathname.split('/')[1] === "product" || window.location.pathname === "/products" ? null : 
            <div className={styles.menu}>
                <ul>
                    {
                        menus.map((link, i) => (
                            <Link to={`/product/${link}`} key={i}><li>{link.charAt(0).toUpperCase() + link.slice(1)}</li></Link>
                        ))
                    }
                </ul>
            </div>
        }
        </>
    )
}

export default NavMenu