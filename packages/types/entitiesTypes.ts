import { Identifier, Image, Timestamp } from "./commonTypes";

  export interface User {
    id: Identifier;
    email: string;
    name: string;
    avatar?: Image;
    bio: string;
  }
  
  
  export interface Message {
    id: Identifier;
    text: string;
    sender: User;
    createdAt: Timestamp;
  }
  
  export interface Chat {
    id: string;
    user: User;
    lastMessage?: Message;
    createdAt: Timestamp;
  }
  