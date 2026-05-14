import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
}) {
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={`glass backdrop-blur-xl rounded-2xl p-6 ${sizes[size]
                                } w-full max-h-[90vh] overflow-y-auto border border-[#00d9ff]/30 shadow-[0_0_40px_rgba(0,217,255,0.2)]`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {title && (
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold text-white">
                                        {title}
                                    </h2>

                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            )}

                            {children}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}