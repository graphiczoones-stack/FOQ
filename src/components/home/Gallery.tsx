"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Gallery() {
    const screenshots = [
        { src: "/image.png", alt: "Fouq Game Screen 1" },
        { src: "/game-screenshot.png", alt: "Fouq Game Screen 2" },
    ];

    return (
        <section className="py-24 relative overflow-hidden" dir="rtl">
            <div className="container relative z-10 px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-2xl font-cairo"
                    >
                        صور من اللعبة
                    </motion.h2>
                    <p className="text-white/85 text-xl max-w-2xl mx-auto font-medium leading-relaxed font-cairo">
                        شوف شكل اللعبة من جوا والأوضاع المختلفة
                    </p>
                </div>

                {/* Screenshot Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {screenshots.map((shot, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative rounded-[40px] overflow-hidden border-8 border-[#1a1a1a] bg-black shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-[1.02] transition-transform duration-500 group"
                        >
                            <Image
                                src={shot.src}
                                alt={shot.alt}
                                width={800}
                                height={1600}
                                className="w-full h-auto"
                                priority={index === 0}
                            />

                            {/* Signature Green Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center text-white/75 mt-12 text-lg font-medium font-cairo"
                >
                    واجهة اللعبة مصممة عشان تكون سهلة وممتعة في نفس الوقت
                </motion.p>
            </div>
        </section>
    );
}
