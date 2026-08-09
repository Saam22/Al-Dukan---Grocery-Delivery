import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { dummyProducts } from "../assets/assets";
import { Home } from "lucide-react";
import ProductCard from "../components/Home/Productcard";
import Loading from "../components/Loading";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const lowerQuery = query.toLowerCase().trim();

    const filtered = dummyProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );

    setProducts(filtered);
    setLoading(false);
  }, [query]);

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
        {/* breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to="/" className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">Search Results</span>
        </nav>

        {/* header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold">
            Search results for "{query}"
          </h1>
          <p className="text-sm text-app-text-light mt-0.5">
            {products.length} {products.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* results */}
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-app-green mb-2">
              No products found for "{query}"
            </p>
            <p className="text-sm text-app-text-light mb-4">
              Try searching with different keywords.
            </p>
            <Link
              to="/products"
              className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-green-800 rounded-xl hover:bg-green-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;