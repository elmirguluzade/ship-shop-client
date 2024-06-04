import { useState } from "react"
import styles from "./Personal.module.scss"
import { useAppSelector } from '../../redux/store'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'


const PersonalInformation = () => {
  const user = useAppSelector(state => state.user)
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [inputType, setInputType] = useState('text');
  const [details, setDetails] = useState<{ name: string, role: string, email: string, birthday: string }>({ 
    name: user.user.name, 
    role: user.user.role, 
    email: user.user.email, 
    birthday: "", })

    window.onresize = (): void => {
      setInnerWidth(window.innerWidth);
    };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!details.name || !details.email) {
      alert("Please fill in all the inputs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(details.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    axios.post('http://:5000/user/updateInfo', 
    {
      name: details.name,
      email: details.email,
      birthday: details.birthday,
      id: user.isLogged
    })
    .then(() => 
      toast.success(`Updated`, { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "light", })
    )

  }
  return (
    <form className={styles.profileContent} onSubmit={submitHandler}>
      <h2>Personal Information</h2>
      <div className={styles.inputs}>
        <input style={innerWidth <= 768 ? {width: "100%"} : {width: "40%"}} value={details.name} type="text" placeholder='Name' 
        onChange={(e) => setDetails({ ...details, name: e.target.value })}/>
      </div>
      <div className={styles.inputs}>
      <input style={innerWidth <= 768 ? {width: "100%"} : {width: "40%"}} value={user.user.role} type="text" placeholder='Role' disabled/>
      </div>
      <div className={styles.inputs}>
        <input style={innerWidth <= 768 ? {width: "100%"} : {width: "40%"}} value={details.email} type="text" placeholder='E-mail' 
        onChange={(e) => setDetails({ ...details, email: e.target.value })}/>
      </div>
      <div className={styles.inputs}>
        <input style={innerWidth <= 768 ? {width: "100%"} : {width: "40%"}} type={inputType} value={details.birthday}
        onChange={(e) => setDetails({ ...details, birthday: e.target.value })}
        onFocus={() => setInputType('date')} onBlur={() => setInputType('text')}
        placeholder={inputType === 'text' ? 'Birthday' : ''}
        />
      </div>
      <ToastContainer />
      <div className={styles.btn}>
        <button style={innerWidth <= 768 ? {width: "100%"} : {width: "40%"}}>Save changes</button>
      </div>
    </form>
  )
}

export default PersonalInformation