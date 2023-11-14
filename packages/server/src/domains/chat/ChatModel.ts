import { User, UserStatus } from "@chat-app/types";
import FakeDatabase from "../../FakeDatabase";

interface ChatFilters {
  userName?: string;
  userStatus?: UserStatus | null;
}
export default class ChatModel {
  constructor(private fakeDb: FakeDatabase) {

  }

  getChats(userId: User["id"], { userName, userStatus }: ChatFilters) {
    let chats = this.fakeDb.getChatsForUser(userId);

    if (userName) {
      chats = chats.filter((c) => {
        if (!c.user) return false;
        const nameToCompare = c.user.name.toLowerCase().slice(0, userName.length);
        return nameToCompare === userName.toLowerCase();
      });
    }
    if (userStatus) {
      chats = chats.filter((c) => c.user.status === userStatus);
    }

    return chats;
  }
}
