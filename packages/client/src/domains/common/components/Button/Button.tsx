import { clsx } from "clsx";
import { ButtonProps } from "./ButtonTypes";
import style from "./Button.module.css";

function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      className={clsx(style.button, className)}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
