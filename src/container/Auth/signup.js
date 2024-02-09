import React, { useContext, useRef } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useRoleContext } from "../../context/roleContext";
import AuthService from "../../service/authService";
import Swal from 'sweetalert2'

function Signup() {
    const formRef = useRef(null);
    const nav = useNavigate();
    const { state, dispatch } = useRoleContext();
    const [query] = useSearchParams();
    const return_url = query.get("return");

    const authService = new AuthService();

    const loginHandler = (loginBody) => {
        authService.login(loginBody)
            .then((res) => {
                let data = {
                    id: res.data.id,
                    name: res.data.firstName,
                    role: res.data.role
                }
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("data",JSON.stringify(data));
                dispatch({ type: 'update', payload: data });
                nav("/properties", { replace: true });
            })
            .catch((err) => console.log(err));
    };

    const signUpHandler = () => {
        const form = formRef.current;
        const registrationData = {
            firstName: form["firstName"].value,
            lastName: form["lastName"].value,
            email: form["email"].value,
            password: form["password"].value,
            role: form["role"].value,
        };

        authService.signup(registrationData)
            .then((res) => {
                alert("Successfully registered");
                const loginBody = {
                    email: form["email"].value,
                    password: form["password"].value,
                };
                loginHandler(loginBody);
            })
            .catch((err) => {
                console.log(err);
                if (err.data == "duplicateID") {
                    Swal.fire({
                      title: 'User already exists!',
                      icon: 'info'
                    })
                }
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        signUpHandler();
    };

    return (
        <div className="flex flex-col items-center h-screen -mt-10">
            <form
                className="flex border px-8 py-8 rounded-md flex-col m-auto"
                ref={formRef}
                onSubmit={onSubmit}
            >
                <h1 className="text-center text-lg mb-6 font-medium">Signup</h1>
                <input
                    required
                    className="border px-3 py-2 rounded-md focus:outline-sky-500"
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                />{" "}
                <br />
                <input
                    required
                    className="border px-3 py-2 rounded-md focus:outline-sky-500"
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                />{" "}
                <br />
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
                />{" "}
                <br />
                <div className="flex justify-evenly">
                    <label className="mr-3" htmlFor="cus">
                        <input id="cus" type="radio" name="role" value="CUSTOMER" />
                        <span className="ml-1">Customer</span>
                    </label>
                    <label className="mr-3" htmlFor="own">
                        <input id="own" type="radio" name="role" value="OWNER" />
                        <span className="ml-1">Owner</span>
                    </label>
                </div>
                <button className="rounded-md mt-8 px-3 py-2 bg-sky-600 p-1 text-white hover:bg-sky-700 hover:text-white focus:outline-none transitions">
                    Signup
                </button>
            </form>
        </div>
    );
}

export default Signup;
