import { OnMessageParams } from "@chat-app/types";
import { addMessage } from "domains/message/store/messages";
import { AppDispatch } from "..";

export const onMessageAction = (params: OnMessageParams) => (dispatch: AppDispatch) => {
  dispatch(addMessage({ chatId: params.chatId, message: params.message }));
};
