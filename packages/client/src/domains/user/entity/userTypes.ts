import { Identifier, Image } from "domains/common/commonTypes";

export interface User {
  id: Identifier;
  name: string;
  avatar?: Image;
  bio: string;
}
