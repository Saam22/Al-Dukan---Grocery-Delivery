import React from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { XIcon } from 'lucide-react'

const Cartsidebar = () => {
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

    const { items, updateQuantity, removeFromCart,
        isCartOpen, setIsCartOpen, cartTotal, cartCount, clearCart } = useCart();
    const navigate = useNavigate();
    if (!isCartOpen) return null;
    const deliveryFee = cartTotal > 20 ? 0 : 1.99;
    const grandTotal = cartTotal + deliveryFee;
    return (
        <>
            {/* BACKGROUND OVERLAY */}
            <div onClick={() => setIsCartOpen(false)}
                className='fixed inset-0 bg-black/40 z-50 transition-opacity' />
            {/* SIDEBAR */}
            <div className='fixed right-0 top-0 h-full w-full max-w-md bg-white
            z-50 shadow-2xl flex flex-col animate-slide-in-right'>
                {/* Header */}
                <div className='flex items-center justify-between p-5 border-b border-app-border'>
                    <div className='flex items-center gap-2'>
                        <ShoppingBagIcon className='size-5' />
                        <h2 className='px-1 text-lg font-semibold'>Your Cart</h2>
                        <span className='px-3 py-1.5 text-xs font-semibold bg-app-cream rounded-full'>
                            {items.length} Items</span>
                    </div>
                    <button onClick={() => setIsCartOpen(false)}
                        className='p-2 rounded-full hover:bg-app-cream transition-colors'>
                        <XIcon className='size-5' />
                    </button>
                </div>
                {/* Cart Items */}
                <div className='flex-1 overflow-y-auto p-5'>
                    {items.length === 0 ? (
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-sm text-app-grey'>Your Cart is Empty</p>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {items.map((item) => (
                                <div key={item.product._id} className='flex gap-4'>
                                    <img src={item.product.image} alt={item.product.title} className='w-16 h-16 object-cover' />
                                    <div className='flex-1 flex flex-col'>
                                        <p className='font-semibold'>{item.product.title}</p>
                                        <p className='text-sm text-app-grey'>{item.product.description}</p>
                                        <p className='text-sm text-app-grey'>{currency}{item.product.price}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button onClick={() => updateQuantity(item.product, item.quantity - 1)}
                                            className='p-2 rounded-full hover:bg-app-cream transition-colors'>
                                            -
                                        </button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => updateQuantity(item.product, item.quantity + 1)}
                                            className='p-2 rounded-full hover:bg-app-cream transition-colors'>
                                            +
                                        </button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.product)}
                                        className='p-2 rounded-full hover:bg-app-cream transition-colors'>
                                        <XIcon className='size-5' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Cart Footer */}
                <div className='p-5 border-t border-app-border'>
                    <div className='flex justify-between mb-4'>
                        <p className='text-sm font-semibold'>Subtotal</p>
                        <p className='text-sm font-semibold'>{currency}{cartTotal}</p>
                    </div>
                    <div className='flex justify-between mb-4'>
                        <p className='text-sm font-semibold'>Delivery Fee</p>
                        <span className='text-sm font-semibold'>{deliveryFee === 0 ? <span className='text-app-success'>Free</span> : `${currency}${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    {deliveryFee > 0 && (
                        <div className='flex justify-between mb-4'>
                            <p className='text-sm font-semibold'>Note</p>
                            <p className='text-sm text-app-grey'>Free delivery for orders above $20. Delivery fee</p>
                        </div>
                    )}
                    <div className='flex justify-between mb-4'>
                        <p className='text-sm font-semibold'>Total</p>
                        <p className='text-sm font-semibold'>{currency}{grandTotal}</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <button onClick={() => navigate('/checkout')}
                            className='px-4 py-3 rounded-xl bg-app-green text-white font-semibold hover:bg-app-green/90'>
                            Checkout
                        </button>
                        <button onClick={() => clearCart()}
                            className='px-4 py-3 rounded-xl bg-app-cream text-app-grey font-semibold hover:bg-app-cream/90'>
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cartsidebar