import io, { Socket } from "socket.io-client";
import {
  Cb, EmitAuthorizeParams, EmitMessageParams, OnGoesOfflineParams, OnMessageParams, OnUserAuthorizedParams,
} from "@chat-app/types";

export default class SocketService {
  private io: Socket;

  constructor(url: string, extraData: Record<string, unknown>) {
    this.io = io(url, { query: extraData });
  }

  private emit(...args: Parameters<Socket["emit"]>) {
    this.io.emit(...args);
  }

  private on(...args: Parameters<Socket["on"]>) {
    this.io.on(...args);
  }

  connect() {
    this.io.connect();
  }

  close() {
    this.io.close();
  }

  onConnected(cb: Cb<void>) {
    this.on("connect", cb);
  }

  onAuthorized(cb: Cb<OnUserAuthorizedParams>) {
    this.on("authorized", cb);
  }

  onGoesOffline(cb: Cb<OnGoesOfflineParams>) {
    this.on("goesOffline", cb);
  }

  onMessage(cb: Cb<OnMessageParams>) {
    this.on("newMessage", cb);
  }

  sendMessage(params: EmitMessageParams) {
    this.emit("message", params);
  }

  authorize(params: EmitAuthorizeParams) {
    this.emit("authorize", params);
  }
}
