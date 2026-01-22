"use client";

import { motion } from "framer-motion";
import { User, Users, Mic } from "lucide-react";

export function GameModes() {
    return (
        <section className="py-24 relative overflow-hidden" dir="rtl">
            <div className="container px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg font-cairo">
                        أنظمة اللعب
                    </h2>
                    <p className="text-[#F5E6D3] text-xl font-medium max-w-2xl mx-auto font-cairo">
                        اختار المود اللي يناسب جوك، سواء كنت بتلعب لوحدك أو مع الشلة
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Solo Mode */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group relative flex flex-col items-center text-center p-8 rounded-[40px] glass-modern overflow-hidden"
                    >
                        {/* Ambient Neon Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-red/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-neon-red/20 transition-all duration-500" />

                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#ff5c8d] to-neon-red flex items-center justify-center mb-8 shadow-lg shadow-neon-red/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/10">
                            <User size={40} className="text-white" />
                        </div>

                        <h3 className="text-3xl font-black text-white mb-4 font-cairo">وضع التحدي</h3>
                        <p className="text-white/85 font-medium text-lg leading-relaxed mb-10 font-cairo flex-grow">
                            تحدي راس براس! أنت وصاحبك في مواجهة مباشرة.<br />
                            <span className="text-neon-red font-bold">مين فيكم معلوماته أقوى؟</span>
                        </p>

                        <div className="px-8 py-3 rounded-xl border border-neon-red/30 text-white font-bold text-sm bg-neon-red/10 group-hover:bg-neon-red group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,51,102,0.1)] group-hover:shadow-[0_0_30px_rgba(255,51,102,0.4)]">
                            جرب بنفسك
                        </div>
                    </motion.div>

                    {/* Party Mode */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group relative flex flex-col items-center text-center p-8 rounded-[40px] glass-modern overflow-hidden ring-1 ring-neon-green/30 shadow-[0_0_50px_rgba(0,255,204,0.05)] transform md:-translate-y-6"
                    >
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-neon-green to-teal-500" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-green/10 blur-[60px] rounded-full pointer-events-none" />

                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-neon-green to-teal-600 flex items-center justify-center mb-8 shadow-lg shadow-neon-green/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 border border-white/10">
                            <Users size={40} className="text-white" />
                        </div>

                        <h3 className="text-3xl font-black text-white mb-4 font-cairo">وضع المجموعات</h3>
                        <p className="text-white/70 font-medium text-lg leading-relaxed mb-10 font-cairo flex-grow">
                            لمة كبيرة؟ الوضع ده معمول عشانكم.<br />
                            الأسئلة سريعة و <span className="text-neon-green font-bold">الأسرع في الإجابة هو اللي بيكسب!</span>
                        </p>

                        <div className="px-8 py-3 rounded-xl bg-neon-green text-black font-black text-sm hover:shadow-[0_0_40px_rgba(0,255,204,0.4)] hover:scale-105 transition-all duration-300">
                            العبها مع صحابك
                        </div>
                    </motion.div>

                    {/* Voice Mode */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group relative flex flex-col items-center text-center p-8 rounded-[40px] glass-modern overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-neon-purple/20 transition-all duration-500" />

                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#d946ef] to-neon-purple flex items-center justify-center mb-8 shadow-lg shadow-neon-purple/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/10">
                            <Mic size={40} className="text-white" />
                        </div>

                        <h3 className="text-3xl font-black text-white mb-4 font-cairo">الوضع الصوتي</h3>
                        <p className="text-white/70 font-medium text-lg leading-relaxed mb-10 font-cairo flex-grow">
                            الموبايل هو اللي بيسأل!<br />
                            اسمع وجاوب بسرعة، <span className="text-neon-purple font-bold">واللي يقول اسمه الأول نقطته تتحسب.</span>
                        </p>

                        <div className="px-8 py-3 rounded-xl border border-neon-purple/30 text-white font-bold text-sm bg-neon-purple/10 group-hover:bg-neon-purple group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(189,0,255,0.1)] group-hover:shadow-[0_0_30px_rgba(189,0,255,0.4)]">
                            جرب صوتك
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
