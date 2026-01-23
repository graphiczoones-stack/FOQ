"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle, ShieldCheck } from "lucide-react";

export function DownloadOptions() {
    const [status, setStatus] = useState<"idle" | "downloading" | "completed">("idle");
    const [progress, setProgress] = useState(0);

    const handleDownload = () => {
        if (status !== "idle") return;

        setStatus("downloading");
        setProgress(0);

        // Realistic progress simulation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        // Finalize download
        setTimeout(() => {
            setStatus("completed");
            // Actual file download trigger
            const link = document.createElement("a");
            link.href = "/FOQ.apk";
            link.download = "FOQ.apk";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Reset after some time
            setTimeout(() => setStatus("idle"), 5000);
        }, 2500);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handleDownload}
                className="relative h-12 px-8 rounded-full bg-white/5 border border-white/10 overflow-hidden transition-all hover:bg-white/10 active:scale-95 group min-w-[220px] backdrop-blur-md"
            >
                {/* Progress Bar Layer */}
                <AnimatePresence>
                    {status === "downloading" && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="absolute inset-y-0 left-0 bg-neon-green/20"
                            transition={{ ease: "linear" }}
                        />
                    )}
                </AnimatePresence>

                <div className="relative flex items-center justify-center gap-3 h-full">
                    <AnimatePresence mode="wait">
                        {status === "idle" && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                            >
                                <Download className="w-4 h-4 text-neon-green" />
                                <span className="text-white font-bold font-cairo text-sm">تحميل اللعبة</span>
                            </motion.div>
                        )}
                        {status === "downloading" && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-3 h-3 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
                                <span className="text-white font-medium font-cairo text-[13px]">جاري التحميل... {Math.round(progress)}%</span>
                            </motion.div>
                        )}
                        {status === "completed" && (
                            <motion.div
                                key="done"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4 text-neon-green" />
                                <span className="text-white font-bold font-cairo text-sm">بدأ التحميل!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </button>

            {/* Subtle Security Badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-[10px] text-white/30 font-bold uppercase tracking-widest"
            >
                <ShieldCheck className="w-3 h-3 text-neon-green/50" />
                <span className="font-cairo uppercase">رابط مباشر وآمن</span>
            </motion.div>
        </div>
    );
}
