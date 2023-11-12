import clsx from "clsx";
import { UserProfileSectionProps } from "./UserProfileSectionTypes";
import style from "./UserProfileSection.module.scss";

function UserProfileSection({ user, className }: UserProfileSectionProps) {
  return (
    <section className={clsx(style.userProfileSection, className)}>
      {user.avatar
        ? <img src={user.avatar.urls.large} alt={user.avatar.alt} /> : null}
      <div className={style.userProfileSectionTypographyContainer}>
        <h2 className={style.userProfileSectionPrimary}>{user.name}</h2>
        <p className={style.userProfileSectionSecondary}>{user.bio}</p>
      </div>
    </section>
  );
}

export default UserProfileSection;
