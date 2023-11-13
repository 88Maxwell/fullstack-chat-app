import clsx from "clsx";
import { format } from "date-fns";
import { MessageProps } from "./MessageTypes";
import styles from "./Message.module.scss";

function Message({ message, own = false, className }: MessageProps) {
  return (
    <li className={clsx(styles.messageItem, className)}>
      <div className={clsx(styles.message, {
        [styles.messageOwn]  : own,
        [styles.messageUser] : !own,
      })}
      >
        <div>
          <div className={clsx(styles.messageHeader, {
            [styles.messageHeaderOwn]  : own,
            [styles.messageHeaderUser] : !own,
          })}
          >
            <span>
              {message.sender.name}
            </span>
            <span className={styles.messageDate}>
              {format(message.createdAt, "KK:mma")}
            </span>
          </div>
          <div className={clsx(styles.messageBody, {
            [styles.messageBodyOwn]  : own,
            [styles.messageBodyUser] : !own,
          })}
          >{message.text}
          </div>
        </div>
        {message.readAt && own
          ? (
            <div className={styles.messageReadAt}>
              Seen {format(message.readAt, "KK:mma")}
            </div>)
          : null}
      </div>
    </li>
  );
}

export default Message;
