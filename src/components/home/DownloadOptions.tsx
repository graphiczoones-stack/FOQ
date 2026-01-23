"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle, ShieldCheck } from "lucide-react";

export function DownloadOptions() {
    const [status, setStatus] = useState<"idle" | "downloading" | "completed">("idle");
    const [progress, setProgress] = useState(0);
    const [isDownloadEnabled, setIsDownloadEnabled] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/admin/settings');
                if (response.ok) {
                    const data = await response.json();
                    setIsDownloadEnabled(data.isDownloadEnabled);
                }
            } catch (error) {
                console.error('Failed to fetch download settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const handleDownload = () => {
        if (status !== "idle" || !isDownloadEnabled) return;

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
                disabled={!isDownloadEnabled}
                className={`relative h-12 px-8 rounded-full border overflow-hidden transition-all active:scale-95 group min-w-[220px] backdrop-blur-md ${isDownloadEnabled
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white/5 border-white/5 opacity-50 cursor-not-allowed"
                    }`}
            >
                {/* Progress Bar Layer */}
                <AnimatePresence>
                    {status === "downloading" && isDownloadEnabled && (
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
                        {!isDownloadEnabled ? (
                            <motion.div
                                key="disabled"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <span className="text-white/40 font-bold font-cairo text-sm">التحميل متوقف حالياً</span>
                            </motion.div>
                        ) : status === "idle" ? (
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
                        ) : status === "downloading" ? (
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
                        ) : (
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
