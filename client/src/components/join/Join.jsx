import { useContext } from "react";
import Context from "../../context/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./join.scss";

const Join = () => {
  const { username, room, setUsername, setRoom, formSubmitHandler } =
    useContext(Context);
  return (
    <section className="join">
      <ToastContainer />
      <div className="joinTitle">
        <i className="fas fa-smile"></i>
        <h1>ChatCord</h1>
      </div>
      <form onSubmit={formSubmitHandler} className="joinForm">
        <div className="inputGroup">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Username..."
          />
        </div>
        <div className="inputGroup">
          <label>Room</label>
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            <option value="">Select A Room</option>
            <option value="Javascript">Javascript</option>
            <option value="PHP">PHP</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <button className="joinBtn" type="submit">
          Join
        </button>
      </form>
    </section>
  );
};

export default Join;
