import React from 'react';
import { motion } from 'framer-motion';

export function Loader({ size = 'md', fullScreen = false }) {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    const loader = (
        <div className="flex items-center justify-center">
            <motion.div
                className={`${sizes[size]} border-4 border-[#00d9ff]/20 border-t-[#00d9ff] rounded-full`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                {loader}
            </div>
        );
    }

    return loader;
}