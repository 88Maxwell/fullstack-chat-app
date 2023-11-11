import { store } from "app/store";
import ChatPage from "domains/chat/pages/ChatPage";
import { Provider as ReduxProvider } from "react-redux";
import "../app.scss";

function App() {
  return (
    <ReduxProvider store={store}>
      <ChatPage />
    </ReduxProvider>
  );
}

export default App;
