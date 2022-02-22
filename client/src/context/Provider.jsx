import { useState } from "react";
import Context from "./context";
import { toast } from "react-toastify";
import io from "socket.io-client"

const socket = io("http://localhost:5000")

const Provider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [openChatroom, setOpenChatroom] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      return toast.error("Username is required");
    }
    if (room.trim() === "") {
      return toast.error("Select A Room Please");
    }

    socket.emit("join_user", {username,room})
    setOpenChatroom(true);
    setUsername("");
    setRoom("");
  };

  return (
    <Context.Provider
      value={{
        username,
        room,
        openChatroom,
        setUsername,
        setRoom,
        setOpenChatroom,
        formSubmitHandler,
        socket,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
