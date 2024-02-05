import React, { useCallback, useEffect, useReducer, useState, createContext, useContext } from "react";



function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { id: action.payload.id, name: action.payload.name, role: action.payload.role };
    case 'clear':
      return {id: null, name: '', role: ''};
    default:
      return state;
  }
}
const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { id: null, name:'', role:'' });

  return (
    <RoleContext.Provider value={{ state, dispatch }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRoleContext = () => {
  return useContext(RoleContext);
}
