"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 z-50 flex justify-center items-start pt-6 sm:pt-8 md:pt-10"
        >
            <Link href="/" className="group relative transition-all duration-300">
                <div className="relative">
                    {/* Background with border */}
                    <div className="absolute inset-0 -inset-x-4 sm:-inset-x-6 -inset-y-2 sm:-inset-y-3 rounded-lg sm:rounded-xl border border-[#3B5998]/10 bg-white/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />

                    {/* Logo text */}
                    <span className="relative font-sans text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-black group-hover:text-[#3B5998] transition-colors duration-300">
                        Amdahl
                    </span>

                    {/* Decorative underline */}
                    <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#3B5998] to-transparent"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </Link>
        </motion.nav>
    );
}
