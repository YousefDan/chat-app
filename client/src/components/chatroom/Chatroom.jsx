import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Context from "../../context/context";
import "./chatroom.scss";

const Chatroom = () => {
  const { socket, setOpenChatroom } = useContext(Context);

  const [messageList, setMessageList] = useState([]);
  const [msg, setMsg] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
    socket.on("user_room", (data) => {
      setRoomInfo(data);
    });
  }, [socket]);

  // Send Message Handler
  const sendMessageHandler = () => {
    if (msg.trim() !== "") {
      socket.emit("send_message", msg);
      setMsg("");
    }
  };

  // User Leave Handler
  const userLeaveHandler = () => {
    socket.emit("user_left");
    setOpenChatroom(false);
  };

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageList]);

  return (
    <section className="chatroom">
      <div className="chatroomHeader">
        <div className="chatroomTitle">
          <i className="fas fa-smile"></i>
          <span>ChatCord</span>
        </div>
        <div onClick={userLeaveHandler} className="leaveRoomBtn">
          Leave Room
        </div>
      </div>
      <div className="chatroomBody">
        <div className="chatroomSideber">
          <div className="roomNameWrapper">
            <div className="roomNameTitle">
              <div>
                <i className="fas fa-comments"></i>
                RoomName:
              </div>
              <div className="theRoom">{roomInfo?.room}</div>
            </div>
            <div className="onlineUsersWrapper">
              <i className="fas fa-users"></i>
              <span>Online Users:</span>
              <ul className="onlineUsersList">
                {roomInfo?.users.map((user, index) => (
                  <li key={index} className="onlineUser">
                    {user.username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="messagesContainer">
          {messageList.map((msg, index) => (
            <div ref={scrollRef} key={index} className="messageWrapper">
              <div className="messageInfo">
                <span>{msg.username}</span>
                <span>{msg.time}</span>
              </div>
              <p className="message">{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="chatroomFooter">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          placeholder="Enter Message"
          onKeyPress={(e) => e.key === "Enter" && sendMessageHandler()}
        />
        <button onClick={sendMessageHandler} className="sendMsgBtn">
          <i className="fas fa-paper-plane"></i>
          Send
        </button>
      </div>
    </section>
  );
};

export default Chatroom;
