import React from 'react';

export function Input({
    label,
    error,
    icon,
    className = '',
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 text-sm text-gray-300 font-medium">
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}

                <input
                    {...props}
                    className={`w-full glass backdrop-blur-md border border-[#00d9ff]/30 rounded-lg px-4 py-3 ${icon ? 'pl-10' : ''
                        } text-white placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/20 transition-all ${className}`}
                />
            </div>

            {error && (
                <p className="mt-1.5 text-sm text-[#ff3366]">
                    {error}
                </p>
            )}
        </div>
    );
}