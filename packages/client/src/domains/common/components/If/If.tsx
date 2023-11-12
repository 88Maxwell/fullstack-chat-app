import { memo } from "react";
import { IfProps } from "./IfTypes";

function If({ children, condition, else: elseNodes }: IfProps) {
  // TODO: resolve correctly
  if (condition) return children as React.ReactElement;
  return (elseNodes || null) as React.ReactElement;
}

export default memo(If);
