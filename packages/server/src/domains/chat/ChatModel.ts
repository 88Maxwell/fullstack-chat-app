import { User } from "@chat-app/types";
import FakeDatabase from "../../FakeDatabase";

export default class ChatModel {
  constructor(private fakeDb: FakeDatabase) {

  }

  getChats(userId: User["id"], userNameFilter?: string) {
    const chats = this.fakeDb.getChatsForUser(userId);

    if (!userNameFilter) return chats;

    return chats.filter((c) => {
      if (!c.user) return false;
      const nameToCompare = c.user.name.slice(0, userNameFilter.length);
      return nameToCompare === userNameFilter;
    });
  }
}
