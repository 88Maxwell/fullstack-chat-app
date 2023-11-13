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

  private usersMap: Record<User["id"], User> = {};

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
        sockets.forEach((s) => s.emit("authorize", { user }));
        this.usersMap[user.id] = user;
        this.userIdToSocketMap[user.id] = socket;
        this.socketIdToUserIdMap[socket.id] = user.id;
      });

      socket.on("unauthorize", () => {
        const sockets = Object.values(this.userIdToSocketMap);
        const userId = this.socketIdToUserIdMap[socket.id];
        if (!userId) return;
        socket.leave(ROOM_NAME);
        sockets.forEach((s) => s.emit("authorize", { userId }));
        delete this.userIdToSocketMap[userId];
        delete this.usersMap[userId];
        delete this.socketIdToUserIdMap[socket.id];
      });

      socket.on("message", (params: OnMessageParams) => {
        if (!params.userId) return;
        const targetSocket = this.userIdToSocketMap[params.userId];
        if (!targetSocket) return;
        targetSocket.emit("message", params);
      });

      socket.on("disconnect", () => {
        const sockets = Object.values(this.userIdToSocketMap);
        const userId = this.socketIdToUserIdMap[socket.id];
        if (!userId) return;
        socket.leave(ROOM_NAME);
        sockets.forEach((s) => s.emit("authorize", { userId }));
        delete this.userIdToSocketMap[userId];
        delete this.usersMap[userId];
        delete this.socketIdToUserIdMap[socket.id];
      });
    });
  }
}
