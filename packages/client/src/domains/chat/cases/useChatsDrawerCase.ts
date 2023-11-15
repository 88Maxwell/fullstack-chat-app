import { useTypedSelector } from "domains/common/hooks/useTypedSelector";
import { useTypedDispatch } from "domains/common/hooks/useTypedDispatch";
import { selectIsChatsDrawerShown } from "../store/chatsDrawer/chatsDrawerSelectors";
import { hideChatsDrawer, showChatsDrawer } from "../store/chatsDrawer";

export function useChatsDrawerCase() {
  const isChatsDrawerShown = useTypedSelector(selectIsChatsDrawerShown);
  const dispatch = useTypedDispatch();
  const handleShowChatsDrawer = () => dispatch(showChatsDrawer());
  const handleHideChatsDrawer = () => dispatch(hideChatsDrawer());
  const handleToogleChatsDrawer = () => {
    if (isChatsDrawerShown) dispatch(hideChatsDrawer());
    else dispatch(showChatsDrawer());
  };
  return {
    state : {
      isChatsDrawerShown,
    },
    actions : {
      handleShowChatsDrawer,
      handleHideChatsDrawer,
      handleToogleChatsDrawer,
    },
  };
}
