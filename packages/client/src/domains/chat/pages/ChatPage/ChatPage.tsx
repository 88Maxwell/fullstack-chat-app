import Button from "domains/common/components/Button";
import UserProfileSection from "domains/user/components/UserProfileSection/UserProfileSection";
import ChatList from "domains/chat/components/ChatList";
import ChatListItem from "domains/chat/components/ChatListItem/ChatListItem";
import { User } from "domains/user/entity";
import { Chat } from "domains/chat/entity";
import style from "./ChatPage.module.css";

function ChatPage() {
  const handleClick = () => null;
  const user = {} as User;
  const chat = {} as Chat;

  return (
    <div className={style.container}>
      <main className={style.chat}>
        <UserProfileSection user={user} />
        <section className={style.chatContainer}>
          <ChatList>
            <ChatListItem chat={chat} />
          </ChatList>
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
