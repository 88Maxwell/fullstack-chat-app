import { HttpClient } from "services/httpClient";
import { CreateUserParams, CreateUserResponse } from "@chat-app/types";

export default class UserApiService {
  constructor(private httpClient: HttpClient) {}

  createUser({ name } : CreateUserParams) {
    return this.httpClient.post<CreateUserResponse>("/user", { data: { name } });
  }
}
