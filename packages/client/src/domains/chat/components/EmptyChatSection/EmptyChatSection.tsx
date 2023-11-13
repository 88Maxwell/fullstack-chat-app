import clsx from "clsx";
import style from "./EmptyChatSection.module.scss";

function EmptyChatSection() {
  return (
    <main className={clsx(style.container)}>
      No chat selected!
    </main>
  );
}

export default EmptyChatSection;
