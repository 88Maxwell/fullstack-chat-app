import { OnGoesOfflineParams } from "@chat-app/types";
import { userGoesOffline } from "domains/chat/store/chats/chatsSlice";
import { AppDispatch } from "..";

export const onGoesOfflineAction = (params: OnGoesOfflineParams) => (dispatch: AppDispatch) => {
  dispatch(userGoesOffline({ userId: params.userId }));
};
