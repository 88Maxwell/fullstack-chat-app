import clsx from "clsx";
import { useChatsDrawerCase } from "domains/chat/cases/useChatsDrawerCase";
import Button from "domains/common/components/Button";
import style from "./ChatsDrawer.module.scss";
import { ChatsDrawerProps } from "./ChatsDrawerTypes";
import ChatListSection from "../ChatListSection";

function ChatsDrawer({ className }: ChatsDrawerProps) {
  const { state: { isChatsDrawerShown }, actions: { handleHideChatsDrawer } } = useChatsDrawerCase();

  if (!isChatsDrawerShown) return null;
  return (
    <div className={clsx(style.chatsDrawer, className)}>
      <div className={clsx(style.drawerHeading)}>
        <h2 className={style.chatListTypography}>Chat list</h2>
        <Button className={style.closeButton} onClick={handleHideChatsDrawer}>X</Button>
      </div>
      <ChatListSection className={style.chatListSection} />
    </div>
  );
}

export default ChatsDrawer;
