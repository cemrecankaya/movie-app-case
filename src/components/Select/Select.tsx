import React from "react";

export interface ISelectProps {
  value: string;
}

export default function Select({ value }: ISelectProps) {
  return (
    <div className="select-container">
      <div className="value">{value}</div>
    </div>
  );
}
