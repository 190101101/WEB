import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const AuthReducer = (state, action) => {
  switch(action.type){
    case 'LOGIN':
      return {...state, user:action.payload};
    case 'LOGOUT':
      return {user:null};
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = (data) => {
    dispatch({
      type: "LOGIN",
      payload: data,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider value={{user: state.user, login, logout}}>
        {...props}
    </AuthContext.Provider>
  )
};

export {AuthProvider, AuthContext};