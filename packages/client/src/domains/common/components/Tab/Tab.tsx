import clsx from "clsx";
import { TabProps } from "./TabTypes";
import styles from "./Tab.module.scss";

function Tab({
  className,
  children,
  onClick,
  selected = false,
}: TabProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(styles.tab, className, { [styles.tabSelected]: selected })}
    >
      {children}
    </button>
  );
}

export default Tab;
