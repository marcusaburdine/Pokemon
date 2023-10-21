import { useState } from "react";
import * as userService from "../../../utilities/service/user";
import styles from "./signUp.module.css";
import { Link } from "react-router-dom"

export default function SignUpFormForm({ setUser }) {
  const defaultCredentials = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  const [credentials, setCredentials] = useState(defaultCredentials);

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
      error: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...credentials };
      delete formData.confirm;
      delete formData.error;
      const user = await userService.signUp(formData);
      setUser(user);
      setCredentials(defaultCredentials);
    } catch (error) {
      console.log("Error in Submit", error);
      setCredentials({ ...credentials, error: "FAILED" });
    }
  };
  const disable = credentials.password !== credentials.confirm;
  return (
    <>
      <div className=''>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            value={credentials.name}
            onChange={handleChange}
            placeholder='Enter Username'
            autoFocus
            required
          />
          <br />
          <input
            type='email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
            placeholder='Enter Email'
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
          <input
            type='password'
            name='confirm'
            value={credentials.confirm}
            onChange={handleChange}
            placeholder='Confirm Password'
            autoFocus
            required
          />
          <br />
          <button className={styles.button} type='submit' disabled={disable}>
            SUBMIT
          </button>
        </form>
      </div>
      <p className=''>&nbsp;{credentials.error}</p>

      <Link to="/logIn"><button>LOGIN</button></Link>

    </>
  );
}
