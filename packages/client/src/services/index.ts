import { ApiService } from "./ApiService";
import { SocketService } from "./SocketService";

export { SocketService } from "./SocketService";

export type Services = {
  socketService: SocketService;
  apiService : ApiService;
};
