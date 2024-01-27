import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: (data) => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: state.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data) => {
    dispatch({
      type: "Login",
      payload: data,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export {AuthContext, AuthProvider};
