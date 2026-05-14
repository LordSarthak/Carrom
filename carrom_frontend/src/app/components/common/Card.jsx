import React from 'react';
import { motion } from 'framer-motion';

export function Card({
    children,
    className = '',
    hover = false,
    neonGlow = false,
    onClick,
}) {
    return (
        <motion.div
            whileHover={hover ? { scale: 1.02, y: -4 } : {}}
            onClick={onClick}
            className={`glass backdrop-blur-md rounded-xl p-6 border border-[#00d9ff]/20 ${neonGlow ? 'shadow-[0_0_20px_rgba(0,217,255,0.3)]' : ''
                } ${onClick ? 'cursor-pointer' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
}