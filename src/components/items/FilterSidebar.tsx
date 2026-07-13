"use client";

import React, { useEffect, useState } from "react";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import { Button } from "../ui/Button";

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
  onCategoryChange?: (category: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApply,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([
    { value: "", label: "All Categories" },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const res = await fetch(`${serverUrl}/api/categories`);
        const data = await res.json();
        if (data.success) {
          const formattedCategories = data.data.map((c: any) => ({
            value: c.name,
            label: c.name,
          }));
          setCategories([{ value: "", label: "All Categories" }, ...formattedCategories]);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (field: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 font-heading tracking-tight">Filters</h3>
      </div>
      
      <div>
        <FormSelect
          label="Category"
          name="category"
          value={filters.category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange("category", e.target.value);
            if (onCategoryChange) {
              onCategoryChange(e.target.value);
            }
          }}
          options={categories}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Price Range
        </label>
        <div className="flex items-center gap-3">
          <FormInput
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("minPrice", e.target.value)}
            min="0"
          />
          <span className="text-zinc-500">-</span>
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

      <Button onClick={onApply} className="w-full rounded-xl">
        Apply Filters
      </Button>
    </div>
  );
};
