import type { AnyAction, Middleware } from "@reduxjs/toolkit";
import type { AppDispatch } from "app/store";
import { onMessageAction } from "app/store/socketActions/onMessageAction";
import { emitCloseAction, emitConnectAction, emitMessageAction } from "app/store/socketActions/socketEmiterActions";
import { SocketService } from "services";

// eslint-disable-next-line max-len
export const getSocketServiceMiddleware = (): Middleware => ({ getState, dispatch }) => (next: AppDispatch) => {
  const customNext = (f: (...args:any[]) => void) => f(dispatch, getState);

  let socketService: SocketService;

  const initSocket = async () => {
    socketService = new SocketService("http://localhost:8002");

    socketService.onMessage((...args) => next(onMessageAction(...args)));
    await socketService.connect();
  };

  return (action: AnyAction) => {
    if (emitConnectAction.match(action)) initSocket();
    else if (emitCloseAction.match(action)) socketService.close();
    else if (emitMessageAction.match(action)) socketService.sendMessage(action.payload);

    return next(action);
  };
};
