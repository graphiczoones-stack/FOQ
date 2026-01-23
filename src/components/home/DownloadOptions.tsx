"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Github, HardDrive, Cloud, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadOption {
    label: string;
    icon: React.ElementType;
    url: string;
    color: string;
}

const options: DownloadOption[] = [
    {
        label: "تحميل مباشر",
        icon: Smartphone,
        url: "/FOQ.apk",
        color: "bg-neon-green text-black hover:bg-neon-green/90"
    },
    {
        label: "Google Drive",
        icon: HardDrive,
        url: "https://drive.google.com/uc?export=download&id=1iFJnONpL47KwrM3tnbIWm00InbdZSeD1",
        color: "bg-blue-600 text-white hover:bg-blue-700"
    },
    {
        label: "GitHub",
        icon: Github,
        url: "https://github.com/graphiczoones-stack/FOQ/releases/download/v1.0/FOQ.apk",
        color: "bg-gray-800 text-white hover:bg-gray-900"
    },
    {
        label: "Dropbox",
        icon: Cloud,
        url: "https://www.dropbox.com/scl/fi/a1f12l016le0omc6s87d5/FOQ.apk?rlkey=m9w2f752au7uo4bp3ci0672vl&st=gxkce2od&dl=1",
        color: "bg-cyan-600 text-white hover:bg-cyan-700"
    }
];

export function DownloadOptions() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-xl bg-neon-green text-black hover:bg-neon-green/90 hover:scale-105 shadow-[0_0_20px_rgba(0,255,204,0.2)] transition-all duration-300 flex items-center gap-2"
            >
                <Download className="w-5 h-5" />
                حمل اللعبة
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <div className="relative z-[99999]">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal */}
                        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 pointer-events-auto relative overflow-hidden"
                            >
                                {/* Background Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 blur-[50px] -z-10" />

                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-white font-cairo">اختار طريقة التحميل</h2>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {options.map((option, index) => (
                                        <motion.a
                                            key={option.label}
                                            href={option.url}
                                            target="_blank" // Direct download usually handles itself, but blank is safer for external links
                                            rel="noopener noreferrer" // Security best practice
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            download={option.label === "تحميل مباشر" ? "FOQ.apk" : undefined}
                                            className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 group ${option.color}`}
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center shrink-0">
                                                <option.icon className="w-6 h-6" />
                                            </div>
                                            <span className="font-bold font-cairo text-lg">{option.label}</span>
                                            <Download className="w-5 h-5 mr-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
