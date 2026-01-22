"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

            <div className="container px-4 md:px-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's Create Something Extraordinary</h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Have a project in mind? Looking for a partner to bring your vision to life?
                        Let's talk about how we can work together.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 px-8 text-lg">
                            <Mail className="mr-2 w-5 h-5" />
                            hello@ziad.dev
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                            <MessageSquare className="mr-2 w-5 h-5" />
                            Start a Conversation
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
