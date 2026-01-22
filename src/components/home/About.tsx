"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Terminal, Zap } from "lucide-react";

const stats = [
    { label: "Years Experience", value: "5+", icon: Terminal },
    { label: "Projects Completed", value: "50+", icon: Code2 },
    { label: "Happy Clients", value: "100%", icon: Zap },
    { label: "Design Awards", value: "3", icon: Palette },
];

export function About() {
    return (
        <section id="about" className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Engineering <span className="text-primary">Perfection</span> <br />
                            Designing <span className="text-primary">Emotion</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            I don't just write code; I craft experiences. Bridging the gap between
                            engineering logic and artistic expression, I build applications that are
                            fast, scalable, and visually stunning.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            From complex Flutter mobile apps to high-performance React web platforms,
                            my focus is always on quality, performance, and user satisfaction.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors group"
                            >
                                <stat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
