import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { dummyDashboardOrdersData, statusColors } from "../assets/assets";
import {
  ChevronLeft,
  Clock,
  Check,
  Truck,
  Package,
  CheckCheck,
  Phone,
  MapPin,
  KeyRound,
} from "lucide-react";
import Loading from "../components/Loading";

/* ------------------------------------------------------------------ */
/* Map marker (custom red pin, matches app styling, avoids the broken */
/* default leaflet icon path issue with bundlers like Vite)           */
/* ------------------------------------------------------------------ */
const pinIcon = new L.DivIcon({
  html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 6.5 11.25 7.06 11.76a1.4 1.4 0 0 0 1.88 0C13.5 21.25 20 15.25 20 10c0-4.42-3.58-8-8-8Z" fill="#DC2626"/>
    <circle cx="12" cy="10" r="3" fill="white"/>
  </svg>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

/* Leaflet's MapContainer only applies `center` on the initial mount —
   changing it afterwards does nothing on its own. This helper re-pans
   the view any time the position actually changes (e.g. address update,
   live courier location update). */
const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position[0], position[1]]);

  return null;
};

/* ------------------------------------------------------------------ */
/* Delivery progress timeline config                                  */
/* ------------------------------------------------------------------ */
const ALL_STEPS = ["Placed", "Confirmed", "Assigned", "Packed", "Out for Delivery", "Delivered"];

const STEP_ICONS = {
  Placed: Clock,
  Confirmed: Check,
  Assigned: Truck,
  Packed: Package,
  "Out for Delivery": Truck,
  Delivered: CheckCheck,
};

const buildTimeline = (order) => {
  const history = order.statusHistory || [];
  const currentIndex = ALL_STEPS.indexOf(order.status);

  return ALL_STEPS.map((step, index) => {
    const entry = history.find((h) => h.status === step);
    const isCompleted = Boolean(entry) || index < currentIndex;
    const isCurrent = step === order.status;
    return {
      status: step,
      timestamp: entry?.timestamp || null,
      note: entry?.note || null,
      isCompleted,
      isCurrent,
    };
  });
};

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    const foundOrder = dummyDashboardOrdersData.find((o) => o._id === id);
    if (!foundOrder) {
      navigate("/404");
      return;
    }

    setOrder(foundOrder);
    setLoading(false);
  }, [id, navigate]);

  if (loading || !order) {
    return <Loading />;
  }

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const timeline = buildTimeline(order);
  const otpDigits = (order.deliveryOtp || "").split("");
  const mapPosition = order.liveLocation
    ? [order.liveLocation.lat, order.liveLocation.lng]
    : order.shippingAddress
    ? [order.shippingAddress.lat, order.shippingAddress.lng]
    : [30.0444, 31.2357]; // fallback: Cairo

  return (
    <div className="min-h-screen bg-app-cream mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* back link */}
        <button
          onClick={() => navigate("/myorders")}
          className="flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors mb-6"
        >
          <ChevronLeft className="size-4" />
          Back to Orders
        </button>

        {/* header */}
        <div className="flex items-start justify-between flex-wrap gap-2 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-sm text-app-text-light mt-0.5">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <span
            className={`text-sm font-semibold px-4 py-1.5 rounded-full ${
              statusColors[order.status] || "bg-app-border text-app-text-light"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* left column */}
          <div className="md:col-span-2 space-y-6">
            {/* delivery OTP */}
            {order.deliveryOtp && (
              <div className="bg-app-green rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <KeyRound className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Delivery OTP</p>
                    <p className="text-sm text-white/70">
                      Share this with your delivery partner
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {otpDigits.map((digit, index) => (
                    <div
                      key={index}
                      className="size-12 rounded-lg bg-white/10 flex items-center justify-center text-xl font-bold"
                    >
                      {digit}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* live map */}
            <div className="bg-white rounded-2xl border border-app-border overflow-hidden">
              <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "360px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition} icon={pinIcon} />
                <RecenterMap position={mapPosition} />
              </MapContainer>
            </div>

            {/* delivery progress */}
            <div className="bg-white rounded-2xl border border-app-border p-6">
              <h2 className="text-lg font-semibold mb-6">Delivery Progress</h2>
              <div>
                {timeline.map((step, index) => {
                  const Icon = STEP_ICONS[step.status];
                  const isLast = index === timeline.length - 1;

                  return (
                    <div key={step.status} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`size-9 shrink-0 rounded-full flex items-center justify-center ${
                            step.isCurrent
                              ? "bg-app-green ring-4 ring-app-green/20"
                              : step.isCompleted
                              ? "bg-app-green"
                              : "bg-app-border"
                          }`}
                        >
                          <Icon
                            className={`size-4 ${
                              step.isCompleted || step.isCurrent
                                ? "text-white"
                                : "text-app-text-light"
                            }`}
                          />
                        </div>
                        {!isLast && (
                          <div
                            className={`w-0.5 flex-1 min-h-[36px] ${
                              step.isCompleted ? "bg-app-green" : "bg-app-border"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-8">
                        <p
                          className={`text-sm font-semibold ${
                            step.isCompleted || step.isCurrent
                              ? "text-app-text"
                              : "text-app-text-light"
                          }`}
                        >
                          {step.status}
                        </p>
                        {step.timestamp && (
                          <p className="text-xs text-app-text-light mt-0.5">
                            {formatDate(step.timestamp)}, {formatTime(step.timestamp)}
                          </p>
                        )}
                        {step.note && (
                          <p className="text-xs text-app-text-light mt-0.5">{step.note}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* delivery partner */}
            {order.deliveryPartner && (
              <div className="bg-white rounded-2xl border border-app-border p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full bg-app-green text-white font-semibold flex items-center justify-center">
                    {order.deliveryPartner.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{order.deliveryPartner.name}</p>
                    <p className="text-xs text-app-text-light">Delivery Partner</p>
                  </div>
                </div>
                {order.deliveryPartner.phone && (
                  <a
                    href={`tel:${order.deliveryPartner.phone}`}
                    className="size-10 rounded-full border border-app-border flex items-center justify-center hover:bg-app-cream transition-colors"
                  >
                    <Phone className="size-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* right column */}
          <div className="space-y-6">
            {/* delivery address */}
            {order.shippingAddress && (
              <div className="bg-white rounded-2xl border border-app-border p-6">
                <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="size-4 text-app-green" />
                  Delivery Address
                </h2>
                <p className="text-sm font-medium">{order.shippingAddress.label}</p>
                <p className="text-sm text-app-text-light mt-1 leading-relaxed">
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                </p>
              </div>
            )}

            {/* items + totals */}
            <div className="bg-white rounded-2xl border border-app-border p-6">
              <h2 className="text-base font-semibold mb-4">
                Items ({order.items.length})
              </h2>
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-12 object-contain bg-app-cream rounded-lg p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-app-text-light">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-app-border space-y-1.5 text-sm">
                <div className="flex justify-between text-app-text-light">
                  <span>Subtotal</span>
                  <span>
                    {currency}
                    {order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-app-text-light">
                  <span>Delivery</span>
                  <span>
                    {order.deliveryFee > 0
                      ? `${currency}${order.deliveryFee.toFixed(2)}`
                      : "Free"}
                  </span>
                </div>
                <div className="flex justify-between text-app-text-light">
                  <span>Tax</span>
                  <span>
                    {currency}
                    {order.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 mt-1 border-t border-app-border">
                  <span>Total</span>
                  <span>
                    {currency}
                    {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;