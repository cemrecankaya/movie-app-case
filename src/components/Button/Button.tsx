import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "./style.scss";

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isStatic?: boolean;
}

export default function Button({ children, isStatic = false, ...props }: IButtonProps) {
  return (
    <button className={isStatic ? "static" : ""} {...props}>
      {children}
    </button>
  );
}
