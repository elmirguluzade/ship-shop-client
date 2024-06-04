import { useState } from "react"
import styles from "./Password.module.scss"
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import { useAppSelector } from '../../redux/store'
import axios from "axios"

const Password = () => {
  const [pwVisible, setPwVisible] = useState(false)
  const [pwVisible1, setPwVisible1] = useState(false)
  const [pwVisible2, setPwVisible2] = useState(false)
  const id = useAppSelector(state => state.user.isLogged)

  const [password, setPassword] = useState<{ currentPassword: string, newPassword: string, confirmPassword: string }>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!password.currentPassword || !password.newPassword || !password.confirmPassword) {
      toast.error('Enter all credentials.', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" })
      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      toast.error('New passwords not match', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
      return;
    }

    axios.post('https://shipshop-server.vercel.app//user/update',
      {
        currentPass: password.currentPassword,
        newPass: password.newPassword,
        confirmPass: password.confirmPassword,
        id
      })
      .then(() =>
        toast.success(`Password successfully updated`, { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", })
      )
      .catch(err => {
        if (err.response.data.message == "Not Same Password") {
          toast.error(`Current password isn't true`, { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", });
        }
      })

  }
  return (

    <form className={styles.profileContent} onSubmit={submitHandler}>
      <h2>Change Password</h2>
      <div className={styles.inputs}>
        <div className={styles.boxes}>
          <input type={!pwVisible ? "password" : "text"} value={password.currentPassword} placeholder='Current Password'
            onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })} />
          {pwVisible ? <AiOutlineEye onClick={() => setPwVisible(!pwVisible)} /> : <AiOutlineEyeInvisible onClick={() => setPwVisible(!pwVisible)} />}
        </div>
        <div className={styles.boxes}>
          <input type={!pwVisible1 ? "password" : "text"} value={password.newPassword} placeholder='New Password'
            onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
          {pwVisible1 ? <AiOutlineEye onClick={() => setPwVisible1(!pwVisible1)} /> : <AiOutlineEyeInvisible onClick={() => setPwVisible1(!pwVisible1)} />}
        </div>
        <div className={styles.boxes}>
          <input type={!pwVisible2 ? "password" : "text"} value={password.confirmPassword} placeholder='Confirm New Password'
            onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })} />
          {pwVisible2 ? <AiOutlineEye onClick={() => setPwVisible2(!pwVisible2)} /> : <AiOutlineEyeInvisible onClick={() => setPwVisible2(!pwVisible2)} />}
        </div>
        <ToastContainer />
        <div className={styles.btn}>
          <button>Save changes</button>
        </div>
      </div>

    </form>
  )
}

export default Password