import { v4 as uuidv4 } from "uuid";
import type { Chat, Message, User } from "@chat-app/types";
import { botUsers } from "./mockData";

export default class FakeDatabase {
  private usersMap: Record<User["id"], User> = {};

  private chatsMap: Record<User["id"], Chat> = {};

  private userIdToChatIdMap: Record<User["id"], Chat["id"]> = {};

  private chatIdToUsersIdsMap: Record<Chat["id"], User["id"][]> = {};

  constructor() {
    this.usersMap = botUsers;
    this.chatsMap = this.getUsers().reduce((acc, u) => ({
      ...acc,
      ...this.generateChatsForUser(u),
    }), {});
  }

  getUsers() {
    return Object.values(this.usersMap);
  }

  getChats(userId: User["id"]) {
    return Object.values(this.chatsMap)
      .filter((c) => this.chatIdToUsersIdsMap[c.id].includes(userId))
      .map((c) => ({ ...c, user: this.getChatUserToInclude(userId, c.id) }));
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

  private generateChatsForUser(user: User) {
    const users = this.getUsers();

    return users.reduce((acc, u) => {
      const c = this.createChatBetweenUsers(user, u);
      if (!c) return acc;
      return ({ ...acc, [c.id]: c });
    }, this.chatsMap);
  }

  createChatsForUser(user: User) {
    return Object.values(this.generateChatsForUser(user));
  }

  createChatBetweenUsers(u1: User, u2: User) {
    if (u1.id === u2.id) return null;
    const chatId = uuidv4();
    this.chatIdToUsersIdsMap[chatId] = [u1.id, u2.id];
    this.userIdToChatIdMap[u1.id] = chatId;
    this.userIdToChatIdMap[u2.id] = chatId;

    const chat = {
      id        : chatId,
      createdAt : Date.now(),
    };

    return chat;
  }

  getChatUserToInclude(userId: User["id"], chatId: Chat["id"]) {
    const isCurrentChat = (this.chatIdToUsersIdsMap[chatId] || []).includes(userId);
    if (!isCurrentChat) return null;
    const notCurrentUserId = (this.chatIdToUsersIdsMap[chatId] || []).find((id) => userId !== id);
    if (!notCurrentUserId) return null;
    return this.usersMap[notCurrentUserId];
  }

  getChatById(userId: User["id"], chatId: Chat["id"]) {
    const targetChat = this.chatsMap[chatId];
    return { ...targetChat, user: this.getChatUserToInclude(userId, chatId) };
  }

  createMessage(chatId: Chat["id"], senderId: User["id"], text: string) {
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
