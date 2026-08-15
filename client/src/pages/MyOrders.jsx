import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { dummyDashboardOrdersData, statusColors } from "../assets/assets";
import { useCart } from "../context/CartContext";
import { Package, XCircle, Truck } from "lucide-react";
import Loading from "../components/Loading";

// statuses where the order can still be cancelled by the customer
const CANCELLABLE_STATUSES = ["Placed", "Confirmed", "Packed"];

const MyOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmingCancelId, setConfirmingCancelId] = useState(null);

  const tabs = ["all", "Placed", "Out for Delivery", "Delivered", "Cancelled"];

  const { clearCart } = useCart();

  const handleCancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
    setConfirmingCancelId(null);
    toast.success("Order cancelled successfully");
  };

  const fetchOrders = async () => {
    setLoading(true);

    const filtered =
      activeTab === "all"
        ? dummyDashboardOrdersData
        : dummyDashboardOrdersData.filter((order) => order.status === activeTab);

    setOrders(filtered);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearCart();
      setSearchParams({});
      setTimeout(() => {
        fetchOrders();
      }, 2000);
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-app-cream mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-app-green mb-6">My Orders</h1>

        {/* tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-4 py-2 rounded-full border border-app-border text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-app-green text-white border-app-green"
                  : "text-app-green hover:bg-app-green/10"
              }`}
            >
              {tab === "all" ? "All Orders" : tab}
            </button>
          ))}
        </div>

        {/* orders list */}
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-app-border">
            <Package className="size-10 text-app-text-light mx-auto mb-3" />
            <p className="text-lg font-semibold text-app-green mb-1">No orders found</p>
            <p className="text-sm text-app-text-light mb-4">
              You don't have any orders in this category yet.
            </p>
            <Link
              to="/products"
              className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-app-green rounded-xl hover:bg-app-green/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-app-border p-5"
              >
                {/* header: id + date + status */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-app-text-light">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        statusColors[order.status] || "bg-app-border text-app-text-light"
                      }`}
                    >
                      {order.status}
                    </span>
                    <Link
                      to={`/myorders/${order._id}`}
                      className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border border-app-green text-app-green hover:bg-app-green hover:text-white transition-colors"
                    >
                      <Truck className="size-3.5" />
                      Track Order
                    </Link>
                  </div>
                </div>

                {/* items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-14 object-contain bg-app-cream rounded-lg p-1.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-app-text-light">
                          Qty: {item.quantity} · {item.unit}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* footer: payment + total */}
                <div className="flex items-center justify-between pt-3 border-t border-app-border">
                  <p className="text-sm text-app-text-light">
                    {order.paymentMethod === "cash" ? "Cash on Delivery" : "Paid Online"}
                  </p>
                  <p className="text-base font-semibold text-app-green">
                    Total: {currency}
                    {order.total.toFixed(2)}
                  </p>
                </div>

                {/* cancel order */}
                {CANCELLABLE_STATUSES.includes(order.status) && (
                  <div className="pt-3 mt-1 border-t border-app-border">
                    {confirmingCancelId === order._id ? (
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-sm text-app-error font-medium">
                          Cancel this order? This can't be undone.
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setConfirmingCancelId(null)}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-app-border hover:bg-app-cream transition-colors"
                          >
                            Keep Order
                          </button>
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-app-error text-white hover:bg-app-error/90 transition-colors"
                          >
                            Yes, Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmingCancelId(order._id)}
                        className="flex items-center gap-1.5 text-sm font-medium text-app-error hover:underline"
                      >
                        <XCircle className="size-4" />
                        Cancel Order
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;