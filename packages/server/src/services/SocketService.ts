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
    this.socketServer = new SocketServer(httpServer, { cors: { origin: "*" } });
    this.fakeDb = fakeDb;
  }

  // eslint-disable-next-line class-methods-use-this
  public init() {
    this.socketServer.on("connection", (socket) => {
      socket.on("authorize", ({ user }: EmitAuthorizeParams) => {
        socket.join(ROOM_NAME);
        const chats = this.fakeDb.createChatsForUser(user);
        socket.broadcast.emit("authorized", { user });
        this.userIdToSocketMap[user.id] = socket;
        this.socketIdToUserIdMap[socket.id] = user.id;
      });

      socket.on("message", (params: OnMessageParams) => {
        if (!params.chatId) return;
        const currentUserId = this.socketIdToUserIdMap[socket.id];
        const chat = this.fakeDb.getChatById(currentUserId, params.chatId);
        console.log({ chat });
        if (!chat.user) return;

        const targetSocket = this.userIdToSocketMap[chat.user.id];
        console.log({ targetSocket });
        // if (!targetSocket) {}
        const message = this.fakeDb.createMessage(params.chatId, currentUserId, params.text);
        // // socket.emit("message", { message });
        socket.emit("message", { message });
        socket.to(socket.id).emit("messagae");
        targetSocket.emit("message", { message });
      });

      socket.on("disconnect", () => {
        // const sockets = Object.values(this.userIdToSocketMap);
        console.log("DISCONNECT>");
        // const userId = this.socketIdToUserIdMap[socket.id];
        // if (!userId) return;
        // socket.leave(ROOM_NAME);
        // sockets.forEach((s) => s.emit("authorize", { userId }));
        // delete this.userIdToSocketMap[userId];
        // delete this.socketIdToUserIdMap[socket.id];
      });
    });
  }
}
