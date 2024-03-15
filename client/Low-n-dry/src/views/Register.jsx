import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../constant";

function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    address: "",
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
        url: BASE_URL + "register",
        data: input,
      });
      Swal.fire({
        title: "Success",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
        console.log(error);
      Swal.fire({
        title: error.response.data[0],
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
          <label htmlFor="address">Address</label>
          <input type="text" onChange={handleChange} name="address" />
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleChange} name="password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Register;
