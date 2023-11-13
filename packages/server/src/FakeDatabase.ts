import { v4 as uuidv4 } from "uuid";
import type { Message, User } from "@chat-app/types";
import type { ServerChat } from "./domains/chat/chatTypes";
import { botUsers } from "./mockData";

export default class FakeDatabase {
  private usersMap: Record<User["id"], User> = {};

  private chatsMap: Record<User["id"], ServerChat> = {};

  constructor() {
    this.usersMap = botUsers;
    Object.values(this.usersMap).forEach((u) => this.createChatsForUser(u));
  }

  getUsers() {
    return Object.values(this.usersMap);
  }

  getChats() {
    return Object.values(this.chatsMap);
  }

  getUserByChatId(chatId: ServerChat["id"]) {
    const targetChat = this.chatsMap[chatId];
    if (!targetChat) return null;
    return targetChat.user1;
  }

  createFakeUser(name?: string) {
    const id = uuidv4();
    const user = {
      id,
      bio    : "Random user",
      type   : "human",
      email  : `${id}@mail.co`,
      status : "online",
      name   : name || `${id}-name`,
    } satisfies User;

    const isExist = this.usersMap[id];
    if (!isExist) {
      this.usersMap[id] = user;
    }

    return user;
  }

  createChatsForUser(user: User) {
    Object.values(this.usersMap)
      .forEach((u) => this.createChatBetweenUsers(user, u));

    return this.chatsMap;
  }

  createChatBetweenUsers(u1: User, u2: User): ServerChat {
    const currentChat = Object.values(this.chatsMap).find((c) => {
      const cond1 = (c.user1.id === u1.id && c.user2.id === u2.id);
      const cond2 = (c.user1.id === u2.id && c.user2.id === u1.id);
      return cond1 || cond2;
    });

    if (currentChat) return currentChat;

    const chat = {
      id        : uuidv4(),
      user1     : u1,
      user2     : u2,
      createdAt : Date.now(),
    };
    this.chatsMap[chat.id] = chat;

    return chat;
  }

  getChatById(chatId: ServerChat["id"]) {
    return this.chatsMap[chatId];
  }

  createMessage(chatId: ServerChat["id"], senderId: User["id"], text: string) {
    const sender = this.usersMap[senderId];
    return {
      id        : uuidv4(),
      text,
      chatId,
      sender,
      createdAt : Date.now(),
    } satisfies Message;
  }
}
