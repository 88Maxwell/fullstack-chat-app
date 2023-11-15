import ChatListSection from "domains/chat/components/ChatListSection";
import ChatSection from "domains/chat/components/ChatSection";
import EmptyChatSection from "domains/chat/components/EmptyChatSection/EmptyChatSection";
import style from "./ChatPage.module.scss";
import { useChatPageController } from "./useChatPageController";

function ChatPage() {
  const { state: { chat } } = useChatPageController();
  return (
    <div className={style.container}>
      {chat ? <ChatSection chat={chat} /> : <EmptyChatSection />}
      <ChatListSection className={style.chatListWrapper} />
    </div>
  );
}

export default ChatPage;
