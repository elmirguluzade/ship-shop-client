import svg from '../../assets/sent.png'
import styles from './EmailSent.module.scss'

const EmailSent = () => {
    return (
        <div className={styles.container}>
            <img src={svg} alt="Email Sent" />
            <h2 className={styles.text}>Check your email address. Follow the link sent and update your password!</h2>
        </div>
    )
}

export default EmailSent