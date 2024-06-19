import styles from './Login.module.scss'
import svg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { restoreCart } from '../../redux/features/cartSlice'
import { handleUser } from '../../redux/features/userSlice'

const Login = () => {
  const [formData, setFormData] = useState<{ email: string, password: string }>({ email: '', password: '' })
  const navigate = useNavigate()
  const [btnType, setBtnType] = useState(false)
  const [pwVisible, setPwVisible] = useState(false)
  const dispatch = useDispatch()

  const handleData = (name: string, val: string): void => {
    setFormData({ ...formData, [name]: val })
  }


  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBtnType(true)
    if (formData.email === "" || formData.password === "") {
      toast.error('Enter all credentials.', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      setBtnType(false)
      return
    }

    axios.post('https://shipshop-server.vercel.app/user/login', formData, { withCredentials: true })
      .then((res) => {
        toast.success('Login successfully', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        setTimeout(() => {
          dispatch(handleUser(res.data.user))
          dispatch(restoreCart(res.data.user.cart))
          localStorage.setItem('user', JSON.stringify({name: res.data.user.name, email: res.data.user.email, birthday: res.data.user.birthday, role: res.data.user.role}))
          setBtnType(true)
          navigate('/')
        }, 1000)
      })
      .catch(() => {
        toast.error('Email or password is invalid', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        setBtnType(false)
      })
  }

  return (
    <div className={styles.Login}>
      <div className={styles.form}>
        <form onSubmit={submitHandler}>
          <h2>Login</h2>
          <div className={styles.input}>
            <input type="text" placeholder='Email' name='email' value={formData.email} onChange={(e) => handleData(e.target.name, e.target.value)} />
          </div>
          <div className={styles.input}>
            <input type={!pwVisible ? "password" : "text"} placeholder='Password' name='password' value={formData.password} onChange={(e) => handleData(e.target.name, e.target.value)} />
            {pwVisible ? <AiOutlineEye onClick={() => setPwVisible(!pwVisible)} /> : <AiOutlineEyeInvisible onClick={() => setPwVisible(!pwVisible)} />}
          </div>
          <p className={styles.forget}>
            <Link to={'/forget'}>Forgot password?</Link>
          </p>
          <button disabled={btnType} className={btnType ? styles.loadingBtn : ''}>Login</button>
          <p>or connect with</p>
          <div className={styles.loginWith}>
            <FcGoogle />
          </div>
        </form>
      </div>
      <ToastContainer />
      <div className={styles.loginImg}>
        <img src={svg} alt="Login" />
        <p>No account? <Link to={"/signup"}>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login