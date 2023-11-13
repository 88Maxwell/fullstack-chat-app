import { v4 as uuidv4 } from "uuid";
import type { Chat, User } from "@chat-app/types";
import { botUsers } from "./mockData";

export default class FakeDatabase {
  private usersMap: Record<User["id"], User> = {};

  private chatsMap: Record<User["id"], Chat> = {};

  constructor() {
    this.usersMap = botUsers;
    this.chatsMap = Object.values(this.usersMap).reduce((acc, u) => {
      Object.values(this.usersMap).reduce((a, u2) => u.id !== u, {});
      const c = this.createChatBetweenUsers(u);
      return { ...acc, [c.id]: c };
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
      bio    : "Random user",
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
    this.chatsMap = Object.values(this.usersMap)
      .map((u) => this.createChatBetweenUsers(user, u))
      .reduce((acc, c) => ({ ...acc, [c.id]: c }), this.chatsMap);

    return this.chatsMap;
  }

  createChatBetweenUsers(u: User, u2: User): Chat {
    const chat = {
      id        : uuidv4(),
      createdAt : Date.now(),
      user      : u,
    };
    this.chatsMap[chat.id] = chat;

    return chat;
  }
}
