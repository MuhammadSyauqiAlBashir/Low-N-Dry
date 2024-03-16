import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../constant";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useGoogleLogin } from "@react-oauth/google";

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
  const handleCredentialRes = async ({ credential }) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}googleLogin`,
        data: {
          googleToken: credential,
        },
      });
      localStorage.accessToken = data.accessToken;
      navigate("/");
      Swal.fire({
        title: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "591988567538-r3lr3o6g8d99398uj0mbd4bm4r3tqo9r.apps.googleusercontent.com",
      callback: handleCredentialRes,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <>
      <section className="gradient-form bg-neutral-200 dark:bg-neutral-700 h-screen w-full fixed">
        <div className="container h-full p-10">
          <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* Left column container*/}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/*Logo*/}
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="/logo.png"
                          alt="logo"
                        />
                        <h2 className="mb-2 mt-1 pb-1 text-xl tracking-widest font-semibold">
                          Low-N-Dry
                        </h2>
                      </div>
                      <form>
                        <p className="mb-4">Please login to your account</p>
                        {/*Username input*/}
                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init=""
                        >
                          <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput1"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out 
                            
                            peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary
                            
                            peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                          >
                            Email
                          </label>
                        </div>
                        {/*Password input*/}
                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init=""
                        >
                          <input
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput11"
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                          />
                          <label
                            htmlFor="exampleFormControlInput11"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                          >
                            Password
                          </label>
                        </div>
                        {/*Submit button*/}
                        <div className="mb-3 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                            onClick={handleSubmit}
                            data-twe-ripple-init=""
                            data-twe-ripple-color="light"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                            data-twe-ripple-init=""
                            data-twe-ripple-color="light"
                            to={"/register"}
                          >
                            Register
                          </Link>
                        </div>
                      </form>
                      <div
                        className="flex items-center rounded-b-lg justify-center"
                        id="buttonDiv"
                      ></div>
                    </div>
                  </div>
                  {/* Right column container with background and description*/}
                  <div
                    className="hidden lg:flex lg:items-center lg:rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold"></h4>
                      <img
                        src="/image.png.png"
                        className="flex items-center justify-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
