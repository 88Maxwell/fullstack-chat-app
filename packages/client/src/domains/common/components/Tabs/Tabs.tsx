import React from "react";
import clsx from "clsx";
import { TabsProps } from "./TabsTypes";
import styles from "./Tabs.module.scss";

function Tabs({ children, className }: TabsProps) {
  return (
    <div className={clsx(styles.tabs, className)}>{children}</div>
  );
}

export default Tabs;
