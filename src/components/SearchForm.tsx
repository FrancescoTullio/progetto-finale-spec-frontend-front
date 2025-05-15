
import React, { useRef } from "react";

type SearchFormProps = {
  onSearch: (searchTerm: string) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };
  
  return (
    <div className="search-container bg-gradient p-4 rounded-3 shadow">
      <form onSubmit={handleSubmit} className="d-flex flex-column flex-md-row align-items-center gap-3">
        <div className="input-group flex-grow-1">
          <span className="input-group-text bg-warning text-dark">
            <i className="bi bi-search"></i>
          </span>
          <input 
            type="text" 
            className="form-control form-control-lg border-0 shadow-none" 
            placeholder="Cerca il tuo gioco preferito..." 
            ref={inputRef}
            aria-label="Search games"
          />
        </div>
        <button type="submit" className="btn btn-warning btn-lg px-4 text-dark fw-bold">
          CERCA
        </button>
      </form>
    </div>
  );
}