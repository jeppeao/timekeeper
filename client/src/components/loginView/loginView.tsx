import styles from "./loginView.module.css"

const LoginView = () => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
    <h2>Login</h2>
      <label htmlFor="emailInput">Email:</label>
      <input className={ styles.input } id="emailInput" type="text" />
      <label htmlFor="passwordInput">Password:</label>
      <input className = { styles.input } id="passWordInput" type="text" />
    </form>
  )
}

export default LoginView;