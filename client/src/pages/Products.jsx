import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { categoriesData, dummyProducts } from "../assets/assets";
import { Link } from "react-router-dom";
import { X,Home,ChevronDown, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/Home/Productcard";

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
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-4 sticky top-24">
              <p>Filter</p>
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
              <div className="flex flex-col lg:items-center gap-3">
                {/* mobile filters button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm 
                  bg-white rounded-xl border border-app-border hover:bg-app-cream 
                  transition-colors"
                >
                  <SlidersHorizontal className="size-4" /> Filters
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
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
            {/* mobile filters */}
            <div
              className={`fixed inset-0 bg-app-cream z-10 overflow-y-auto ${
                mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-app-text-light hover:text-app-text transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  
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