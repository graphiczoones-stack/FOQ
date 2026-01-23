"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewsOverlay } from "../home/ReviewsOverlay";
import { DownloadOptions } from "../home/DownloadOptions";

const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الآراء", href: "/reviews" },
    { name: "عن اللعبة", href: "/about" },
    { name: "أنظمة اللعب", href: "/modes" },
    { name: "الصور", href: "/gallery" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = React.useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const handleLinkClick = (e: React.MouseEvent, href: string) => {
        setIsMobileMenuOpen(false);
        if (href === "/reviews") {
            e.preventDefault();
            setIsReviewsOpen(true);
        }
    };

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pt-4",
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={cn(
                "container max-w-5xl mx-4 rounded-full transition-all duration-300 flex items-center justify-between px-6",
                isScrolled
                    ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-3"
                    : "bg-transparent py-4"
            )}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center">
                        <Image
                            src="/logo.svg"
                            alt="Fouq Logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-white group-hover:text-neon-green transition-colors font-voltex">
                        فوق
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-sm font-bold text-white/85 hover:text-white transition-colors relative group font-cairo"
                        >
                            {link.name}
                            <span className="absolute right-0 bottom-[-4px] w-0 h-[2px] bg-neon-green group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#00ffcc]" />
                        </Link>
                    ))}
                    <DownloadOptions />
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-white hover:text-neon-green transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav Overlay - Full Screen */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center justify-center h-full gap-8 px-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Logo in Menu */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="relative w-12 h-12 overflow-hidden flex items-center justify-center">
                                    <Image
                                        src="/logo.svg"
                                        alt="Fouq Logo"
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-3xl font-black text-white font-voltex">
                                    فوق
                                </span>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-6 w-full max-w-sm">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-green/50 text-xl font-bold text-white text-center font-cairo transition-all"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Download Button */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-4 flex justify-center"
                                >
                                    <DownloadOptions />
                                </motion.div>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ReviewsOverlay
                isOpen={isReviewsOpen}
                onClose={() => setIsReviewsOpen(false)}
            />
        </motion.header>
    );
}
