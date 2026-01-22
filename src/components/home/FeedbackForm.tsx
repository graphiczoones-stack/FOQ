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
        message: "",
        screenshot: ""
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
                    setFormData({ name: "", phone: "", email: "", message: "", screenshot: "" });
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

                                                {/* Screenshot Upload */}
                                                <div className="space-y-3">
                                                    <p className="text-white/40 text-sm font-cairo pr-1">عندك سكرين شوت للمشكلة؟ (اختياري)</p>
                                                    <div className="flex items-center gap-4">
                                                        <label className="flex-1 flex items-center justify-center gap-2 bg-white/5 border-2 border-dashed border-white/10 rounded-xl py-4 cursor-pointer hover:bg-white/10 hover:border-neon-green/30 transition-all group/upload">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        if (file.size > 5 * 1024 * 1024) {
                                                                            alert("الصورة كبيرة جداً، ياريت تخليها أقل من 5 ميجا");
                                                                            return;
                                                                        }
                                                                        const reader = new FileReader();
                                                                        reader.onloadend = () => {
                                                                            setFormData({ ...formData, screenshot: reader.result as string });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                }}
                                                            />
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/upload:bg-neon-green/20 transition-colors">
                                                                    <svg className="w-4 h-4 text-white/40 group-hover/upload:text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-white/60 font-cairo font-medium text-sm group-hover/upload:text-white transition-colors">
                                                                    {formData.screenshot ? "تغيير الصورة" : "اختار صورة"}
                                                                </span>
                                                            </div>
                                                        </label>

                                                        {formData.screenshot && (
                                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-neon-green/30 group/preview animate-in zoom-in-90 fill-mode-both">
                                                                <img src={formData.screenshot} alt="Preview" className="w-full h-full object-cover" />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setFormData({ ...formData, screenshot: '' })}
                                                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center transition-opacity"
                                                                >
                                                                    <X className="text-white w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
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
