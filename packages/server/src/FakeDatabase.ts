import { v4 as uuidv4 } from "uuid";
import type { Chat, Message, User } from "@chat-app/types";
import UserFakeDatabase from "./domains/user/UserFakeDatabase";
import ChatFakeDatabase from "./domains/chat/ChatFakeDatabase";

export default class FakeDatabase {
  private chatIdToUsersIdsMap: Record<Chat["id"], Record<User["id"], User["id"]>> = {};

  // COMMENT: I know that we should use it in model and don`t inject there .. but I don`t have enough time for that
  user: UserFakeDatabase;

  // COMMENT: I know that we should use it in model and don`t inject there .. but I don`t have enough time for that
  chat: ChatFakeDatabase;

  constructor(userFakeDatabase: UserFakeDatabase, chatFakeDatabase: ChatFakeDatabase) {
    this.user = userFakeDatabase;
    this.chat = chatFakeDatabase;
  }

  createChatsForUser(user: User) {
    const users = this.user.getUsers();
    const chats = users
      .filter((u) => u.id !== user.id)
      .map((u) => {
        const chatId = this.getExistedChatId(user.id, u.id);
        if (chatId) return this.chat.getChatById(chatId);

        const chat = this.chat.createChat();
        this.chatIdToUsersIdsMap[chat.id] = {
          [user.id] : u.id,
          [u.id]    : user.id,
        };
        return chat;
      });

    return chats;
  }

  private getExistedChatId(userId1: User["id"], userId2: User["id"]) {
    const chatIdToUsersIdEntry = Object
      .entries(this.chatIdToUsersIdsMap)
      .find(([,mapping]) => mapping[userId1] === userId2 && mapping[userId2] === userId1);
    if (!chatIdToUsersIdEntry) return null;
    return chatIdToUsersIdEntry[0];
  }

  getChatsForUser(userId: User["id"]) {
    const chats = this.chat
      .getAllChats()
      .filter((c) => !!this.chatIdToUsersIdsMap[c.id][userId])
      .map((c) => this.includeTargetUserToChat(c, this.chatIdToUsersIdsMap[c.id][userId]));
    return chats;
  }

  getChatsWithUser(userId: User["id"]) {
    const chats = this.chat
      .getAllChats()
      .filter((c) => !!this.chatIdToUsersIdsMap[c.id][userId])
      .map((c) => this.includeTargetUserToChat(c, userId));
    return chats;
  }

  getChatForUser(chatId: Chat["id"], userId: User["id"]) {
    const targetUserId = this.chatIdToUsersIdsMap[chatId][userId];
    const chat = this.chat.getChatById(chatId);
    return this.includeTargetUserToChat(chat, targetUserId);
  }

  getChatWithUser(chatId: Chat["id"], userId: User["id"]) {
    const chat = this.chat.getChatById(chatId);
    return this.includeTargetUserToChat(chat, userId);
  }

  getTargetUserForUser(chatId: Chat["id"], userId: User["id"]) {
    const targetUserId = this.chatIdToUsersIdsMap[chatId][userId];
    return this.user.getUserById(targetUserId);
  }

  private includeTargetUserToChat(c: Omit<Chat, "user">, userId: User["id"]) {
    const user = this.user.getUserById(userId);
    return { ...c, user };
  }

  createMessage(chatId: Chat["id"], senderId: User["id"], text: string) {
    const sender = this.user.getUserById(senderId);
    return {
      id        : uuidv4(),
      text,
      chatId,
      sender,
      createdAt : Date.now(),
    } satisfies Message;
  }
}
