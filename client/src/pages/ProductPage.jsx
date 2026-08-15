import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { dummyProducts, categoriesData } from "../assets/assets";
import { Star, Minus, Plus, ShoppingCart, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import ProductCard from "../components/Home/Productcard";
import Loading from "../components/Loading";
import DummyReviewsSection from "../components/DummyReviewsSection";

const ProductPage = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);

    const foundProduct = dummyProducts.find((p) => p._id === id);
    if (!foundProduct) {
      navigate("/404");
      return;
    }

    setProduct(foundProduct);
    setRelatedProducts(
      dummyProducts.filter(
        (p) => p.category === foundProduct.category && p._id !== foundProduct._id
      ).slice(0, 4)
    );
    setLoading(false);
  }, [id, navigate]);

  if (loading || !product) {
    return <Loading />;
  }

  const categoryInfo = categoriesData.find((c) => c.slug === product.category);
  const categoryName = categoryInfo?.name || product.category;
  const outOfStock = product.stock <= 0;
  const atMaxStock = localQuantity >= product.stock;

  const handleDecrease = () => setLocalQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setLocalQuantity((q) => Math.min(product.stock, q + 1));

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        {/* breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-app-text-light mb-2 flex-wrap">
          <Link to="/" className="hover:text-app-green transition-colors">Home</Link>
          <ChevronRight className="size-3.5" />
          <Link to="/products" className="hover:text-app-green transition-colors">Products</Link>
          <ChevronRight className="size-3.5" />
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-app-green transition-colors capitalize"
          >
            {categoryName}
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-app-text font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-app-text-light hover:text-app-green transition-colors mb-6"
        >
          <ChevronLeft className="size-4" />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* image */}
          <div className="relative bg-white rounded-2xl p-8 flex items-center justify-center">
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-app-error text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm object-contain"
            />
          </div>

          {/* details */}
          <div>
            <p className="text-sm text-app-text-light capitalize mb-1">{categoryName}</p>
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

            {product.rating > 0 && (
              <div className="flex items-center gap-1 mb-3">
                <Star className="size-4 text-app-warning fill-app-warning" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-app-text-light">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            <p className="text-sm text-app-text-light mb-4">{product.description}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-semibold text-app-green">
                {currency}{product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-app-text-light line-through">
                  {currency}{product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-sm text-app-text-light">/ {product.unit}</span>
            </div>

            {/* quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 bg-white rounded-full px-2 py-2 border border-app-border">
                <button
                  onClick={handleDecrease}
                  disabled={localQuantity <= 1}
                  className="size-8 flex items-center justify-center rounded-full hover:bg-app-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <Minus className="size-4" />
                </button>
                <span className="text-sm font-medium w-6 text-center">{localQuantity}</span>
                <button
                  onClick={handleIncrease}
                  disabled={outOfStock || atMaxStock}
                  className="size-8 flex items-center justify-center rounded-full hover:bg-app-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, localQuantity)}
                disabled={outOfStock}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-app-green text-white font-semibold hover:bg-app-green/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-app-green"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </button>
            </div>

            {outOfStock ? (
              <p className="text-sm text-app-error">Out of Stock</p>
            ) : (
              <p className="flex items-center gap-1.5 text-sm text-app-success">
                <CheckCircle2 className="size-4" />
                In Stock ({product.stock} available)
              </p>
            )}

            {!outOfStock && atMaxStock && (
              <p className="text-xs text-app-text-light mt-1">
                Max available quantity reached
              </p>
            )}
          </div>
        </div>

        {/* customer reviews */}
        {product.reviewCount > 0 && <DummyReviewsSection product={product} />}

        {/* related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                More from {categoryName}
              </h2>
              <Link
                to={`/products?category=${product.category}`}
                className="text-sm font-medium text-app-green hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;