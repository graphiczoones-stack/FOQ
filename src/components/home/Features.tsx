"use client";

import { motion } from "framer-motion";
import { Type, Layers, AlertTriangle, Cpu } from "lucide-react";

export function Features() {
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
                        إزاي تلعب؟
                    </motion.h2>
                    <p className="text-white/85 text-xl max-w-2xl mx-auto font-medium leading-relaxed font-cairo">
                        قواعد اللعبة بسيطة، بس <span className="text-neon-green font-bold">التحدي كبير!</span>
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: <Type size={32} />,
                            title: "وضع الحرف",
                            desc: (
                                <>
                                    عندك تحديين: <span className="font-sahlab text-lg mx-1 text-white">'فيها'</span> يعني جملة فيها الحرف (سهل)، و <span className="font-sahlab text-lg mx-1 text-white">'بتبداء'</span> يعني جملة تبدأ بالحرف (أصعب بكتير!).
                                </>
                            ),
                            color: "text-neon-green",
                            border: "border-neon-green/20"
                        },
                        {
                            icon: <Layers size={32} />,
                            title: "الأسئلة والقايمات",
                            desc: "أكثر من 10 فئات متنوعة. اختار اللي يعجبك، بس اعمل حسابك الأسئلة مش مباشرة ومحتاجة تركيز.",
                            color: "text-neon-purple",
                            border: "border-neon-purple/20"
                        },
                        {
                            icon: <AlertTriangle size={32} />,
                            title: "الشروط",
                            desc: "هنا اللعبة بتقلب جد. كل سؤال عليه شرط بيصعب الإجابة وبيخليك تلف حوالين نفسك.",
                            color: "text-neon-red",
                            border: "border-neon-red/20"
                        },
                        {
                            icon: <Cpu size={32} />,
                            title: "ذكاء اصطناعي",
                            desc: "مش محتاج حكم بشري. في الوضع الصوتي، الذكاء الاصطناعي بيسمع الإجابات وبيحسب النقط بالعدل.",
                            color: "text-blue-400",
                            border: "border-blue-400/20"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group flex flex-col items-center text-center p-6 rounded-[32px] glass-modern relative overflow-hidden border ${feature.border} hover:border-opacity-50 transition-colors duration-500`}
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon Container */}
                            <div className={`relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ${feature.color}`}>
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-black text-white mb-3 font-cairo">
                                {feature.title}
                            </h3>

                            <p className="text-white/75 leading-relaxed text-sm font-medium group-hover:text-white/90 transition-colors font-cairo">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
