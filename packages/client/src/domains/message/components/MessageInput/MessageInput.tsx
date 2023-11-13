import React from "react";
import clsx from "clsx";
import { MessageInputProps } from "./MessageInputTypes";
import style from "./MessageInput.module.scss";

function MessageInput({
  value, onChange, className, onKeyDown,
}: MessageInputProps) {
  return (
    <input
      placeholder="Search..."
      className={clsx(style.input, className)}
      type="text"
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
}

export default MessageInput;
