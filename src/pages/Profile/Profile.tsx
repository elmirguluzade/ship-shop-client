// import shoppingcart from '../../assets/shopping-cart.png'
import Favorite from '../../components/Favorite/Favorite'
import Personal from '../../components/Personal/Personal'
import Password from '../../components/Password/Password'
import styles from './Profile.module.scss'
import { BsPerson } from 'react-icons/bs'
// import { SlBasket } from "react-icons/sl"
import { CiHeart } from "react-icons/ci"
import { IoMdKey } from "react-icons/io";
import { useState } from 'react'

const Profile = () => {
    const [currentPage, setCurrentPage] = useState("favorite")


    return (
        <div className={styles.Profile}>
            <div className={styles.profileMenu}>
                <div>
                    <h2>My Profile</h2>
                    {/* <p onClick={() => setCurrentPage("")} 
                    className={`${styles.profileIcons} ${currentPage == "" ? styles.active : ''}`}>
                        <SlBasket /> My Orders</p> */}
                    <p onClick={() => setCurrentPage("favorite")} 
                    className={`${styles.profileIcons} ${currentPage == "favorite" ? styles.active : ''}`}>
                        <CiHeart /> Favorites</p>
                    <p onClick={() => setCurrentPage("personal")} 
                    className={`${styles.profileIcons} ${currentPage == "personal" ? styles.active : ''}`}>
                        <BsPerson /> Personal Information</p>
                    <p onClick={() => setCurrentPage("password")} 
                    className={`${styles.profileIcons} ${currentPage == "password" ? styles.active : ''}`}>
                        <IoMdKey /> Change Password</p>
                </div>
            </div>
            {
            currentPage == "favorite" ? <Favorite /> : 
            currentPage == "personal" ? <Personal /> :
            currentPage == "password" ? <Password /> : 
            null
            }
        </div>
    )
}

export default Profile