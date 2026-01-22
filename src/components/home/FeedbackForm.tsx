"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedbackFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setTimeout(() => {
                    onClose();
                    setFormData({ name: "", phone: "", email: "", message: "" });
                    setStatus("idle");
                }, 2000);
            } else {
                console.error('Failed to submit feedback');
                setStatus("idle");
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setStatus("idle");
        }
    };

    const content = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-3xl overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className="min-h-screen py-8 px-4 flex flex-col items-center justify-center animate-out fade-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="fixed top-6 left-6 text-white/50 hover:text-white transition-colors z-[110]"
                        >
                            <X size={32} />
                        </button>

                        <div className="w-full max-w-md relative z-20">
                            {/* Moving Neon Border Container */}
                            <div className="relative p-[2px] overflow-hidden rounded-2xl md:rounded-3xl">
                                {/* The Rotating Beam */}
                                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_20%,#00ffcc_50%,transparent_80%)] animate-[spin_4s_linear_infinite]" />

                                {/* Inner Content Box */}
                                <div className="relative bg-[#022c22] backdrop-blur-3xl rounded-[14px] md:rounded-[22px] p-6 md:p-8">
                                    {/* Background Glow */}
                                    <div className="absolute -top-10 right-0 w-48 h-48 bg-neon-green/10 blur-[80px] -z-10" />

                                    <div className="text-center mb-6">
                                        <h2 className="text-3xl md:text-4xl font-black text-white font-cairo mb-2">قول رأيك</h2>
                                        <p className="text-white/60 text-base font-medium font-cairo">رأيك يهمنا عشان نطور اللعبة أكتر</p>
                                    </div>

                                    {status === "success" ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center py-8 text-center"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,204,0.3)]">
                                                <Send className="text-neon-green w-10 h-10" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2 font-cairo">شكراً لرأيك!</h3>
                                            <p className="text-white/60 text-base font-cairo">تم الإرسال بنجاح وهنراجعه قريب</p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-3">
                                                <div className="relative group">
                                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-green transition-colors w-5 h-5" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="اسمك"
                                                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl py-3.5 pr-12 pl-4 text-white text-base placeholder:text-white/20 focus:border-neon-green/50 focus:bg-white/20 outline-none transition-all font-cairo font-medium"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-green transition-colors w-5 h-5" />
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="رقم الموبايل"
                                                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl py-3.5 pr-12 pl-4 text-white text-base placeholder:text-white/20 focus:border-neon-green/50 focus:bg-white/20 outline-none transition-all font-cairo font-medium text-right"
                                                        dir="rtl"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-green transition-colors w-5 h-5" />
                                                    <input
                                                        required
                                                        type="email"
                                                        placeholder="الإيميل"
                                                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl py-3.5 pr-12 pl-4 text-white text-base placeholder:text-white/20 focus:border-neon-green/50 focus:bg-white/20 outline-none transition-all font-cairo font-medium"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <MessageSquare className="absolute right-4 top-4 text-white/20 group-focus-within:text-neon-green transition-colors w-5 h-5" />
                                                    <textarea
                                                        required
                                                        rows={3}
                                                        placeholder="اكتب رأيك بالتفصيل..."
                                                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl py-3.5 pr-12 pl-4 text-white text-base placeholder:text-white/20 focus:border-neon-green/50 focus:bg-white/20 outline-none transition-all font-cairo font-medium resize-none"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="relative p-[2px] overflow-hidden rounded-xl">
                                                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_20%,#ffffff_50%,transparent_80%)] animate-[spin_3s_linear_infinite]" />
                                                <Button
                                                    disabled={status === "submitting"}
                                                    className="relative w-full h-14 md:h-16 rounded-[10px] bg-neon-green text-black font-black text-xl hover:bg-neon-green/90 transition-all border-none"
                                                    type="submit"
                                                >
                                                    {status === "submitting" ? "جاري الإرسال..." : "إرسال الرأي"}
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    if (!mounted) return null;

    return createPortal(content, document.body);
}
