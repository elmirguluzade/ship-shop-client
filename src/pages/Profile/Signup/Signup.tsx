import { Link } from 'react-router-dom'
import { useState } from 'react'
import styles from '../Login/Login.module.scss'
import svg from '../../assets/login.png'
import { ISignUp } from '../../../types/formTypes'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState<ISignUp>({ name: '', email: '', password: '', checkbox: false })
  const [btnType, setBtnType] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email: string): (RegExpMatchArray | null) => {
    return email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };


  const handleData = (name: string, val?: string): void => {
    if (name === "checkbox") {
      setFormData({ ...formData, checkbox: !formData.checkbox })
    } else {
      setFormData({ ...formData, [name]: val })
    }
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.name === "" || formData.email === "" || formData.password === "") {
      toast.error('Enter all credentials.', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }
    if (formData.checkbox === false) {
      toast.error('Accept terms and conditions please.', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }

    const isValid = validateEmail(formData.email)
    if (!isValid) {
      toast.error('Email is not correct form', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be more than 8', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return
    }
    delete formData.checkbox
    axios.post('https://shipshop-server.vercel.app/user/signup', formData)
      .then(() => {
        setBtnType(true)
        toast.success('Redirecting to Login', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        setTimeout(() => {
          setBtnType(false)
          navigate('/login')
        }, 1000)
      })
      .catch(err => {
        if (err.response.data.message == "Duplicate email") {
          toast.error('This email was used', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        }
        else {
          toast.error('Try again', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        }
      })
  }


  return (
    <div className={styles.Login}>
      <div className={styles.form}>
        <form onSubmit={(e) => submitHandler(e)}>
          <h2>Sign Up</h2>
          <div className={styles.input}>
            <input type="text" name='name' placeholder='Name, Surname' value={formData.name} onChange={(e) => handleData(e.target.name, e.target.value)} />
          </div>
          <div className={styles.input}>
            <input type="text" name="email" placeholder='Email' value={formData.email} onChange={(e) => handleData(e.target.name, e.target.value)} />
          </div>
          <div className={styles.input}>
            <input type="password" name="password" placeholder='Password' value={formData.password} onChange={(e) => handleData(e.target.name, e.target.value)} />
          </div>
          <div className={styles.checkboxInput}>
            <input type="checkbox" placeholder='Password' name="checkbox" id='checkbox' onChange={(e) => handleData(e.target.name)} />
            <label htmlFor="checkbox">Accept the <Link to={'/signup'}>Terms and Conditions</Link></label>
          </div>
          <button disabled={btnType} className={btnType ? styles.loadingBtn : ''}>Sign Up</button>
          {/* <p>or connect with</p>
          <div className={styles.loginWith}>
            <FcGoogle />
          </div> */}
        </form>
        <ToastContainer />
      </div>
      <div className={styles.loginImg}>
        <img src={svg} alt="Signup" />
        <p>Already have an account?<Link to={"/login"} style={{marginLeft: '10px'}}>Login</Link></p>
      </div>
    </div>
  )
}

export default Signup