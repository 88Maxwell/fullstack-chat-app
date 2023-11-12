import clsx from "clsx";
import UserProfileSection from "domains/user/components/UserProfileSection/UserProfileSection";
import Button from "domains/common/components/Button";
import { ChatSectionProps } from "./ChatSectionTypes";
import style from "./ChatSection.module.scss";

function ChatSection({ className, chat }: ChatSectionProps) {
  const { user } = chat;

  return (
    <main className={clsx(style.container, className)}>
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
          <Button onClick={() => null}>Send Message</Button>
        </div>
      </section>
    </main>
  );
}

export default ChatSection;
