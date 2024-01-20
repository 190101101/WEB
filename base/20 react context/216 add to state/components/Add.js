import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Add = () => {
  const [usersList, setUsersList] = useContext(UserContext);

  const addUser = () => {
    setUsersList([
      ...usersList,
      {
        id: Math.random(),
        username: `user[${Math.round(Math.random() * 10000)}]`,
      },
    ]);
  };

  return (
    <div>
      <button onClick={addUser}>add user</button>
    </div>
  );
};

export default Add;
