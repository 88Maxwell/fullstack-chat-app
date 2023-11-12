import clsx from "clsx";
import If from "domains/common/components/If";
import style from "./UserAvatar.module.scss";
import { UserAvatarProps } from "./UserAvatarTypes";

function UserAvatar({ className, avatar }: UserAvatarProps) {
  return (
    <div className={clsx(style.profileAvatar, className)}>
      <picture>
        <If condition={!avatar.urls?.small}>
          <img src={avatar.urls.small} alt={avatar.alt} />
        </If>
      </picture>
    </div>
  );
}

export default UserAvatar;
