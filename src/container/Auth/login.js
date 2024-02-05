import React, { useContext, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRoleContext } from "../../context/roleContext";
import AuthService from "../../service/authService";

const authService = new AuthService();
function Login() {
  const formRef = useRef(null);
  const { state, dispatch } =useRoleContext();

  const loginHandler = (body) => {
    authService.login(body).then(res => {
      let data = {
        id: res.data.id,
        name: res.data.firstName,
        role: res.data.role
      }
      dispatch({type:'update', payload: data});
    }).catch(e=>{console.log(e)});
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const body = {
      email: form["email"].value,
      password: form["password"].value,
    };

    loginHandler(body);
  };
  return (
    <div className="flex flex-col items-center">
      <form
        className="flex border px-6 py-8 rounded-md flex-col"
        ref={formRef}
        onSubmit={onSubmit}
      >
        <img
          className="hidden h-8 w-auto lg:block mb-3"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
          alt="Your Company"
        />
        <h1 className="text-center text-lg mb-6 font-medium">Login</h1>
        <input
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          placeholder="E-mail"
          name="email"
          type="email"
        />{" "}
        <br />
        <input
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          placeholder="Password"
          name="password"
          type="password"
        />
        <button className="rounded-md mt-8 px-3 py-2 bg-sky-600 p-1 text-gray-200 hover:bg-sky-700 hover:text-white focus:outline-none transitions">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
