import type { AnyAction, Middleware } from "@reduxjs/toolkit";
import type { AppDispatch, AppThunkContext } from "app/store";
import { onGoesOfflineAction } from "app/store/socketActions/onGoesOfflineAction";
import { onMessageAction } from "app/store/socketActions/onMessageAction";
import { onUserAuthorizedAction } from "app/store/socketActions/onUserAuthorizedAction";
import { emitCloseAction, emitMessageAction } from "app/store/socketActions/socketEmiterActions";
import { getFakeUser } from "app/utils/getFakeUser";
import { SocketService } from "services";

// eslint-disable-next-line max-len
export const getSocketServiceMiddleware = (appThunkContext:AppThunkContext): Middleware => ({ getState, dispatch }) => (next: AppDispatch) => {
  const user = getFakeUser();
  appThunkContext.services.apiService.userApi.authorize(user.id);
  const customNext = (f: (...args:any[]) => void) => f(dispatch, getState);
  const socketService = new SocketService("http://localhost:8002", {
    userId : user.id,
  });
  socketService.onConnected(() => socketService.authorize({ user }));
  socketService.onAuthorized((...args) => customNext(onUserAuthorizedAction(...args)));
  socketService.onGoesOffline((...args) => customNext(onGoesOfflineAction(...args)));
  socketService.onMessage((...args) => customNext(onMessageAction(...args)));
  socketService.connect();

  return (action: AnyAction) => {
    if (emitCloseAction.match(action)) socketService.close();
    else if (emitMessageAction.match(action)) socketService.sendMessage(action.payload);

    return next(action);
  };
};
