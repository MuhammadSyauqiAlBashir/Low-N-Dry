import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../constant";
import { useState } from "react";
import Swal from "sweetalert2";


function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    const newInput = {
      ...input,
    };
    newInput[name] = value;
    setInput(newInput);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: BASE_URL + "login",
        data: input,
      });
      localStorage.accessToken = data.accessToken;
      Swal.fire({
        title: "Success",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="text" onChange={handleChange} name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" onChange={handleChange} name="password" />
      <button type="submit">Sign in</button>
    </form>
    <Link to={'/register'}>Sign Up</Link>
    </div>
    </>
  );
}

export default Login;
