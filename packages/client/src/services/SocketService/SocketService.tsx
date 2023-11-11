import io, { Socket } from "socket.io-client";
import {
  AnyCallback, Cb, EventsToEmit, EventsToListen, OnMessageParams,
} from "./SocketServiceTypes";
import { EmitMessageParams } from "./SocketServiceApiTypes";

export default class SocketService {
  private io: Socket;

  constructor(url: string) {
    this.io = io(url);
  }

  private emit(name: EventsToEmit, data: unknown) {
    this.io.emit(name, data);
  }

  private on(name: EventsToListen, cb: AnyCallback) {
    this.io.emit(name, cb);
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
