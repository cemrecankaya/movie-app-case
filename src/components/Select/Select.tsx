import React, { useRef } from "react";
import Option from "./Option/Option";
import "./style.scss";
import { LucideChevronsUpDown } from "lucide-react";

function Select({ value, children, onChange, ...props }: React.HTMLProps<HTMLSelectElement>) {
  const selectRef = useRef<HTMLSelectElement>(null);

  function handleChangeMiddleware(e: React.SyntheticEvent<HTMLSelectElement, Event>) {
    onChange?.(e);
    selectRef.current?.blur();
  }

  return (
    <div className="select-wrapper">
      <select ref={selectRef} className="select" value={value} onChange={handleChangeMiddleware} {...props}>
        {children}
      </select>
      <div className="select-arrow">
        <LucideChevronsUpDown color="currentColor" size={22} />
      </div>
    </div>
  );
}

Select.Option = Option;

export default Select;
