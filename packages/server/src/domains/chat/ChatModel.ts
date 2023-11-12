import FakeDatabase from "../../FakeDatabase";

export default class ChatModel {
  constructor(private fakeDb: FakeDatabase) {

  }

  getChats(userNameFilter?: string) {
    const chats = this.fakeDb.getChats();

    if (!userNameFilter) return chats;

    return chats.filter((c) => {
      const nameToCompare = c.user.name.slice(0, userNameFilter.length);
      return nameToCompare === userNameFilter;
    });
  }
}
