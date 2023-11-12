import clsx from "clsx";
import UserProfileSection from "domains/user/components/UserProfileSection/UserProfileSection";
import Button from "domains/common/components/Button";
import MessageInput from "domains/message/components/MessageInput/MessageInput";
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
        {/* TODO: better to use new  Section component */}
        <div className={style.newMessageSection}>
          <MessageInput className={style.textFieldInput} />
          <Button className={style.sendButton} onClick={() => null}>Send Message</Button>
        </div>
      </section>
    </main>
  );
}

export default ChatSection;
