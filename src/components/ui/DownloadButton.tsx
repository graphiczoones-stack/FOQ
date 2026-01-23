"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
    className?: string;
    text?: string;
    href?: string;
}

export function DownloadButton({
    className,
    text = "حمل اللعبة",
    href = "https://drive.google.com/uc?export=download&id=1iFJnONpL47KwrM3tnbIWm00InbdZSeD1"
}: DownloadButtonProps) {
    const [status, setStatus] = useState<"idle" | "downloading" | "completed">("idle");
    const [progress, setProgress] = useState(0);

    const handleDownload = () => {
        // Downloads are currently suspended for application updates
        return;
    };

    return (
        <div className={cn("relative", className)}>
            <Button
                onClick={handleDownload}
                size="lg"
                disabled={true}
                className={cn(
                    "w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-xl transition-all duration-300 relative overflow-hidden bg-gray-600 text-white/50 cursor-not-allowed"
                )}
            >
                <div className="flex items-center">
                    <X className="w-5 h-5 ml-2" />
                    متوقف حالياً
                </div>
            </Button>

            {status === "downloading" && (
                <motion.div
                    key="downloading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center z-10"
                >
                    <Loader2 className="w-5 h-5 ml-2 animate-spin text-neon-green" />
                    <span>جاري التحميل... {progress}%</span>
                </motion.div>
            )}

            {status === "completed" && (
                <motion.div
                    key="completed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                >
                    <Check className="w-5 h-5 ml-2 text-green-600" />
                    تم التحميل بنجاح
                </motion.div>
            )}
        </AnimatePresence>

                {/* Progress Bar Background */ }
    {
        status === "downloading" && (
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute bottom-0 left-0 h-full bg-neon-green/20 pointer-events-none transition-all duration-300"
            />
        )
    }
            </Button >

        {/* Success Particle Effect */ }
        <AnimatePresence>
    {
        status === "completed" && (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.4 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="absolute inset-0 bg-white rounded-xl -z-10"
            />
        )
    }
            </AnimatePresence >
        </div >
    );
}
