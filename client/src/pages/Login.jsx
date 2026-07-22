import { useState } from "react"
import { heroSectionData } from "../assets/assets"
import { Link } from "react-router-dom"
import { BikeIcon, UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        
        if (!email || !password) {
            setError("Please fill in all required fields")
            return
        }
        
        if (!isLogin && !name) {
            setError("Please enter your name")
            return
        }

        setLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            window.location.href = "/"
        } catch (err) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side */}
            <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
                <img 
                    src={heroSectionData.hero_image} 
                    alt="" 
                    className="absolute inset-0 object-cover h-full bg-center opacity-10"
                />
                <div className="relative text-center px-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        {isLogin ? "Welcome back to Al-Dukan" : "Join Al-Dukan today"}
                    </h2>
                    <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">
                        Fresh groceries and organic produce, delivered to your doorstep.
                    </p>
                </div>
            </div>
            
            {/* Right side */}
            <div className="flex-1 flex items-center justify-center px-4 py-12 bg-app-cream">
                <div className="w-full max-w-md">
                    {/* Form header message */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <BikeIcon className="size-8 text-app-green" />
                            <span className="text-3xl font-bold text-app-green">Al-Dukan</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-app-green mb-2">
                            {isLogin ? "Sign in to your account" : "Create your account"}
                        </h1>
                        <p className="text-sm text-app-text-light">
                            {isLogin ? "Don't have an account?" : "Already have an account?"} 
                            <button 
                                onClick={() => {
                                    setIsLogin(!isLogin)
                                    setError("")
                                }} 
                                className="text-orange-600 font-semibold ml-1 hover:text-orange-700 transition-colors"
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>

                    {/* Login/Reg Form */}
                    <motion.form 
                        onSubmit={handleSubmit} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-white shadow-lg rounded-xl px-8 py-8 space-y-5"
                    >
                        {/* Error Message */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5 border border-red-200 overflow-hidden"
                                    role="alert"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Name Field - Conditional */}
                        <AnimatePresence mode="wait" initial={false}>
                            {!isLogin && (
                                <motion.div
                                    key="name-field"
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ 
                                        opacity: 1, 
                                        height: "auto",
                                        marginBottom: 20 
                                    }}
                                    exit={{ 
                                        opacity: 0, 
                                        height: 0,
                                        marginBottom: 0 
                                    }}
                                    transition={{ 
                                        duration: 0.25,
                                        ease: "easeInOut"
                                    }}
                                    className="overflow-hidden"
                                >
                                    <label 
                                        htmlFor="name" 
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <UserIcon className="size-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required={!isLogin}
                                            placeholder="Full Name"
                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 
                                                    focus:outline-none focus:ring-2 focus:ring-app-green/50 
                                                    focus:border-app-green transition-all duration-200
                                                    placeholder:text-gray-400"
                                            aria-label="Full name"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email Field with Icon */}
                        <motion.div
                            className="space-y-1.5"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                        >
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <MailIcon className="size-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5
                                            focus:outline-none focus:ring-2 focus:ring-app-green/50 
                                            focus:border-app-green transition-all duration-200
                                            placeholder:text-gray-400"
                                    aria-label="Email address"
                                    autoComplete="email"
                                />
                            </div>
                        </motion.div>

                        {/* Password Field with Icon */}
                        <motion.div
                            className="space-y-1.5"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                <label 
                                    htmlFor="password" 
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                {isLogin && (
                                    <button
                                        type="button"
                                        className="text-sm text-app-green hover:text-app-green-dark 
                                                transition-colors font-medium"
                                        onClick={() => {/* Handle forgot password */}}
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <LockIcon className="size-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder={isLogin ? "Enter your password" : "Create a password (min 6 chars)"}
                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-2.5
                                            focus:outline-none focus:ring-2 focus:ring-app-green/50 
                                            focus:border-app-green transition-all duration-200
                                            placeholder:text-gray-400"
                                    aria-label="Password"
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                    minLength={6}
                                />
                                {/* Show/Hide Password Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="size-5" />
                                    ) : (
                                        <EyeIcon className="size-5" />
                                    )}
                                </button>
                            </div>
                            {!isLogin && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Must be at least 6 characters
                                </p>
                            )}
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className={`w-full bg-app-green text-white font-semibold py-3 px-4 
                                    rounded-lg hover:bg-app-green-dark transition-all duration-200
                                    shadow-sm hover:shadow-md focus:outline-none focus:ring-2 
                                    focus:ring-app-green/50 focus:ring-offset-2
                                    ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {loading ? (
                                    <motion.span
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center justify-center gap-3"
                                    >
                                        <motion.span
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                        />
                                        <span>Please wait...</span>
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="text"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {isLogin ? "Sign In" : "Create Account"}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </div>
    )
}

export default Login