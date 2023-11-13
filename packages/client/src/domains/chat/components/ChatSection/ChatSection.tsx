import clsx from "clsx";
import UserProfileSection from "domains/user/components/UserProfileSection/UserProfileSection";
import Button from "domains/common/components/Button";
import MessageInput from "domains/message/components/MessageInput/MessageInput";
import MessageList from "domains/message/components/MessageList";
import MessageItem from "domains/message/components/Message";
import { Message } from "@chat-app/types";
import Typing from "domains/message/components/Typing";
import { ChatSectionProps } from "./ChatSectionTypes";
import style from "./ChatSection.module.scss";

function ChatSection({ className, chat }: ChatSectionProps) {
  const { user } = chat;

  const m1 = {
    createdAt : 1699828148807,
    id        : "9fa155e9-c749-456c-acbe-782f059c7729",
    chatId    : "f6c75aeb-14f9-45cb-96cc-a89fbd7d5292",
    readAt    : Date.now(),
    sender    : {
      id     : "b19d8287-45a2-4604-83f0-974e96119182",
      name   : "Maksym",
      email  : "echo-bot@some.com",
      status : "online",
      bio    : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate corrupti incidunt consectetur quae doloribus hic ipsa neque debitis voluptatibus doloremque. Tempore, ipsa ipsam libero illo, cum necessitatibus iste neque ex voluptatum possimus exercitationem magnam vel iure praesentium obcaecati, nesciunt voluptas.",
      avatar : {
        urls : {
          large : "https://dummyimage.com/170x170/bf64bf/fff.jpg",
          small : "https://dummyimage.com/60x60/bf64bf/fff.jpg",
        },
        alt : "Echo bot",
      },
    },
    text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ipsam dolor magnam, dignissimos dolores necessitatibus nihil autem tempore rerum cumque!",
  } satisfies Message;

  return (
    <main className={clsx(style.container, className)}>
      <UserProfileSection user={user} />
      <div className={style.messageListContainer}>
        <MessageList className={style.messageList}>
          <Typing senderName={user.name} />
          <MessageItem className={style.messageItem} own message={m1} />
          <MessageItem className={style.messageItem} own message={m1} />
          <MessageItem className={style.messageItem} own message={m1} />
          <MessageItem className={style.messageItem} own message={m1} />
          <MessageItem className={style.messageItem} message={m1} />
          <MessageItem className={style.messageItem} own message={m1} />
          <MessageItem className={style.messageItem} own message={m1} />
          <MessageItem className={style.messageItem} own message={m1} />
          <MessageItem className={style.messageItem} own message={m1} />
          <MessageItem className={style.messageItem} own message={m1} />
        </MessageList>
        {/* TODO: better to use new  Section component */}
      </div>
      <div className={style.newMessageSection}>
        <MessageInput className={style.textFieldInput} />
        <Button className={style.sendButton} onClick={() => null}>Send Message</Button>
      </div>
    </main>
  );
}

export default ChatSection;
