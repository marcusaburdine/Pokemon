import { useState } from "react";
import{ Link } from "react-router-dom"
import * as userService from "../../../utilities/service/user";
import styles from "./loginForm.module.css";

export default function LoginForm({ setUser }) {
  const defaultCredentials = {
    email: "",
    password: "",
    error: "",
  };
  const [credentials, setCredentials] = useState(defaultCredentials);
  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await userService.login(credentials);

      console.log("User:", user);
      setUser(user);
      setCredentials(defaultCredentials);
    } catch {
      setError("LOGIN FAILED");
    }
  }

  return (
    <>
    <div className={styles.container}>
      <div className={styles.form}>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
            placeholder='Enter Email'
            autoFocus
            required
          />
          <br />
          <input
            type='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
            placeholder='Enter Password'
            required
          />
          <br />
          <button className={styles.button} type='submit'>
            <span>Login</span>
          </button>
        </form>
      </div>
      <p className=''>{credentials.error}</p>
      <Link to="/"><button>SIGN UP</button></Link>
      </div>
    </>
  );
}
