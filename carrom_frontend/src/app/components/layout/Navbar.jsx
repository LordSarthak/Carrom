import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    Trophy,
    User,
    Settings,
    Menu,
    X,
    Coins,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: "Game", path: "/", icon: Home },
        { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
        { name: "Profile", path: "/profile", icon: User },
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    const handleAuthClick = () => {
        if (user?.isGuest) {
            navigate("/login");
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass backdrop-blur-xl border-b border-[#00d9ff]/20 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-10 h-10 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                        >
                            <span className="text-black font-bold text-xl">C</span>
                        </motion.div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff88] bg-clip-text text-transparent">
                            Carrom Pro
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive(item.path)
                                        ? "bg-[#00d9ff]/10 text-[#00d9ff]"
                                        : "text-gray-300 hover:text-[#00d9ff] hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={18} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Info */}
                    <div className="hidden md:flex items-center gap-4">
                        {user && (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-[#fbbf24]/30"
                                >
                                    <Coins size={18} className="text-[#fbbf24]" />
                                    <span className="text-white font-semibold">
                                        {user.coins.toLocaleString()}
                                    </span>
                                </motion.div>

                                {user.isGuest ? (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleAuthClick}
                                        className="px-6 py-2 bg-gradient-to-r from-[#00d9ff] to-[#00ff88] text-black rounded-lg font-semibold shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                                    >
                                        Login / Sign Up
                                    </motion.button>
                                ) : (
                                    <Link to="/profile">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center gap-2 px-3 py-2 glass rounded-lg border border-[#00d9ff]/30"
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center">
                                                <span className="text-black font-bold text-sm">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-white font-medium">
                                                {user.username}
                                            </span>
                                        </motion.div>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t border-[#00d9ff]/20 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-2">

                            {user && (
                                <div className="flex items-center gap-3 p-3 glass rounded-lg mb-3 border border-[#00d9ff]/20">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center">
                                        <span className="text-black font-bold">
                                            {user.username.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">
                                            {user.username}
                                        </p>
                                        <div className="flex items-center gap-1 text-[#fbbf24] text-sm">
                                            <Coins size={14} />
                                            <span>{user.coins.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                            ? "bg-[#00d9ff]/10 text-[#00d9ff]"
                                            : "text-gray-300 hover:bg-white/5"
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            ))}

                            {user?.isGuest && (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <button className="w-full px-6 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00ff88] text-black rounded-lg font-semibold">
                                        Login / Sign Up
                                    </button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}