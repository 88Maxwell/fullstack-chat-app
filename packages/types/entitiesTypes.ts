import { Identifier, Image, Timestamp } from "./commonTypes";

export type UserStatus = "online" | "offline";
export interface User {
  id: Identifier;
  email: string;
  name: string;
  avatar?: Image;
  status: UserStatus;
  bio: string;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage?: Message;
  createdAt: Timestamp;
}

export interface Message {
  id: Identifier;
  chatId: Chat["id"];
  text: string;
  sender: User;
  createdAt: Timestamp;
}
  