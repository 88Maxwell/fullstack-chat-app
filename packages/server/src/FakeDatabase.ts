import { v4 as uuidv4 } from "uuid";
import type { Chat, Message, User } from "@chat-app/types";
import UserFakeDatabase from "./domains/user/UserFakeDatabase";
import ChatFakeDatabase from "./domains/chat/ChatFakeDatabase";

export default class FakeDatabase {
  private chatIdToUsersIdsMap: Record<Chat["id"], Record<User["id"], User["id"]>> = {};

  userFakeDatabase: UserFakeDatabase;

  chatFakeDatabase: ChatFakeDatabase;

  constructor(userFakeDatabase:UserFakeDatabase, chatFakeDatabase: ChatFakeDatabase) {
    this.userFakeDatabase = userFakeDatabase;
    this.chatFakeDatabase = chatFakeDatabase;
  }

  createChatsForUser(user: User) {
    const users = this.userFakeDatabase.getUsers();
    const chats = users.map((u) => {
      const chatId = this.getExistedChatId(user.id, u.id);

      if (chatId) return this.chatFakeDatabase.getChatById(chatId);

      const chat = this.chatFakeDatabase.createChat();
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
    const chats = this.chatFakeDatabase.getChats();
    return chats.map((c) => this.includeUserToChat(c, userId));
  }

  private includeUserToChat(c: Omit<Chat, "user">, userId: User["id"]) {
    const targetUserId = this.chatIdToUsersIdsMap[c.id][userId];
    const user = this.userFakeDatabase.getUserById(targetUserId);
    return { ...c, user };
  }

  createMessage(chatId: Chat["id"], senderId: User["id"], text: string) {
    const sender = this.userFakeDatabase.getUserById(senderId);
    return {
      id        : uuidv4(),
      text,
      chatId,
      sender,
      createdAt : Date.now(),
    } satisfies Message;
  }
}
