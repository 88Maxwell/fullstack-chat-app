import { store } from "app/store";
import ChatPage from "domains/chat/ChatPage";
import { Provider as ReduxProvider } from "react-redux";

function App() {
  return (
    <ReduxProvider store={store}><ChatPage/></ReduxProvider>
  );
}

export default App;
