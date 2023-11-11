import type { User } from "./entitiesTypes";

export interface GetMeParams {
  name: string;
}

export interface GetMeResponse {
  user: User;
}

export interface GetChatsParams {
  userNameFilter?: string;
}

export interface GetChatsResponse {}

export interface OnMessageResponse {
  text: string;
  chatId: string;
}

export interface OnMessageParams {
  text: string;
  chatId: string;
}