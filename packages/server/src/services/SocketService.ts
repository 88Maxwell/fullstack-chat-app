import {
  EmitAuthorizeParams, EmitMessageParams, User,
} from "@chat-app/types";
import http from "http";
import { Socket, Server as SocketServer } from "socket.io";
import FakeDatabase from "../FakeDatabase";
import { randomIntFromInterval } from "../domains/common/utils";

// COMMENT FOR REVIEWER
/*
  The architecture of server side was made for fast, cause I don`t have enough time.
  In the end I understand that I should have:
  - HumanStrategy/IgnoreStrategy/..(anotherBotStrategy) instead "If" statements
  - for mockData better to use @faker-js/faker
  - Instead hand-made in-memory db, use library for in memory DB
 */
export default class SocketService {
  private socketServer: SocketServer;

  private fakeDb: FakeDatabase;

  private userIdToSocketMap: Record<User["id"], Socket> = {};

  private socketIdToUserIdMap: Record<Socket["id"], User["id"]> = {};

  constructor(httpServer: http.Server, fakeDb: FakeDatabase) {
    this.socketServer = new SocketServer(httpServer, { cors: { origin: "*" } });
    this.fakeDb = fakeDb;
  }

  // eslint-disable-next-line class-methods-use-this
  public init() {
    this.socketServer.on("connect", (socket) => {
      socket.on("authorize", async ({ user }: EmitAuthorizeParams) => {
        this.fakeDb.user.addUser(user);
        this.fakeDb.user.setUserStatus(user.id, "online");
        this.fakeDb.createChatsForUser(user);
        const chats = this.fakeDb.getChatsForUser(user.id);
        const chatIds = chats.map((c) => c.id);
        await Promise.all(chats.map((c) => {
          const targetUserSocket = this.userIdToSocketMap[c.user.id];
          if (!targetUserSocket) return null;
          return targetUserSocket.join(c.id);
        }));
        await socket.join(chatIds);

        await Promise.all(
          this.fakeDb
            .getChatsWithUser(user.id)
            .map((c) => socket.to(c.id).emit("authorized", { chat: c })),
        );

        this.userIdToSocketMap[user.id] = socket;
        this.socketIdToUserIdMap[socket.id] = user.id;
      });

      socket.on("message", async (params: EmitMessageParams) => {
        if (!params.chatId) return;
        const currentUserId = this.socketIdToUserIdMap[socket.id];

        const currentUser = this.fakeDb.user.getUserById(currentUserId);
        const message = this.fakeDb.createMessage(params.chatId, currentUserId, params.text);

        if (!currentUser) return;
        const targetUser = this.fakeDb.getTargetUserForUser(params.chatId, currentUser.id);

        // TODO: Use strategy patter there human strategy/EchoStrategy/reverseStrategy
        if (targetUser.type === "echo-bot") {
          const echoMessage = this.fakeDb.createMessage(params.chatId, targetUser.id, params.text);
          await this.socketServer.to(params.chatId).emit("newMessage", { message: echoMessage });
        } else if (targetUser.type === "reverse-bot") {
          setTimeout(() => {
            const reverseText = [...params.text].reverse().join("");
            const reverseMessage = this.fakeDb.createMessage(params.chatId, targetUser.id, reverseText);
            this.socketServer.to(params.chatId).emit("newMessage", { message: reverseMessage });
          }, 3000); // TODO: mo to constants
        }

        await this.socketServer.to(params.chatId).emit("newMessage", { message });
      });

      socket.on("disconnect", () => {
        const userId = this.socketIdToUserIdMap[socket.id];
        if (!userId) return;
        this.fakeDb.user.setUserStatus(userId, "offline");

        socket.broadcast.emit("goesOffline", { userId });
        delete this.userIdToSocketMap[userId];
        delete this.socketIdToUserIdMap[socket.id];
      });
    });
    this.runSpamBotWorker(this.spamBotBehaviour.bind(this));
  }

  spamBotBehaviour() {
    const spamBot = this.fakeDb.user.getSpamBot();
    if (!spamBot) return;
    const chats = this.fakeDb.getChatsForUser(spamBot.id);

    chats.forEach((c) => {
      const text = `Some text to ${c.user.name} from ${spamBot.name} at ${new Date().toDateString()}`;
      const message = this.fakeDb.createMessage(c.id, spamBot.id, text);
      this.socketServer.to(c.id).emit("newMessage", { message });
    });
  }

  runSpamBotWorker(cb: () => void) {
    const seconds = randomIntFromInterval(10, 120);
    // eslint-disable-next-line no-console
    console.log(`${seconds} seconds to next spam message from SpamBot`);
    setTimeout(() => {
      cb();
      this.runSpamBotWorker(cb);
    }, seconds * 1000);
  }
}
