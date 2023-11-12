import { Identifier, Timestamp, User } from "@chat-app/types";

export interface Message {
  id: Identifier;
  text: string;
  sender: User;
  createdAt: Timestamp;
}
