import type { AnyAction, Middleware } from "@reduxjs/toolkit";
import type { AppDispatch } from "app/store";
import { onMessageAction } from "app/store/socketActions/onMessageAction";
import { emitCloseAction, emitMessageAction } from "app/store/socketActions/socketEmiterActions";
import { SocketService } from "services";

// eslint-disable-next-line max-len
export const getSocketServiceMiddleware = (): Middleware => ({ getState, dispatch }) => (next: AppDispatch) => {
  const customNext = (f: (...args:any[]) => void) => f(dispatch, getState);

  const socketService = new SocketService("http://localhost:8002");
  socketService.onMessage((...args) => next(onMessageAction(...args)));
  socketService.connect();

  return (action: AnyAction) => {
    if (emitCloseAction.match(action)) socketService.close();
    else if (emitMessageAction.match(action)) socketService.sendMessage(action.payload);

    return next(action);
  };
};
