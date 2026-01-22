"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

// Placeholder data - In a real app, this would come from a CMS or props
const projects = [
    {
        id: 1,
        title: "FOQ Game",
        category: "Mobile App • Flutter",
        image: "/logo.svg", // Using logo as placeholder for now since we don't have screenshots
        description: "A premium interactive game with real-time multiplayer implementation, Clean Architecture, and high-end animations.",
        color: "from-red-500/20 to-orange-500/20",
    },
    {
        id: 2,
        title: "E-Commerce Dashboard",
        category: "Web App • React",
        image: "/logo.svg",
        description: "Comprehensive admin dashboard for managing products, orders, and analytics with dark mode and data visualization.",
        color: "from-blue-500/20 to-cyan-500/20",
    },
    {
        id: 3,
        title: "Eco-Tech Wallet",
        category: "UI/UX Design",
        image: "/logo.svg",
        description: "Concept design for a sustainable crypto wallet, featuring glassmorphism and eco-friendly color palettes.",
        color: "from-green-500/20 to-emerald-500/20",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-black/50">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 block">Portfolio</span>
                    <h2 className="text-3xl md:text-5xl font-bold">Selected Works</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative rounded-3xl overflow-hidden glass border border-white/10"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative p-8 h-full flex flex-col">
                                <div className="mb-6 relative w-16 h-16 rounded-2xl bg-white/5 p-3 overflow-hidden border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                    <Image src={project.image} alt={project.title} fill className="object-contain" />
                                </div>

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-sm text-primary/80 font-medium mb-4">{project.category}</p>
                                <p className="text-muted-foreground mb-8 flex-grow">{project.description}</p>

                                <Button variant="ghost" className="self-start group/btn px-0 hover:bg-transparent hover:text-primary">
                                    View Case Study <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
