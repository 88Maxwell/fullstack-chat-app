import clsx from "clsx";
import UserAvatar from "../UserAvatar/UserAvatar";
import { UserProfileSectionProps } from "./UserProfileSectionTypes";
import style from "./UserProfileSection.module.css";

function UserProfileSection({ user, className }: UserProfileSectionProps) {
  return (
    <section className={clsx(style.userProfileSection, className)}>
      <UserAvatar avatar={user.avatar} />
      <div>
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>
    </section>
  );
}

export default UserProfileSection;