import { HttpClient } from "services/httpClient";
import UserApiService from "./UserApiService";
import ChatApiService from "./ChatApiService";

export default class ApiService {
  userApi: UserApiService;

  chatApi: ChatApiService;

  constructor(private httpClient: HttpClient) {
    this.userApi = new UserApiService(httpClient);
    this.chatApi = new ChatApiService(httpClient);
  }
}
