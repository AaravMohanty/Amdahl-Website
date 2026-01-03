"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [isFocused, setIsFocused] = useState(false);
    const [isGraphHovered, setIsGraphHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const graphProgress = useSpring(0, { stiffness: 60, damping: 20 });

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        mouseX.set(clientX);
        mouseY.set(clientY);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error();
            setStatus("success");
            setEmail("");
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 md:py-32 selection:bg-[#3B5998]/20 selection:text-[#3B5998]"
            onMouseMove={handleMouseMove}
        >
            {/* Interactive Mouse Spotlight */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-0 hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(59, 89, 152, 0.06), transparent 40%)`,
                }}
            />

            {/* Animated Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-[#3B5998]/12 rounded-full blur-3xl"
                    animate={{
                        y: [0, 100, 0],
                        x: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-blue-400/12 rounded-full blur-3xl"
                    animate={{
                        y: [0, -80, 0],
                        x: [0, -60, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)]" />


            {/* Corner Brackets - Minimal */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Left */}
                <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#3B5998]/25" />

                {/* Top Right */}
                <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[#3B5998]/25" />

                {/* Bottom Left */}
                <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[#3B5998]/25" />

                {/* Bottom Right */}
                <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#3B5998]/25" />
            </div>

            <div className="grain" />

            {/* Main Content Container with Subtle Border */}
            <div className="relative z-10 max-w-5xl w-full">
                <div className="absolute inset-0 rounded-xl border border-[#3B5998]/12 bg-white/40 backdrop-blur-sm" />

                <div
                    className={cn(
                        "relative space-y-12 p-8 md:p-12 transition-all duration-700 ease-[0.16,1,0.3,1]",
                        isFocused ? "blur-[2px] opacity-40 scale-[0.99]" : "blur-0 opacity-100 scale-100"
                    )}
                >
                    {/* Main Value Prop */}
                    <div className="text-center space-y-8 pt-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        // Added font-serif
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-light tracking-tight text-black leading-[0.95] px-4"
                    >
                        The operating system <br className="hidden sm:block" /> for public strategy.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-light space-y-2 px-4"
                    >
                        <p>Turn consulting deliverables into auditable, software-driven analysis.</p>
                        <p>Deployed securely in <strong className="font-semibold text-neutral-800">your environment</strong>.</p>
                    </motion.div>
                </div>

                {/* Amdahl's Law Visualization & Definition */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mx-auto max-w-lg pt-4"
                >
                    <div
                        className="flex flex-col items-center text-center space-y-4 group cursor-help"
                        onMouseEnter={() => { setIsGraphHovered(true); graphProgress.set(1); }}
                        onMouseLeave={() => { setIsGraphHovered(false); graphProgress.set(0); }}
                    >
                        {/* Decorative "Asymptote" Line Graph */}
                        <div className="h-12 w-32 relative overflow-hidden opacity-50 transition-opacity group-hover:opacity-100">
                            <svg viewBox="0 0 100 40" className="w-full h-full vector-effect-non-scaling-stroke">
                                <line x1="0" y1="40" x2="100" y2="40" stroke="#eee" strokeWidth="1" />
                                <line x1="0" y1="0" x2="0" y2="40" stroke="#eee" strokeWidth="1" />
                                <motion.path
                                    d="M 0 40 Q 30 40 50 20 T 100 5"
                                    fill="none"
                                    stroke={isGraphHovered ? "#3B5998" : "#999"}
                                    strokeWidth="1.5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                                <motion.line
                                    x1="0" y1="5" x2="100" y2="5"
                                    stroke="#3B5998"
                                    strokeWidth="0.5"
                                    strokeDasharray="2 2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isGraphHovered ? 1 : 0 }}
                                />
                            </svg>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-center gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Amdahl&apos;s Law</span>
                            </div>

                            <p className="font-sans text-base text-neutral-700 transition-colors leading-relaxed">
                                &ldquo;The overall speedup of a system is limited by the time needed for the <span className={cn("transition-all underline decoration-neutral-200 underline-offset-4", isGraphHovered ? "bg-[#3B5998]/10 decoration-[#3B5998] text-[#3B5998]" : "")}>serial fraction</span> of the task.&rdquo;
                            </p>
                        </div>

                        <motion.p
                            className="text-xs text-neutral-400 max-w-xs"
                            animate={{ opacity: isGraphHovered ? 1 : 0.7 }}
                        >
                            We automate the serial part of government work.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Waitlist Input - Integrated */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="border-t border-[#3B5998]/10 pt-8 mt-8"
                >
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="relative group/input">
                            <input
                                type="email"
                                placeholder="name@agency.gov"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                disabled={status === "success" || status === "loading"}
                                className="w-full bg-transparent border-b-2 border-neutral-200 py-3 px-1 text-black placeholder:text-neutral-400 focus:outline-none focus:border-[#3B5998] transition-all duration-300 font-mono text-sm disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status === "success" || status === "loading" || !email}
                                className="absolute right-1 top-1/2 -translate-y-1/2 text-[#3B5998] disabled:opacity-30 transition-all duration-300"
                                aria-label="Submit email"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : status === "success" ? (
                                    <span className="text-xs font-mono text-[#3B5998]">✓</span>
                                ) : (
                                    <ArrowRight className="w-4 h-4 opacity-50 group-hover/input:opacity-100 group-hover/input:translate-x-0.5 transition-all" />
                                )}
                            </button>
                        </div>
                        {status === "error" && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-red-500 mt-2 font-mono"
                            >
                                Error. Please try again.
                            </motion.p>
                        )}
                        {status === "success" && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-[#3B5998] mt-2 font-mono"
                            >
                                Added to waitlist.
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </div>
            </div>
        </section>
    );
}
