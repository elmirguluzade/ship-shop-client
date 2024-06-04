import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { useEffect } from 'react'
import axios from 'axios'
import { handleLog } from '../redux/features/userSlice'
import NotFound from './NotFound'
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

const ProtectedRoute = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const isLogged = user.isLogged

    useEffect(() => {
        axios.get('https://shipshop-server.vercel.app//user/verify', { withCredentials: true })
            .then(res => {
                dispatch(handleLog({ id: res.data.user.id }))
            })
            .catch(err => console.log(err.response.data.message))
    }, [dispatch])


    return (
        <>
            {isLogged.length !== 0 ? 
            <>
            <Navbar />
            <Outlet />
            <Footer /> 
            </>
            : 
            <NotFound />}
        </>
    )
}

export default ProtectedRoute