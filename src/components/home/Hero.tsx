"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { FeedbackForm } from "./FeedbackForm";

export function Hero() {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    return (
        <section className="py-24 relative overflow-hidden" dir="rtl">
            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1 flex-1 text-center lg:text-right space-y-8 max-w-2xl">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-neon-green/20 bg-neon-green/5 mx-auto lg:mx-0"
                        >
                            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_#00ffcc]" />
                            <span className="text-neon-green font-bold text-sm tracking-wide font-cairo">
                                الإصدار الأول
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black leading-tight text-white font-cairo"
                        >
                            بسرعة...<br />
                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] font-voltex block mt-4 md:mt-0">
                                فوق
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/90 font-medium leading-relaxed font-cairo max-w-xl ml-auto"
                        >
                            اتحدى صحابك وعيلتك في مين يلاقي الإجابة الأسرع
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
                        >
                            <DownloadButton text="حمل اللعبة" />

                            <div className="relative p-[2px] overflow-hidden rounded-xl">
                                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_20%,#00ffcc_50%,transparent_80%)] animate-[spin_4s_linear_infinite]" />
                                <Button
                                    onClick={() => setIsFeedbackOpen(true)}
                                    size="lg"
                                    className="relative w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-[10px] bg-black/90 text-white hover:bg-black/80 transition-all border-none"
                                >
                                    <MessageSquare className="w-5 h-5 ml-2" />
                                    قول رأيك
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <FeedbackForm
                        isOpen={isFeedbackOpen}
                        onClose={() => setIsFeedbackOpen(false)}
                    />

                    {/* Phone Mockup - Dynamic & Closer */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        animate={{ opacity: 1, x: 0, rotate: -3 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="order-1 lg:order-2 relative z-20 animate-float"
                    >
                        <div className="relative w-[280px] md:w-[320px] h-auto rounded-[36px] border-[6px] border-[#1a1a1a] bg-black shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_70px_rgba(0,255,204,0.2)] transition-all duration-500 hover:scale-105">
                            <Image
                                src="/image.png"
                                alt="Fouq Game Interface"
                                width={320}
                                height={700}
                                className="w-full h-auto rounded-[30px] object-cover"
                                priority
                            />
                        </div>

                        {/* Signature Green Glow Behind Phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[90%] bg-neon-green/15 rounded-full blur-[60px] -z-10 animate-pulse" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
