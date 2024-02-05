import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRoleContext } from "../context/roleContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const NavBar = () => {
  const { state, dispatch } = useRoleContext();
  const navigation = useNavigate();

  let mainLink = {
    owner:[
      { name: "Properties", to: "/properties", current: false },
        { name: "My Properties", to: "/owner/properties", current: false },
        { name: "Offers", to: "/owner/offers", current: false },
    ],
    customer:[
      { name: "Properties", to: "/properties", current: false },
        { name: "Favorites", to: "/customer/favorites", current: false },
        { name: "Offers", to: "/customer/offers", current: false },
    ],
    admin:[
      { name: "Properties", to: "/properties", current: false },
      { name: "Owners", to: "/admin/owners", current: false },
      { name: "Customers", to: "/admin/customers", current: false },
    ]
  }

  const logout = () => {
    dispatch({type: 'clear'})
    localStorage.clear();
    navigation("/");
  };
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border-none border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              state && state.role == "" &&
              (
                <>
                  <li>
                    <div className="px-4 py-1 border-none rounded-sm bg-slate-600 text-slate-50 duration-300 hover:text-slate-900 hover:bg-slate-50">
                      <Link to="login">Login</Link>
                    </div>
                  </li>
                  <li>
                    <div className="px-4 py-1 border-none rounded-sm bg-slate-600 text-slate-50 duration-300 hover:text-slate-900 hover:bg-slate-50">
                      <Link to="signup">Signup</Link>
                    </div>
                  </li>
                </>
              )
            }
            {
              state && state.role == "CUSTOMER" && (
                <>
                  <div className="text-white flex items-center"><FontAwesomeIcon icon={faUser} className="mr-1"/> {state.name}</div>
                  <div>
                    <button onClick={()=>logout()} className="text-white"><FontAwesomeIcon icon={faRightFromBracket} /></button>
                  </div>
                </>
              )
            }

          </ul>
        </div>
      </div>
    </nav>
  )
}