import { v4 as uuidv4 } from "uuid";
import type { Chat } from "@chat-app/types";

export default class ChatFakeDatabase {
  private chatsMap: Record<Chat["id"], Omit<Chat, "user">> = {};

  getAllChats() {
    return Object.values(this.chatsMap);
  }

  createChat() {
    const chatId = uuidv4();
    const chat = {
      id        : chatId,
      createdAt : Date.now(),
    };

    this.chatsMap[chatId] = chat;

    return chat;
  }

  getChatById(chatId: Chat["id"]) {
    return this.chatsMap[chatId];
  }
}
