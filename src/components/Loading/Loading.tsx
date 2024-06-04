import styles from "./Loading.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinnerContainer}>
        <div className={styles.loadingSpinner}>
        </div>
      </div>
    </div>
  );
}