import styles from '../Login/Login.module.scss'
import svg from '../../assets/forget.png'
import { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Forget = () => {
  const [data, setData] = useState('')
  const [btnType, setBtnType] = useState(false)
  const navigate = useNavigate()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!data) {
      toast.error('Enter your email address', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }

    axios.post('http://localhost:4000/user/forget', { email: data })
      .then((response) => {
        setBtnType(true);
        localStorage.setItem('token', response.data.token);
        toast.success('Email was sent!', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        setTimeout(() => {
          setBtnType(false);
          navigate('/sent')
        }, 1000)
      })
      .catch(err => {
        if (err.response.data.message == "Not valid email") {
          toast.error("Not valid email address", { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        }
      })


  }

  return (
    <div className={styles.Login}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>Forgot password</h2>
        <p className={styles.vertificaton}>Enter your email address to receive a verification code</p>
        <div className={styles.input}>
          <input type="text" placeholder='Email' value={data} onChange={(e) => setData(e.target.value)} />
        </div>
        <button className={btnType ? styles.loadingForgetBtn : styles.forgetBtn} disabled={btnType}>Send</button>
      </form>
      <ToastContainer />
      <div className={styles.loginImg}>
        <img src={svg} alt="Login" />
      </div>
    </div>
  )
}

export default Forget