import React from "react";
import "./style.scss";

export default function Option({ children, ...props }: React.HTMLProps<HTMLOptionElement>) {
  return (
    <option className="custom-option" {...props}>
      {children}
    </option>
  );
}
