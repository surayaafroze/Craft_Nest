"use client";

import React from "react";
import FormSelect from "../ui/FormSelect";

export interface SortOption {
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    switch (selected) {
      case "newest":
        onChange({ sortBy: "createdAt", sortOrder: "desc" });
        break;
      case "price-asc":
        onChange({ sortBy: "price", sortOrder: "asc" });
        break;
      case "price-desc":
        onChange({ sortBy: "price", sortOrder: "desc" });
        break;
      case "rating":
        onChange({ sortBy: "avgRating", sortOrder: "desc" });
        break;
      default:
        onChange({ sortBy: "createdAt", sortOrder: "desc" });
    }
  };

  let selectValue = "newest";
  if (value.sortBy === "price" && value.sortOrder === "asc") selectValue = "price-asc";
  if (value.sortBy === "price" && value.sortOrder === "desc") selectValue = "price-desc";
  if (value.sortBy === "avgRating") selectValue = "rating";

  return (
    <div className="w-48">
      <FormSelect
        name="sort"
        value={selectValue}
        onChange={handleChange}
        options={[
          { value: "newest", label: "Newest First" },
          { value: "price-asc", label: "Price: Low to High" },
          { value: "price-desc", label: "Price: High to Low" },
          { value: "rating", label: "Highest Rated" },
        ]}
      />
    </div>
  );
};
