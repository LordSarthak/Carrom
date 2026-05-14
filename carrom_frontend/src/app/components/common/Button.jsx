import React from 'react';
import { motion } from 'framer-motion';

export function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    icon,
    className = '',
    type = 'button',
}) {
    const baseStyles =
        'rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium';

    const variants = {
        primary:
            'bg-gradient-to-r from-[#00d9ff] to-[#00ff88] text-black hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed',

        secondary:
            'bg-[#1a1f35] text-white border border-[#00d9ff]/50 hover:bg-[#252b45] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] disabled:opacity-50',

        outline:
            'border-2 border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black disabled:opacity-50',

        ghost:
            'text-[#00d9ff] hover:bg-[#1a1f35]/50 disabled:opacity-50',

        danger:
            'bg-[#ff3366] text-white hover:bg-[#ff4477] hover:shadow-[0_0_20px_rgba(255,51,102,0.4)] disabled:opacity-50',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-2.5',
        lg: 'px-8 py-3.5 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''
                } ${className}`}
        >
            {icon && <span>{icon}</span>}
            {children}
        </motion.button>
    );
}