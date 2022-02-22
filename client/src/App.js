import { useContext } from "react";
import Context from "./context/context";
import Join from "./components/join/Join";
import Chatroom from "./components/chatroom/Chatroom";

const App = () => {
  const { openChatroom } = useContext(Context);
  return openChatroom ? <Chatroom /> : <Join />;
};

export default App;
