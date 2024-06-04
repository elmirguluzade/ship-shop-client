import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/Login/Login'
import Signup from '../../pages/Signup/Signup'
import Home from '../../pages/Home/Home'
import Layout from '../Layout'
import Forget from '../../pages/Forget/Forget'
import EmailSent from '../../components/EmailSent/EmailSent'
import ChangePassword from '../../pages/ChangePassword/ChangePassword'
import Cart from '../../pages/Cart/Cart'
import Profile from '../../pages/Profile/Profile'
import Products from '../../pages/Products/Products'
import Product from '../../pages/Product/Product'
import ProtectedRoute from '../ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/product/:brand' element={<Products />} />
                <Route path='/products/:id' element={<Product />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path='/cart' element={<Cart />} />
                <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forget' element={<Forget />} />
            <Route path='/sent' element={<EmailSent />} />
            <Route path='/change/:token' element={<ChangePassword />} />
            <Route path='/*' element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default MainLayout