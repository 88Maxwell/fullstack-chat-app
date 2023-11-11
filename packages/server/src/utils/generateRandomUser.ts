import { User } from "@chat-app/types";
import { v4 as uuidv4 } from "uuid";

export function generateRandomUser(name?: string): User {
  const id = uuidv4();
  return {
    id,
    bio   : "Random user",
    email : `${id}@mail.co`,
    name  : name || `${id}-name`,
  };
}
