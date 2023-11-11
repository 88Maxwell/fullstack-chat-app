import { Chat, User } from "@chat-app/types";
import { v4 as uuidv4 } from "uuid";

export function getChats(users: User[]): Chat[] {
  return users.map((u) => ({
    id          : uuidv4(),
    createdAt   : Date.now(),
    user        : u,
    lastMessage : {
      id        : uuidv4(),
      text      : "Fake first message",
      sender    : u,
      createdAt : Date.now(),
    },
  }));
}
