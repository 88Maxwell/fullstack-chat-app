import io, { Socket } from "socket.io-client";
import { Cb, OnMessageParams } from "./SocketServiceTypes";
import { EmitMessageParams } from "./SocketServiceApiTypes";

export default class SocketService {
  private io: Socket;

  constructor(url: string) {
    this.io = io(url);
  }

  private emit(...args: Parameters<Socket["emit"]>) {
    this.io.emit(...args);
  }

  private on(...args: Parameters<Socket["on"]>) {
    this.io.emit(...args);
  }

  connect() {
    this.io.connect();
  }

  close() {
    this.io.close();
  }

  onMessage(cb: Cb<OnMessageParams>) {
    this.on("message", cb);
  }

  sendMessage(params: EmitMessageParams) {
    this.emit("message", params);
  }
}
