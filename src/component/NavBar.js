import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRoleContext } from "../context/roleContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


export const NavBar = () => {
  const { state, dispatch } = useRoleContext();
  const router = useLocation();
  const navigation = useNavigate();
  const [mainLink, setMainLink] = useState([]);
  useEffect(() => {
    loadMainLink();
  }, [state]);
  let allLink = {
    owner: [
      { lable: "Properties", link: "/properties"},
      { lable: "My Properties", link: "/owner/properties/my-property"},
      { lable: "Offers", link: "/owner/offers"},
    ],
    customer: [
      { lable: "Properties", link: "/properties"},
      { lable: "My List", link: "/customer/my-list"},
      { lable: "Offers", link: "/customer/offers"},
    ],
    admin: [
      { lable: "Properties", link: "/properties"},
      { lable: "Members", link: "/admin/members"},
    ]
  }
  const loadMainLink = () => {
    switch (state && state.role) {
      case "OWNER":
        setMainLink(allLink.owner);
        break;
      case "CUSTOMER":
        setMainLink(allLink.customer);
        break;
      case "ADMIN":
        setMainLink(allLink.admin);
        break;
    }
  }

  const logout = () => {
    dispatch({ type: 'clear' });
    setMainLink([]);
    localStorage.clear();
    navigation("/");
  };
  const setActive = (id) => {
    let main = mainLink;
    main.map((res, index) => {
      res.active = false;
        if(index == id){
          res.active = true;
        }
    })
    setMainLink(main);
  }
  return (
    <nav class="bg-gray-900 border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div class="w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border-none border-gray-100 rounded-lg bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              mainLink && mainLink.map((res,index) => {
                return (
                  <li>
                    <Link to={res.link}
                    key={index}
                    onClick={()=>setActive(index)}
                      className={`text-white hover:text-indigo-200 px-3 py-2 text-sm font-medium rounded-md ${ router.pathname == res.link ? "bg-blue-700" : "bg-transparent" }`}
                      >{res.lable}</Link>
                  </li>
                )
              })
            }
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
              state && state.role != "" && (
                <>
                  <div className="text-white flex items-center"><FontAwesomeIcon icon={faUser} className="mr-1" /> {state.name}</div>
                  <div>
                    <button onClick={() => logout()} className="text-white"><FontAwesomeIcon icon={faRightFromBracket} /></button>
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