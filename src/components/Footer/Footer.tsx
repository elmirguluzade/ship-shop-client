import styles from './Footer.module.scss'
import logo from '../../assets/logo.png'
import { AiOutlineInstagram, AiOutlineYoutube, AiOutlineTwitter, AiOutlineMail } from 'react-icons/ai'
import { BsFacebook, BsTelephone } from 'react-icons/bs'
import { BiMap } from 'react-icons/bi'

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div className={styles.footerContainer}>
                <div className={styles.left}>
                    {/* <div><img src={logo} alt="Logo" /></div> */}
                    <div><h2>Logo</h2></div>
                    <div className={styles.icons}>
                        <AiOutlineInstagram />
                        <BsFacebook />
                        <AiOutlineYoutube />
                        <AiOutlineTwitter />
                    </div>
                </div>
                <div className={styles.contact}>
                    <h3>Contact</h3>
                    <div>
                        <BiMap />
                        <p>Sumgait City, Heydar Aliyev Avenue 38</p>
                    </div>
                    <div>
                        <AiOutlineMail />
                        <p>hacibalayev.elmeddin@gmail.com</p>
                    </div>
                    <div>
                        <BsTelephone />
                        <p>+994 70 629 29 76</p>
                    </div>
                </div>
            </div>
            <div className={styles.conditions}> 
                <p>ShipShop 2024. All rights reserved.</p>
                <p>Terms & Conditions</p>
            </div>
        </div>
    )
}

export default Footer