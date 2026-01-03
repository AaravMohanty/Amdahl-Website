"use client";

import { motion } from "framer-motion";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative z-10 border-t border-neutral-100 bg-white/80 backdrop-blur-sm"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-sm text-neutral-500">
                    <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                        <span className="font-mono text-[10px] sm:text-xs">
                            &copy; {currentYear} Amdahl
                        </span>
                        <span className="text-neutral-300 hidden sm:inline">|</span>
                        <span className="font-mono text-[10px] sm:text-xs">
                            AI-Native Strategy Workflows
                        </span>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href="mailto:contact@amdahl.ai"
                            className="font-mono text-[10px] sm:text-xs text-neutral-500 hover:text-[#3B5998] transition-colors duration-300 active:text-[#3B5998]"
                        >
                            Contact
                        </a>
                        <a
                            href="/privacy"
                            className="font-mono text-[10px] sm:text-xs text-neutral-500 hover:text-[#3B5998] transition-colors duration-300 active:text-[#3B5998]"
                        >
                            Privacy
                        </a>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
