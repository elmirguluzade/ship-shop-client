import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
        <>
            <ToastContainer />
            <Navbar />
            <Outlet />
            <Footer />
            <iframe
                    src="https://www.chatbase.co/chatbot-iframe/8v2eGqkfiEWnAN3PVY11g"
                    title="Chatbot"
                    width="100%"
                    style={{width: "100%", height: "100%", minHeight: "700px"}}>   
            </iframe>
        </>
    )
}

export default Layout