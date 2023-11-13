import { addChatToList } from "domains/chat/store/getChats";
import { OnUserAuthorizedParams } from "@chat-app/types";
import { AppDispatch } from "..";

export const onUserAuthorizedAction = (params: OnUserAuthorizedParams) => (dispatch: AppDispatch) => {
  dispatch(addChatToList({ chat: params.chat }));
};
