import { addChatToList } from "domains/chat/store/chats";
import { OnUserAuthorizedParams } from "@chat-app/types";
import { AppDispatch } from "..";

export const onUserAuthorizedAction = (params: OnUserAuthorizedParams) => (dispatch: AppDispatch) => {
  dispatch(addChatToList({ chat: params.chat }));
};
