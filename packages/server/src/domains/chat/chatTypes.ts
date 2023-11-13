import type { ClientChat, User } from "@chat-app/types";

export type ServerChat = Omit<ClientChat, "user"> & {
  user1: User;
  user2: User;
};
