import type { AppDispatch, AppThunkContext } from "app/store";
import { addChatToList } from "../getChatsSlice";
import { AddChatToListActionParams } from "../getChatsTypes";

// eslint-disable-next-line max-len
export const addChatToListAction = ({ chatId }: AddChatToListActionParams) => async (dispatch: AppDispatch, _: unknown, { services }: AppThunkContext) => {
  try {
    // const { chat } = await services.apiService.chatApi.getChat(chatId);

    // dispatch(addChatToList({ chat }));
  } catch (error) {
    reportError(error);
  }
};
