import { createBrowserHistory } from "history";
import { createPersistedStore } from "./createPersistedStore";
import { initializeServices } from "./initializeServices";

function createEntrypoint() {
  const history = createBrowserHistory();
  const services = initializeServices();
  const store = createPersistedStore(history, { thunkContext: { services } });

  return {
    history,
    store,
    services,
  };
}

export const { history, store, services } = createEntrypoint();
