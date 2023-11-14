import clsx from "clsx";
import { format } from "date-fns";
import { useCurrentUserCase } from "domains/user/cases/useCurrentUserCase";
import { MessageProps } from "./MessageTypes";
import styles from "./Message.module.scss";

function Message({ message, className }: MessageProps) {
  const { state: { user: currentUser } } = useCurrentUserCase();
  const isOwnMessage = message.sender.id === currentUser?.id;

  return (
    <li className={clsx(styles.messageItem, className)}>
      <div className={clsx(styles.message, {
        [styles.messageOwn]  : isOwnMessage,
        [styles.messageUser] : !isOwnMessage,
      })}
      >
        <div>
          <div className={clsx(styles.messageHeader, {
            [styles.messageHeaderOwn]  : isOwnMessage,
            [styles.messageHeaderUser] : !isOwnMessage,
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
            [styles.messageBodyOwn]  : isOwnMessage,
            [styles.messageBodyUser] : !isOwnMessage,
          })}
          >{message.text}
          </div>
        </div>
        {message.readAt && isOwnMessage
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
