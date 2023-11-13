import clsx from "clsx";
import UserProfileSection from "domains/user/components/UserProfileSection/UserProfileSection";
import Button from "domains/common/components/Button";
import MessageInput from "domains/message/components/MessageInput/MessageInput";
import MessageList from "domains/message/components/MessageList";
import MessageItem from "domains/message/components/Message";
import { ChatSectionProps } from "./ChatSectionTypes";
import style from "./ChatSection.module.scss";
import { useChatSectionController } from "./useChatSectionController";

function ChatSection({ className, chat }: ChatSectionProps) {
  const {
    state : { draftMessage, messages },
    actions : { handleChangeDraftMessage, handleSendMessage, handleSendMessageOnKeyDown },
  } = useChatSectionController(chat);

  return (
    <main className={clsx(style.container, className)}>
      {chat.user ? <UserProfileSection user={chat.user} /> : null}
      <div className={style.messageListContainer}>
        <MessageList className={style.messageList}>
          {messages.map((m) => <MessageItem key={m.id} className={style.messageItem} own message={m} />)}
        </MessageList>
      </div>
      <div className={style.newMessageSection}>
        <MessageInput
          onKeyDown={handleSendMessageOnKeyDown}
          value={draftMessage}
          onChange={handleChangeDraftMessage}
          className={style.textFieldInput}
        />
        <Button className={style.sendButton} onClick={handleSendMessage}>Send Message</Button>
      </div>
    </main>
  );
}

export default ChatSection;
