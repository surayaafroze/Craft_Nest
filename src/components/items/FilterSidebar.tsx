"use client";

import React from "react";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import Button from "../ui/Button";

interface Filters {
  category: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
  location: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onApply: () => void;
}

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "Woodworking", label: "Woodworking" },
  { value: "Pottery", label: "Pottery" },
  { value: "Textiles", label: "Textiles" },
  { value: "Jewelry", label: "Jewelry" },
  { value: "Leather", label: "Leather" },
  { value: "Glass", label: "Glass" },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApply,
}) => {
  const handleChange = (field: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Filters</h3>
      </div>
      
      <div>
        <FormSelect
          label="Category"
          name="category"
          value={filters.category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("category", e.target.value)}
          options={CATEGORIES}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <FormInput
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("minPrice", e.target.value)}
            min="0"
          />
          <span className="text-gray-500">-</span>
          <FormInput
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("maxPrice", e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div>
        <FormSelect
          label="Minimum Rating (Optional)"
          name="rating"
          value={filters.rating}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("rating", e.target.value)}
          options={[
            { value: "", label: "Any Rating" },
            { value: "4", label: "4 Stars & Up" },
            { value: "3", label: "3 Stars & Up" },
            { value: "2", label: "2 Stars & Up" },
          ]}
        />
      </div>

      <div>
        <FormInput
          label="Location (Optional)"
          type="text"
          name="location"
          placeholder="e.g. New York"
          value={filters.location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("location", e.target.value)}
        />
      </div>

      <Button onClick={onApply} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
};
