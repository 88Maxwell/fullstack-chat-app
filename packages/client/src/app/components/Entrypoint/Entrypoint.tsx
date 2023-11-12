import ChatPage from "domains/chat/pages/ChatPage";
import { Provider as ReduxProvider } from "react-redux";
import "../app.scss";
import { ConnectedRouter } from "connected-react-router";
import ServicesProviders from "app/providers/ServicesProviders";
import { history, services, store } from "app/store";

function Entrypoint() {
  return (
    <ReduxProvider store={store}>
      <ServicesProviders services={services}>
        <ConnectedRouter history={history}>
          {/* TODO: Add error boundary */}
          <ChatPage />
        </ConnectedRouter>
      </ServicesProviders>
    </ReduxProvider>
  );
}

export default Entrypoint;
