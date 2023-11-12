import { HttpClient } from "services/httpClient";
import { GetChatsParams, GetChatsResponse } from "@chat-app/types";

export default class ChatApiService {
  constructor(private httpClient: HttpClient) {}

  getChats(params : GetChatsParams) {
    return this.httpClient.post<GetChatsResponse>("/chats", { params });
  }
}
