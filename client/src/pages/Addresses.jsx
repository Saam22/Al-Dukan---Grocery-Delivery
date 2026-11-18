import React, { useEffect, useState } from "react";
import { Building2, Home, Loader2, MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { dummyAddressData } from "../assets/assets";

const STORAGE_KEY = "al-dukan-addresses";
const emptyForm = {
  label: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  isDefault: false,
};

const createAddressId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `address-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAddresses(parsed);
        } else {
          setAddresses(dummyAddressData);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyAddressData));
        }
      } else {
        setAddresses(dummyAddressData);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyAddressData));
        }
      }
    } catch (error) {
      setAddresses(dummyAddressData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    }
  }, [addresses, loading]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedForm = {
      label: form.label.trim() || "Address",
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      zip: form.zip.trim(),
      isDefault: form.isDefault,
    };

    if (!trimmedForm.address || !trimmedForm.city || !trimmedForm.state || !trimmedForm.zip) {
      return;
    }

    setAddresses((prev) => {
      let nextAddresses = [...prev];

      if (editingId) {
        nextAddresses = prev.map((address) =>
          address._id === editingId ? { ...address, ...trimmedForm } : address
        );
      } else {
        nextAddresses = [
          ...prev,
          {
            ...trimmedForm,
            _id: createAddressId(),
            lat: 30.0444,
            lng: 31.2357,
          },
        ];
      }

      if (trimmedForm.isDefault) {
        nextAddresses = nextAddresses.map((address) => ({
          ...address,
          isDefault: address._id === (editingId ?? nextAddresses[nextAddresses.length - 1]._id),
        }));
      }

      return nextAddresses;
    });

    resetForm();
  };

  const handleEdit = (address) => {
    setEditingId(address._id);
    setForm({
      label: address.label,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      isDefault: address.isDefault,
    });
    setShowForm(true);
  };

  const handleDelete = (addressId) => {
    setAddresses((prev) => {
      const filtered = prev.filter((address) => address._id !== addressId);

      if (filtered.length === 0) {
        return [];
      }

      const removedAddress = prev.find((address) => address._id === addressId);
      if (removedAddress?.isDefault) {
        return filtered.map((address, index) => ({
          ...address,
          isDefault: index === 0,
        }));
      }

      return filtered;
    });
  };

  const handleSetDefault = (addressId) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address._id === addressId,
      }))
    );
  };

  const defaultAddress = addresses.find((address) => address.isDefault) || addresses[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-app-orange">My Account</p>
          <h1 className="text-3xl font-semibold text-app-green">Saved Addresses</h1>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-app-green px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-app-green-light"
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-app-border bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-500">Total Addresses</span>
            <MapPin className="text-app-green" size={18} />
          </div>
          <p className="text-3xl font-semibold text-app-green">{addresses.length}</p>
        </div>

        <div className="rounded-2xl border border-app-border bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-500">Default</span>
            <Star className="text-app-orange" size={18} />
          </div>
          <p className="text-lg font-semibold text-app-green">{defaultAddress ? defaultAddress.label : "None"}</p>
        </div>

        <div className="rounded-2xl border border-app-border bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-500">Delivery Zone</span>
            <Building2 className="text-app-green" size={18} />
          </div>
          <p className="text-lg font-semibold text-app-green">{defaultAddress ? defaultAddress.city : "Add a location"}</p>
        </div>
      </div>

      {showForm && (
        <div className="mb-8 rounded-3xl border border-app-border bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-app-green">{editingId ? "Edit Address" : "Add New Address"}</h2>
              <p className="text-sm text-zinc-500">Set up where your orders should be delivered.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-zinc-700">Label</label>
              <input
                type="text"
                name="label"
                value={form.label}
                onChange={handleInputChange}
                placeholder="Home, Work, Apartment"
                className="w-full rounded-xl border border-app-border bg-app-cream px-3.5 py-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-app-green"
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-zinc-700">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInputChange}
                placeholder="Cairo"
                className="w-full rounded-xl border border-app-border bg-app-cream px-3.5 py-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-app-green"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-700">Street Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                placeholder="12 El Nasr Street"
                className="w-full rounded-xl border border-app-border bg-app-cream px-3.5 py-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-app-green"
                required
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-zinc-700">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleInputChange}
                placeholder="Cairo Governorate"
                className="w-full rounded-xl border border-app-border bg-app-cream px-3.5 py-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-app-green"
                required
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-zinc-700">ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={form.zip}
                onChange={handleInputChange}
                placeholder="11829"
                className="w-full rounded-xl border border-app-border bg-app-cream px-3.5 py-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-app-green"
                required
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-app-border text-app-green focus:ring-app-green"
                />
                Set as default address
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-app-border bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-app-green px-4 py-2.5 text-sm font-medium text-white hover:bg-app-green-light"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-56 animate-pulse rounded-3xl border border-app-border bg-white/80 p-5" />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-app-border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-app-cream text-app-green">
            <MapPin size={26} />
          </div>
          <h3 className="text-xl font-semibold text-app-green">No addresses saved yet</h3>
          <p className="mt-2 text-sm text-zinc-500">Add your first delivery location to continue shopping.</p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-app-green px-4 py-2.5 text-sm font-medium text-white hover:bg-app-green-light"
          >
            <Plus size={16} />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`rounded-3xl border p-5 shadow-sm transition ${address.isDefault
                  ? "border-app-green bg-app-cream shadow-app-green/10"
                  : "border-app-border bg-white hover:border-app-green/40"
                }`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${address.isDefault ? "bg-app-green text-white" : "bg-zinc-100 text-zinc-700"}`}>
                    {address.label?.toLowerCase() === "work" ? <Building2 size={18} /> : <Home size={18} />}
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-app-green">{address.label || "Address"}</p>
                    {address.isDefault && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-app-orange/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-app-orange">
                        <Star size={10} />
                        Default
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address._id)}
                      className="rounded-lg border border-app-border bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:border-app-green hover:text-app-green"
                    >
                      Set default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    className="rounded-lg border border-app-border bg-white p-2 text-zinc-700 hover:border-app-green hover:text-app-green"
                    aria-label="Edit address"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(address._id)}
                    className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    aria-label="Delete address"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-zinc-600">
                <p className="leading-6">{address.address}</p>
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && <Loader2 className="mt-4 animate-spin text-app-green" size={18} />}
    </div>
  );
};

export default Addresses;