import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { dummyProducts } from "../assets/assets";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import ProductCard from "../components/Home/Productcard";
import Loading from "../components/Loading";


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

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {/* image */}
          <div className="bg-white rounded-2xl p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm object-contain"
            />
          </div>

          {/* details */}
          <div>
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
                  onClick={() => setLocalQuantity((q) => Math.max(1, q - 1))}
                  className="size-8 flex items-center justify-center rounded-full hover:bg-app-cream transition-colors"
                >
                  <Minus className="size-4" />
                </button>
                <span className="text-sm font-medium w-6 text-center">{localQuantity}</span>
                <button
                  onClick={() => setLocalQuantity((q) => q + 1)}
                  className="size-8 flex items-center justify-center rounded-full hover:bg-app-cream transition-colors"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, localQuantity)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-app-green text-white font-semibold hover:bg-app-green/90 transition-colors"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </button>
            </div>

            {product.stock > 0 ? (
              <p className="text-sm text-app-success">
                {product.stock} {product.stock === 1 ? "item" : "items"} left in stock
              </p>
            ) : (
              <p className="text-sm text-app-error">Out of Stock</p>
            )}
          </div>
        </div>
        {/* rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-2 mt-5">
            <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>
            <div>stars</div>
            <span>{product.rating}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>
        )}

        {/* related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">Related Products</h2>
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