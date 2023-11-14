import type { User } from "@chat-app/types";
import { botUsers } from "../../mockData";

export default class UserFakeDatabase {
  private usersMap: Record<User["id"], User> = {};

  constructor() {
    this.usersMap = botUsers;
  }

  getUsers() {
    return Object.values(this.usersMap);
  }

  getUserById(userId: User["id"]) {
    return this.usersMap[userId];
  }

  addUser(user:User) {
    this.usersMap[user.id] = user;
    return user;
  }

  setUserStatus(userId:User["id"], status: User["status"]) {
    const targetUser = this.usersMap[userId];
    if (!targetUser) return null;
    targetUser.status = status;
    return targetUser;
  }
}
