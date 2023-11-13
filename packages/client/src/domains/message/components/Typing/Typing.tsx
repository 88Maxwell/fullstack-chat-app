import clsx from "clsx";
import { TypingProps } from "./TypingTypes";
import style from "./Typing.module.scss";

function Typing({ className, senderName }: TypingProps) {
  return (
    <div className={clsx(style.typing, className)}>{`${senderName} is typing ...`}</div>
  );
}

export default Typing;
