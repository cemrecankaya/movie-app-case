import React, { useRef } from "react";
import Option from "./Option/Option";
import "./style.css";

function Select({ value, children, onChange, ...props }: React.HTMLProps<HTMLSelectElement>) {
  const selectRef = useRef<HTMLSelectElement>(null);

  function handleSelectMiddleware(e: React.SyntheticEvent<HTMLSelectElement, Event>) {
    e.preventDefault();
    onChange?.(e);
    selectRef.current?.blur();
  }

  return (
    <select ref={selectRef} className="select" value={value} onChange={handleSelectMiddleware} {...props}>
      {children}
    </select>
  );
}

Select.Option = Option;

export default Select;
