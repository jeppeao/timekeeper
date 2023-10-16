import styles from "./registerView.module.css"

const RegisterView = () => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label htmlFor="emailInput">Email:</label>
      <input className={ styles.input } id="emailInput" type="text" />
      <label htmlFor="passwordInput">Password:</label>
      <input className = { styles.input } id="passwordInput" type="text" />
      <label htmlFor="passwordRepeatInput">Repeat Password:</label>
      <input className = { styles.input } id="passwordRepeatInput" type="text" />
    </form>
  )
}

export default RegisterView;