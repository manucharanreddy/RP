
import React, { useState } from "react";

export const Searchbar = ({ initialValue = "", onSearch }) => {
  const [value, setValue] = useState(initialValue);

  const submit = (e) => {
    e?.preventDefault();
    if (!value) return;
    onSearch(value);
  };

  return (
    <form className="d-flex align-items-center" onSubmit={submit} style={{ gap: "8px" }}>
      <input
        className="form-control"
        placeholder="Search city..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ minWidth: "180px" }}
      />
      <button type="submit" className="btn btn-primary" onClick={submit}>
        Go
      </button>
    </form>
  );
};
