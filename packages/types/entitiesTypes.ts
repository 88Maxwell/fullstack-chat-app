import { Identifier, Image, Timestamp } from "./commonTypes";

export type UserStatus = "online" | "offline";
export type UserType = "human" | "ignore-bot" | "spam-bot" | "reverse-bot" | "echo-bot";
export interface User {
  id: Identifier;
  email: string;
  name: string;
  type: UserType;
  avatar?: Image;
  status: UserStatus;
  bio: string;
}

export interface ClientChat {
  id: string;
  user: User;
  createdAt: Timestamp;
}

export interface Message {
  id: Identifier;
  chatId: ClientChat["id"];
  text: string;
  sender: User;
  createdAt: Timestamp;
  readAt?: Timestamp;
}
  