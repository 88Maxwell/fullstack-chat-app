import { Timestamp } from "domains/common/commonTypes";
import { Message } from "domains/message/enitity";
import { User } from "domains/user/entity/userTypes";

export interface Chat {
  id: string;
  user: User;
  lastMessage?: Message;
  createdAt: Timestamp;
}
