import React from "react";
import clsx from "clsx";
import { UserSearchInputProps } from "./UserSearchInputTypes";
import style from "./UserSearchInput.module.scss";

function UserSearchInput({ value, onChange, className }: UserSearchInputProps) {
  return (
    <input
      placeholder="Search..."
      className={clsx(style.input, className)}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

export default UserSearchInput;
