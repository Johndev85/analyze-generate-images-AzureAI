import styles from "./loader.module.css"

const Loader = () => {
  return (
    <div className={styles.lds_facebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
