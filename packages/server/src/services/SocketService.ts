import {
  EmitAuthorizeParams, EmitMessageParams, User,
} from "@chat-app/types";
import http from "http";
import { Socket, Server as SocketServer } from "socket.io";
import FakeDatabase from "../FakeDatabase";

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
        this.fakeDb.userFakeDatabase.addUser(user);
        this.fakeDb.userFakeDatabase.setUserStatus(user.id, "online");
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

        const message = this.fakeDb.createMessage(params.chatId, currentUserId, params.text);
        await this.socketServer.to(params.chatId).emit("newMessage", { message });
      });

      socket.on("disconnect", () => {
        const userId = this.socketIdToUserIdMap[socket.id];
        if (!userId) return;
        this.fakeDb.userFakeDatabase.setUserStatus(userId, "offline");

        socket.broadcast.emit("goesOffline", { userId });
        delete this.userIdToSocketMap[userId];
        delete this.socketIdToUserIdMap[socket.id];
      });
    });
  }
}
