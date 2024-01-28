import { v4 } from "uuid";

export const BookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [
        ...state,
        {
          title: action.book.title,
          author: action.book.author,
          id: v4(Math.random()),
        },
      ];
    case "REMOVE_BOOK":
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
};

import React, { createContext, useReducer, useEffect } from "react";
import { BookReducer } from "../reducers/BookReducer";

import { v4 } from "uuid";

const initialState = [
  { id: v4(Math.random()), title: "book 1", author: "person 1" },
  { id: v4(Math.random()), title: "book 2", author: "person 2" },
  { id: v4(Math.random()), title: "book 3", author: "person 3" },
];


export const BookContext = createContext();

export const BookProvider = (props) => {
  const [books, dispatch] = useReducer(BookReducer, initialState, () => {
    const localData = localStorage.getItem("books");
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};
