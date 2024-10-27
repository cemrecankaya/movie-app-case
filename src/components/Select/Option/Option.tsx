import React from "react";
import "./style.scss";

export default function Option({ children, ...props }: React.HTMLProps<HTMLOptionElement>) {
  return (
    <option className="option" {...props}>
      {children}
    </option>
  );
}
