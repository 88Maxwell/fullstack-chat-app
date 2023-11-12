import { v4 as uuidv4 } from "uuid";
import type { Chat, Message, User } from "@chat-app/types";
import { botUsers } from "./mockData";

export default class FakeDatabase {
  private usersMap: Record<User["id"], User> = {};

  private chatsMap: Record<Chat["id"], Chat> = {};

  private messagesMap: Record<Message["id"], Message> = {};

  constructor() {
    this.usersMap = botUsers;
    this.chatsMap = Object.values(botUsers).reduce((acc, u) => {
      const c = this.createChatForUser(u);
      return { ...acc, [c.id]: c };
    }, {});
    this.messagesMap = Object.values(this.chatsMap).reduce((acc, c) => {
      const lastMessage = this.createMessageForChat("Lorem ipsum", c.user, c.id);
      this.chatsMap[c.id].lastMessage = lastMessage;

      return { ...acc, [lastMessage.id]: lastMessage };
    }, {});
  }

  getUsers() {
    return Object.values(this.usersMap);
  }

  getChats() {
    return Object.values(this.chatsMap);
  }

  getUserByChatId(chatId: Chat["id"]) {
    const targetChat = this.chatsMap[chatId];
    if (!targetChat) return null;
    return targetChat.user;
  }

  createFakeUser(name?: string) {
    const id = uuidv4();

    const user = {
      id,
      bio   : "Random user",
      email : `${id}@mail.co`,
      name  : name || `${id}-name`,
    };
    const isExist = this.usersMap[id];
    if (!isExist) {
      this.usersMap[id] = user;
    }

    return user;
  }

  createChatForUser(u: User, lastMessage?: Message): Chat {
    const chat = {
      id        : uuidv4(),
      createdAt : Date.now(),
      user      : u,
      lastMessage,
    };
    this.chatsMap[chat.id] = chat;

    return chat;
  }

  createMessageForChat(text:string, sender: User, chatId: Chat["id"]): Message {
    const message: Message = {
      createdAt : Date.now(),
      id        : uuidv4(),
      chatId,
      sender,
      text,
    };
    this.messagesMap[message.id] = message;

    return message;
  }
}
