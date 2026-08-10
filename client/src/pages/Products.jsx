import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { categoriesData, dummyProducts } from "../assets/assets";
import { Link } from "react-router-dom";
import { X,Home,ChevronDown, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/Home/Productcard";
import Loading from "../components/Loading";
import Filterpanel from "../components/FilterPanel";
const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

const fetchProducts = async () => {
  setLoading(true);

  let filtered = dummyProducts.filter((product) => {
    const matchesCategory = category === "" || product.category === category;
    const matchesOrganic = organic === "" || product.isOrganic === (organic === "true");
    const matchesMinPrice = minPrice === "" || product.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" || product.price <= Number(maxPrice);

    return matchesCategory && matchesOrganic && matchesMinPrice && matchesMaxPrice;
  });

  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sort === "rating-desc") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sort === "name-asc") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "newest") {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  setProducts(filtered);
  setLoading(false);
};

  const updateFilters = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    if (key !== "page") {
      updatedParams.delete("page");
    }
    setSearchParams(updatedParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const activeCategory = categoriesData.find((cat) => cat.slug === category);
  const hasFilters = category || organic || sort || minPrice || maxPrice;

  useEffect(() => {
    fetchProducts();
  }, [category, organic, sort, page, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to="/" className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">
            {activeCategory ? activeCategory.name : "All Products"}
          </span>
        </nav>
        <div className="flex xl:gap-10 gap-8">
          {/* sidebar */}
          {/* sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-5 sticky top-24 space-y-6">
              <Filterpanel categories={categoriesData}category={category} 
              organic={organic} minprice={minPrice} maxprice={maxPrice} updateFilter={updateFilters} clearFilters={clearFilters} hasFilters={hasFilters}/>

            </div>
          </aside>
            {/* main content */}
          <main className="flex-1">
            {/* header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1>{activeCategory ? activeCategory.name : "All Products"}</h1>
                <p className="text-sm text-app-text-light mt-0.5">
                  {products.length} products found
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* mobile filters button */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className={`lg:hidden flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
                    hasFilters
                      ? "bg-app-green/10 border-app-green text-app-green"
                      : "bg-white border-app-border text-zinc-700 hover:bg-app-cream"
                  }`}
                >
                  <SlidersHorizontal className="size-4" />
                  Filters
                  {hasFilters && (
                    <span className="flex items-center justify-center size-5 text-[10px] font-bold text-white bg-app-green rounded-full">
                      {[category, organic, sort, minPrice, maxPrice].filter(Boolean).length}
                    </span>
                  )}
                </button>

                {/* sort dropdown */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => updateFilters("sort", e.target.value)}
                    className="bg-white rounded-xl border border-app-border px-3 py-2 text-sm appearance-none pr-8 hover:bg-app-cream transition-colors"
                  >
                    <option value="">Sort by</option>
                    <option value="newest">Newest</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                  </select>
                  <ChevronDown className="size-4 absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* products grid */}
            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-app-green mb-2">No products found.</p>
                <p className="text-sm text-app-light mb-4">Try changing your filters.</p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-green-800 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* pagination */}
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center gap-2">
                {[...Array(totalPages).keys()].map((index) => (
                  <button
                    key={index}
                    onClick={() => updateFilters("page", index + 1)}
                    className={`px-3 py-2 text-sm rounded-full border border-app-border hover:bg-app-cream transition-colors ${
                      page === index + 1 ? "bg-app-cream" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* mobile filters panel */}
            <div
              className={`fixed inset-0 z-[60] transition-transform duration-300 ${
                mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* overlay خلفية */}
              <div
                onClick={() => setMobileFiltersOpen(false)}
                className="absolute inset-0 bg-black/40"
              />

              {/* panel نفسها */}
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-app-border sticky top-0 bg-white z-10">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 rounded-full hover:bg-app-cream transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="p-4 space-y-6">
                  {/* categories */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => updateFilters("category", "")}
                        className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                          category === ""
                            ? "bg-app-green/10 text-app-green font-medium"
                            : "text-app-text-light hover:bg-app-cream"
                        }`}
                      >
                        All Categories
                      </button>
                      {categoriesData.map((cat) => (
                        <button
                          type="button"
                          key={cat.slug}
                          onClick={() => updateFilters("category", cat.slug)}
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
                        onChange={(e) => updateFilters("organic", e.target.checked ? "true" : "")}
                        className="size-4 rounded accent-app-green cursor-pointer"
                      />
                      <span className="text-sm">Organic only</span>
                    </label>
                  </div>

                  {/* price range */}
                  <div className="pt-4 border-t border-app-border">
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => updateFilters("minPrice", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-green/30"
                      />
                      <span className="text-app-text-light text-sm">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => updateFilters("maxPrice", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-green/30"
                      />
                    </div>
                  </div>
                </div>

                {/* footer ثابت في الأسفل */}
                <div className="p-4 border-t border-app-border sticky bottom-0 bg-white flex gap-3">
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-app-border text-sm font-medium hover:bg-app-cream transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-app-green text-white text-sm font-semibold hover:bg-app-green/90 transition-colors"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;