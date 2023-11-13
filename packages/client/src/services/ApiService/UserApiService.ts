import { HttpClient } from "services/httpClient";

export default class UserApiService {
  constructor(private httpClient: HttpClient) {}

  authorize(userId: string) {
    return this.httpClient.setAuth(userId);
  }
}
