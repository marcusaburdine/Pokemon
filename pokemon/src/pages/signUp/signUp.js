import { useState } from "react";
import SignUpForm from "../../components/forms/signUp/signUp";
import LoginForm from "../../components/forms/login/loginForm";
import styles from "./signUp.module.css";

export default function SignUp({ setUser }) {
 
  return (
   <><SignUpForm setUser={setUser} /></>
  );
}
