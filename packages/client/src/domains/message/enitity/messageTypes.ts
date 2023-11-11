import type { Identifier, Timestamp } from "domains/common/commonTypes";
import type { User } from "domains/user/entity/userTypes";

export interface Message {
  id: Identifier;
  text: string;
  sender: User;
  createdAt: Timestamp;
}
