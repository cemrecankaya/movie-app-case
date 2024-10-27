import React from "react";
import "./style.scss";
import { LoaderCircle, LucideSearch, LucideX } from "lucide-react";

export interface ISearchProps {
  loading?: boolean;
  value: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSearch?: (text: string) => void;
  onClear?: () => void;
}

export default function Search({ loading, value, defaultValue, onClear, onSearch, onChange }: ISearchProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
  }
  function handleClear(_e: React.MouseEvent<HTMLInputElement>) {
    onClear?.();
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      !loading && onSearch?.(value);
    }
  }
  function handleSearch(_e: React.MouseEvent<HTMLInputElement>) {
    !loading && onSearch?.(value);
  }

  return (
    <div className="search-input-container">
      <input
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        disabled={loading}
        type="text"
        value={value}
        spellCheck={false}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {value && (
        <div className="clear-all" onClick={handleClear}>
          <LucideX size={20} strokeWidth={2} />
        </div>
      )}

      {loading ? (
        <div className="loading">
          <LoaderCircle className="cw-spin-animation" size={20} strokeWidth={2} />
        </div>
      ) : (
        <div className="search-button" onClick={handleSearch}>
          <LucideSearch size={20} style={{ transform: "translate(1px , 1px)" }} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}
