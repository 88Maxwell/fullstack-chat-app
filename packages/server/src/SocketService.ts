import {
  AnyCallback, Cb, OnMessageParams, User,
} from "@chat-app/types";
import http from "http";
import { Server as SocketServer } from "socket.io";

import { SocketEventName } from "types";

export default class SocketService {
  private socketServer: SocketServer;

  constructor(httpServer: http.Server) {
    this.socketServer = new SocketServer(httpServer);
  }

  private emit(name: SocketEventName, data: unknown) {
    this.socketServer.emit(name, data);
  }

  private on(name: SocketEventName, cb: AnyCallback) {
    this.socketServer.on(name, cb);
  }

  public connection(cb: AnyCallback) {
    this.on("connection", cb);
  }

  public disconnect(cb: AnyCallback) {
    this.on("disconnect", cb);
  }

  public onMessage(cb: Cb<OnMessageParams>) {
    this.on("message", cb);
  }
}
