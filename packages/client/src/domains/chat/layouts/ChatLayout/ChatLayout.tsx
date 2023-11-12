import React from "react";
import { ChatLayoutProps } from "./ChatLayoutTypes";

function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div>{children}</div>
  );
}

export default ChatLayout;
