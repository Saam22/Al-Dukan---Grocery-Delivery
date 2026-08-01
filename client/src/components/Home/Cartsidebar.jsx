import React from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { XIcon, TruckIcon } from 'lucide-react'

const FREE_DELIVERY_THRESHOLD = 100;
const DELIVERY_FEE = 40;

const Cartsidebar = () => {
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

    const { items, updateQuantity, removeFromCart,
        isCartOpen, setIsCartOpen, cartTotal, cartCount, clearCart } = useCart();
    const navigate = useNavigate();
    if (!isCartOpen) return null;

    const deliveryFee = items.length === 0
        ? 0
        : cartTotal >= FREE_DELIVERY_THRESHOLD
            ? 0
            : DELIVERY_FEE;

    const grandTotal = cartTotal + deliveryFee;
    const amountLeftForFreeDelivery = FREE_DELIVERY_THRESHOLD - cartTotal;

    return (
        <>
            {/* BACKGROUND OVERLAY */}
            <div onClick={() => setIsCartOpen(false)}
                className='fixed inset-0 bg-black/40 z-50 transition-opacity' />
            {/* SIDEBAR */}
            <div className='fixed right-0 top-0 h-full w-full max-w-md bg-white
            z-50 shadow-2xl flex flex-col animate-slide-in-right'>

                {/* Header */}
                <div className='flex items-center justify-between px-6 py-5 border-b border-app-border'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-app-cream rounded-full'>
                            <ShoppingBagIcon className='size-5' />
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold leading-tight'>Your Cart</h2>
                            <p className='text-xs text-app-grey'>
                                {items.length} {items.length === 1 ? 'item' : 'items'}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsCartOpen(false)}
                        className='p-2 rounded-full hover:bg-app-cream transition-colors'>
                        <XIcon className='size-5' />
                    </button>
                </div>

                {/* Free delivery progress banner */}
                {items.length > 0 && deliveryFee > 0 && (
                    <div className='px-6 py-3 bg-app-cream/50 border-b border-app-border flex items-center gap-2'>
                        <TruckIcon className='size-4 text-app-green shrink-0' />
                        <p className='text-xs text-app-grey'>
                            Add <span className='font-semibold text-zinc-800'>{currency}{amountLeftForFreeDelivery.toFixed(2)}</span> more for free delivery
                        </p>
                    </div>
                )}

                {/* Cart Items */}
                <div className='flex-1 overflow-y-auto p-5'>
                    {items.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-full gap-3'>
                            <div className='p-4 bg-app-cream rounded-full'>
                                <ShoppingBagIcon className='size-8 text-app-grey' />
                            </div>
                            <p className='text-sm font-medium text-app-grey'>Your cart is empty</p>
                            <button onClick={() => { setIsCartOpen(false); navigate('/products'); }}
                                className='text-sm font-semibold text-app-green hover:underline'>
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {items.map((item) => (
                                <div key={item.product._id} className='flex gap-3 pb-4 border-b border-app-border last:border-0'>
                                    <img src={item.product.image} alt={item.product.title}
                                        className='w-16 h-16 object-cover rounded-lg bg-app-cream shrink-0' />

                                    <div className='flex-1 min-w-0 flex flex-col justify-between'>
                                        <div>
                                            <p className='font-semibold text-sm truncate'>{item.product.title}</p>
                                            <p className='text-xs text-app-grey truncate'>{item.product.description}</p>
                                        </div>
                                        <div className='flex items-center justify-between mt-2'>
                                            <div className='flex items-center gap-2 bg-app-cream rounded-full px-1 py-1'>
                                                <button onClick={() => updateQuantity(item.product, item.quantity - 1)}
                                                    className='size-6 flex items-center justify-center rounded-full hover:bg-white transition-colors text-sm font-semibold'>
                                                    −
                                                </button>
                                                <span className='text-sm font-medium w-4 text-center'>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product, item.quantity + 1)}
                                                    className='size-6 flex items-center justify-center rounded-full hover:bg-white transition-colors text-sm font-semibold'>
                                                    +
                                                </button>
                                            </div>
                                            <p className='text-sm font-semibold'>
                                                {currency}{(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <button onClick={() => removeFromCart(item.product)}
                                        className='self-start p-1.5 rounded-full hover:bg-app-cream transition-colors text-app-grey hover:text-app-error shrink-0'>
                                        <XIcon className='size-4' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart Footer */}
                {items.length > 0 && (
                    <div className='px-6 py-5 border-t border-app-border bg-app-cream/30'>
                        <div className='space-y-2 mb-4'>
                            <div className='flex justify-between'>
                                <p className='text-sm text-app-grey'>Subtotal</p>
                                <p className='text-sm font-medium'>{currency}{cartTotal.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-sm text-app-grey'>Delivery Fee</p>
                                <span className='text-sm font-medium'>
                                    {deliveryFee === 0
                                        ? <span className='text-app-success'>Free</span>
                                        : `${currency}${deliveryFee.toFixed(2)}`}
                                </span>
                            </div>
                            {deliveryFee > 0 && (
                                <p className='text-xs text-app-grey text-right'>
                                    Free delivery on orders over {currency}{FREE_DELIVERY_THRESHOLD}
                                </p>
                            )}
                            <div className='flex justify-between pt-2 border-t border-app-border'>
                                <p className='text-base font-semibold'>Total</p>
                                <p className='text-base font-semibold'>{currency}{grandTotal.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <button onClick={() => navigate('/checkout')}
                                className='px-4 py-3 rounded-xl bg-app-green text-white font-semibold hover:bg-app-green/90 transition-colors'>
                                Checkout
                            </button>
                            <button onClick={() => clearCart()}
                                className='px-4 py-3 rounded-xl text-app-grey font-medium hover:bg-app-cream transition-colors text-sm'>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Cartsidebar