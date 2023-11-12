import { Provider as ReduxProvider } from "react-redux";
import "../app.scss";
import { ConnectedRouter } from "connected-react-router";
import ServicesProviders from "app/providers/ServicesProviders";
import { history, services, store } from "app/store";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

function Entrypoint() {
  return (
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <ServicesProviders services={services}>
            {/* TODO: Add error boundary */}
            <App />
          </ServicesProviders>
        </BrowserRouter>
      </ConnectedRouter>
    </ReduxProvider>
  );
}

export default Entrypoint;
