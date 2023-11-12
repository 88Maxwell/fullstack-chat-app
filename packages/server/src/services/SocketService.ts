import {
  AnyCallback, Identifier, OnMessageParams, SocketEventName, User,
} from "@chat-app/types";
import http from "http";
import { Socket, Server as SocketServer } from "socket.io";
import FakeDatabase from "../FakeDatabase";

export default class SocketService {
  private socketServer: SocketServer;

  private fakeDb: FakeDatabase;

  private clientsMap: Record<Identifier, { user: User, client: Socket }> = {};

  constructor(httpServer: http.Server, fakeDb: FakeDatabase) {
    this.socketServer = new SocketServer(httpServer);
    this.fakeDb = fakeDb;
  }

  private emit(name: SocketEventName, data: unknown) {
    this.socketServer.emit(name, data);
  }

  private on(name: SocketEventName, cb: AnyCallback) {
    this.socketServer.on(name, cb);
  }

  // public connection(cb: Cb<Socket>) {
  //   this.socketServer.on("connection", cb);
  // }

  // public disconnect(cb: AnyCallback) {
  //   this.on("disconnect", cb);
  // }

  // public onMessage(cb: Cb<OnMessageParams>) {
  //   this.on("message", cb);
  // }

  // eslint-disable-next-line class-methods-use-this
  private getUserRoomName(userId: Identifier) {
    return `user-room-${userId}-channel`;
  }

  public init() {
    this.socketServer.on("connection", (client) => {
      console.log({ client });
      client.on("authorize", (user: User) => {
        // eslint-disable-next-line no-param-reassign
        client.user = user;
        this.clientsMap[user.id] = { user, client };
        const userRoom = `channel-user-room-${user.id}`;
        client.join(userRoom);

        const connectedClientsIds = Object.keys(this.clientsMap);
        connectedClientsIds
          .filter((id) => id !== user.id)
          .forEach((id) => this.clientsMap[id].client.emit("userOnline", { user }));
      });

      // client.on("error", (error: unknown) => console.log("ERROR!!", error));
      // client.on("disconnecting", (reason: string) => console.log("DISCONNECTING, ", reason));

      // client.on("channelBroadcast", (payload: any) => {
      // console.log('CHANNEL BROADCAST', io.sockets.adapter.rooms[payload.channelId]);
      // io.sockets.adapter.rooms[payload.channelId].length {to get how many in the room live}
      // if (socketServer.sockets.adapter.rooms[payload.channelId]) {
      // socketServer.to(payload.channelId).emit(SocketEventName.channelBroadcast, payload);
      // }
      // });

      client.on("message", (params: OnMessageParams) => {
        const targetUser = this.fakeDb.getUserByChatId(params.chatId);
        if (!targetUser) return;

        this.clientsMap[targetUser.id].client.emit("message", params);
      });

      client.on("disconnect", () => {
        if (!client.user) return;
        const userId = client.user.id;
        const userRoomName = this.getUserRoomName(userId);

        client.leave(userRoomName);

        const target = this.clientsMap[userId];

        if (!target) return;

        const connectedClientsIds = Object.keys(this.clientsMap);

        connectedClientsIds
          .filter((id) => id !== userId)
          .forEach((id) => this.clientsMap[id].client.emit("userOffline", { user: target.user }));

        delete this.clientsMap[userId];
      });
    });
  }
}
