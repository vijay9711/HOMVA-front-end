import React, { useContext, useRef } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import {useRoleContext} from "../../context/roleContext";
import AuthService from "../../service/authService";

function Signup() {
    const formRef = useRef(null);
    const nav = useNavigate();
    const { state, dispatch } =useRoleContext() ;
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
                // setUser(res.data);
                // manageLocalStorage(res.data);
                navToRightPageBasedOnRole(res.data.role);
                dispatch({type:'update', payload: data});
            })
            .catch((err) => console.log(err));
    };

    const manageLocalStorage = (data) => {
        localStorage.setItem("token", data.accessToken);
        // localStorage.setItem("refresh", data.refreshToken);
        // localStorage.setItem("role", data.role);
        // localStorage.setItem("firstName", data.firstName);
        // localStorage.setItem("id", data.id);
        localStorage.setItem("status", data.status);
    };

    const navToRightPageBasedOnRole = (role) => {
        switch (role) {
            case "CUSTOMER":
                if(return_url) {
                    nav(return_url, { replace: true });
                    break;
                }
                nav("/properties", { replace: true });
                break;

            case "OWNER":
                nav("/owner/properties", { replace: true });
                break;

            case "ADMIN":
                nav("/properties", { replace: true });
                break;

            default:
                nav("/", { replace: true });
                break;
        }
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
            .then(() => {
                alert("Successfully registered");
                const loginBody = {
                    email: form["email"].value,
                    password: form["password"].value,
                };
                loginHandler(loginBody);

            })
            .catch((err) => console.log(err));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        signUpHandler();
    };

    return (

        // <div className="flex justify-center items-center h-screen bg-gray-100">
        //     <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg flex">
        //         <div className="w-1/2 pr-8">
        //             <img
        //                 src="/path/to/image.jpg"
        //                 alt="Signup Image"
        //                 className="w-full h-auto rounded-lg"
        //             />
        //         </div>
        //         <div className="w-1/2">
        //             <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        //             <form>
        //                 <div className="mb-4">
        //                     <input
        //                         type="text"
        //                         placeholder="First Name"
        //                         className="w-full p-2 border border-gray-300 rounded-md"
        //                     />
        //                 </div>
        //                 <div className="mb-4">
        //                     <input
        //                         type="text"
        //                         placeholder="Last Name"
        //                         className="w-full p-2 border border-gray-300 rounded-md"
        //                     />
        //                 </div>
        //                 <div className="mb-4">
        //                     <input
        //                         type="email"
        //                         placeholder="Email"
        //                         className="w-full p-2 border border-gray-300 rounded-md"
        //                     />
        //                 </div>
        //                 <div className="mb-4">
        //                     <input
        //                         type="password"
        //                         placeholder="Password"
        //                         className="w-full p-2 border border-gray-300 rounded-md"
        //                     />
        //                 </div>
        //                 <div className="mb-4">
        //                     <label className="flex items-center">
        //                         <input
        //                             type="checkbox"
        //                             checked={Owner}
        //                             onChange={handleToggle}
        //                             className="form-checkbox h-4 w-4 text-indigo-600"
        //                         />
        //                         <span className="ml-2 text-gray-700">Sign up as owner</span>
        //                     </label>
        //                 </div>
        //                 <button
        //                     type="submit"
        //                     className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        //                 >
        //                     Sign Up
        //                 </button>
        //             </form>
        //         </div>
        //     </div>
        // </div>










   // -----------------------------------

        // <div className="flex flex-col items-center min-h-screen bg-gray-100">
        //     <form
        //         className="flex flex-col items-center bg-white shadow-md rounded-md p-8 max-w-md w-full"
        //         ref={formRef}
        //         onSubmit={onSubmit}
        //     >
        //         <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
        //         <input
        //             required
        //             className="input-field"
        //             placeholder="First Name"
        //             name="firstName"
        //             type="text"
        //         />
        //         <input
        //             required
        //             className="input-field"
        //             placeholder="Last Name"
        //             name="lastName"
        //             type="text"
        //         />
        //         <input
        //             required
        //             className="input-field"
        //             placeholder="E-mail"
        //             name="email"
        //             type="email"
        //         />
        //         <input
        //             required
        //             className="input-field"
        //             placeholder="Password"
        //             name="password"
        //             type="password"
        //         />
        //         <div className="flex justify-evenly mt-4">
        //             <label className="flex items-center">
        //                 <input
        //                     className="mr-2"
        //                     type="radio"
        //                     name="role"
        //                     value="CUSTOMER"
        //                 />
        //                 Customer
        //             </label>
        //             <label className="flex items-center">
        //                 <input className="mr-2" type="radio" name="role" value="OWNER" />
        //                 Owner
        //             </label>
        //         </div>
        //         <button className="btn-primary mt-8">Signup</button>
        //     </form>
        // </div>







//-----------------------------------
    //original





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
