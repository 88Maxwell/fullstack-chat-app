import ChatListSection from "domains/chat/components/ChatListSection";
import ChatSection from "domains/chat/components/ChatSection";
import style from "./ChatPage.module.scss";

function ChatPage() {
  return (
    <div className={style.container}>
      <ChatSection chat={{
        id        : "f6c75aeb-14f9-45cb-96cc-a89fbd7d5292",
        createdAt : 1699828148807,
        user      : {
          id     : "b19d8287-45a2-4604-83f0-974e96119182",
          name   : "Echo bot",
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
        lastMessage : {
          createdAt : 1699828148807,
          id        : "9fa155e9-c749-456c-acbe-782f059c7729",
          chatId    : "f6c75aeb-14f9-45cb-96cc-a89fbd7d5292",
          sender    : {
            id     : "b19d8287-45a2-4604-83f0-974e96119182",
            name   : "Echo bot",
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
        },
      }}
      />
      <ChatListSection />
    </div>
  );
}

export default ChatPage;
