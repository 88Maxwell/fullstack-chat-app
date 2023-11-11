import clsx from "clsx";
import style from "./UserAvatar.module.scss";
import { UserAvatarProps } from "./UserAvatarTypes";

function UserAvatar({ className, avatar }: UserAvatarProps) {
  return (
    <div className={clsx(style.profileAvatar, className)}>
      <picture>
        <img src={avatar.urls.small} alt={avatar.alt} />
      </picture>
    </div>
  );
}

export default UserAvatar;
