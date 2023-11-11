import { createPersistedStore } from "./createPersistedStore";

function createEntrypoint() {
  const store = createPersistedStore();

  return { store };
}

export const { store } = createEntrypoint();
