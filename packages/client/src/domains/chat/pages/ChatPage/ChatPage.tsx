import Button from "domains/common/components/Button";
import UserProfileSection from "domains/user/components/UserProfileSection/UserProfileSection";
import ChatListSection from "domains/chat/components/ChatListSection";
import { Chat, User } from "@chat-app/types";
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
      <ChatListSection />
    </div>
  );
}

export default ChatPage;
