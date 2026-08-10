import React from "react";

const FilterPanel = ({
  categories = [],
  category,
  organic,
  minprice,
  maxprice,
  updateFilter,
  clearFilters,
  hasFilters,
}) => {
  const categoriesWithAll = [
    { slug: "", name: "All Categories" },
    ...categories,
  ];

  return (
    <div className="space-y-6">
      {/* header with clear all */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-app-green">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-medium text-app-green hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* categories */}
      <div>
        <h4 className="text-sm font-medium text-zinc-700 mb-3">Categories</h4>
        <div className="space-y-1.5">
          {categoriesWithAll.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                category === cat.slug
                  ? "bg-app-green/10 text-app-green font-medium"
                  : "text-app-text-light hover:bg-app-cream"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* organic */}
      <div className="pt-4 border-t border-app-border">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={organic === "true"}
            onChange={(e) => updateFilter("organic", e.target.checked ? "true" : "")}
            className="size-4 rounded accent-app-green cursor-pointer"
          />
          <span className="text-sm text-zinc-700">Organic only</span>
        </label>
      </div>

      {/* price range */}
      <div className="pt-4 border-t border-app-border">
        <h4 className="text-sm font-medium text-zinc-700 mb-3">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-app-border focus:outline-none focus:ring-2 focus:ring-app-green/30"
            type="number"
            placeholder="Min"
            value={minprice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
          />
          <span className="text-app-text-light text-sm">-</span>
          <input
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-app-border focus:outline-none focus:ring-2 focus:ring-app-green/30"
            type="number"
            placeholder="Max"
            value={maxprice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* clear all - full width button at the bottom */}
      {hasFilters && (
        <div className="pt-4 border-t border-app-border">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2.5 text-sm font-medium text-app-green border border-app-green rounded-xl hover:bg-app-green/10 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;