import {
  EmitAuthorizeParams, OnMessageParams, User,
} from "@chat-app/types";
import http from "http";
import { Socket, Server as SocketServer } from "socket.io";
import FakeDatabase from "../FakeDatabase";

const ROOM_NAME = "channel";
export default class SocketService {
  private socketServer: SocketServer;

  private fakeDb: FakeDatabase;

  private userIdToSocketMap: Record<User["id"], Socket> = {};

  private socketIdToUserIdMap: Record<Socket["id"], User["id"]> = {};

  constructor(httpServer: http.Server, fakeDb: FakeDatabase) {
    this.socketServer = new SocketServer(httpServer, { cors: { credentials: false, origin: "*" } });
    this.fakeDb = fakeDb;
  }

  // eslint-disable-next-line class-methods-use-this
  public init() {
    this.socketServer.on("connection", (socket) => {
      socket.on("authorize", ({ user }: EmitAuthorizeParams) => {
        const sockets = Object.values(this.userIdToSocketMap);
        socket.join(ROOM_NAME);
        this.fakeDb.createChatsForUser(user);
        sockets.forEach((s) => s.emit("authorize", { user }));
        this.userIdToSocketMap[user.id] = socket;
        this.socketIdToUserIdMap[socket.id] = user.id;
      });

      socket.on("unauthorize", () => {
        const sockets = Object.values(this.userIdToSocketMap);
        const userId = this.socketIdToUserIdMap[socket.id];
        if (!userId) return;
        socket.leave(ROOM_NAME);
        socket.emit("authorize", { userId });
        sockets.forEach((s) => s.emit("authorize", { userId }));
        delete this.userIdToSocketMap[userId];
        delete this.socketIdToUserIdMap[socket.id];
      });

      socket.on("message", (params: OnMessageParams) => {
        console.log({ params });
        if (!params.chatId) return;
        const chat = this.fakeDb.getChatById(params.chatId);
        console.log({ chat });
        if (!chat) return;

        const currentUserId = this.socketIdToUserIdMap[socket.id];
        if (!currentUserId) return;
        const targetUserId = chat.user1.id === currentUserId ? chat.user2.id : chat.user1.id;
        const targetSocket = this.userIdToSocketMap[targetUserId];
        if (!targetSocket) return;
        const message = this.fakeDb.createMessage(params.chatId, currentUserId, params.text);
        // socket.emit("message", { message });
        this.socketServer.sockets.emit("message", { message });
      });

      socket.on("disconnect", () => {
        const sockets = Object.values(this.userIdToSocketMap);
        const userId = this.socketIdToUserIdMap[socket.id];
        if (!userId) return;
        socket.leave(ROOM_NAME);
        sockets.forEach((s) => s.emit("authorize", { userId }));
        delete this.userIdToSocketMap[userId];
        delete this.socketIdToUserIdMap[socket.id];
      });
    });
  }
}
