import Button from "domains/common/components/Button";
import UserProfileSection from "domains/user/components/UserProfileSection/UserProfileSection";
import ChatListSection from "domains/chat/components/ChatListSection";
import ChatListItem from "domains/chat/components/ChatListItem/ChatListItem";
import { User } from "domains/user/entity";
import { Chat } from "domains/chat/entity";
import style from "./ChatPage.module.scss";

function ChatPage() {
  const handleClick = () => null;
  const user = {} as User;
  const chat = {} as Chat;

  return (
    <div className={style.container}>
      <main className={style.chat}>
        <UserProfileSection user={user} />
        <section className={style.chatContainer}>
          <ChatListSection>
            <ChatListItem chat={chat} />
          </ChatListSection>
          <div className={style.messageList}>
            message
            message
            message
            message
            message
          </div>
          <div className={style.textField}>
            <input className={style.textFieldInput} type="text" />
            <Button onClick={handleClick}>Send Message</Button>
          </div>
        </section>
      </main>
      <aside className={style.chatList}>
        chatList
      </aside>
    </div>
  );
}

export default ChatPage;
