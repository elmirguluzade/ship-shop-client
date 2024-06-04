import styles from '../Login/Login.module.scss'
import svg from '../../assets/change.png'
import axios from 'axios'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const ChangePassword = () => {
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const {token} = useParams()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!password) {
      toast.error('Enter new password!', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }
    if (password.length < 8) {
      toast.error('Provide more than 8 character', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   toast.error('Token is not valid!', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
    //   return
    // }
    axios.patch(`http://localhost:4000/user/reset/${token}`, { password }).then(() => {
      toast.success('Password was changed!', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      localStorage.removeItem('token')
      setTimeout(() => {
        navigate('/login')
      }, 500)
    }).catch(err => {
      if (err.response.data.message === "Token is not valid") {
        toast.error('Token is not valid!', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      }
    })
  }


  return (
    <div className={styles.Login}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>Update password</h2>
        <p className={styles.vertificaton}>Set a new password for your account</p>
        <div className={styles.input}>
          <input type="password" placeholder='New password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className={styles.forgetBtn}>Send</button>
      </form>
      <ToastContainer />
      <div className={styles.loginImg}>
        <img src={svg} alt="Login" />
      </div>
    </div>
  )
}

export default ChangePassword