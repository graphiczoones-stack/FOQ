"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Quote, MessageSquare } from "lucide-react";
import Image from "next/image";

interface Feedback {
    _id: string;
    name: string;
    message: string;
    status: string;
    date: string;
}

interface ReviewsOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ReviewsOverlay({ isOpen, onClose }: ReviewsOverlayProps) {
    const [mounted, setMounted] = useState(false);
    const [reviews, setReviews] = useState<Feedback[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            const fetchReviews = async () => {
                try {
                    const response = await fetch('/api/feedback');
                    if (response.ok) {
                        const data = await response.json();
                        setReviews(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch reviews:', error);
                }
            };
            fetchReviews();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const content = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="min-h-screen py-10 px-4 flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="fixed top-8 left-8 text-white/50 hover:text-white transition-colors z-[120]"
                        >
                            <X size={32} />
                        </button>

                        {/* Logo & Header */}
                        <div className="flex flex-col items-center gap-6 mb-16 mt-12 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green font-bold font-cairo text-sm"
                            >
                                <Star className="w-4 h-4 fill-neon-green" />
                                <span>آراء اللاعبين</span>
                            </motion.div>

                            <div className="space-y-2">
                                <h2 className="text-4xl md:text-6xl font-black text-white font-cairo leading-tight">
                                    الناس بتقول إيه عن<br />
                                    <span className="text-white font-voltex block mt-4 text-5xl md:text-7xl drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]">
                                        فوق؟
                                    </span>
                                </h2>
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="w-full max-w-2xl space-y-6 pb-20">
                            {reviews.length === 0 ? (
                                <div className="text-center py-20 text-white/20">
                                    <MessageSquare className="w-20 h-20 mx-auto mb-4 opacity-10" />
                                    <p className="text-xl font-cairo">لسه مفيش آراء منشورة..</p>
                                </div>
                            ) : (
                                reviews.map((review, index) => (
                                    <motion.div
                                        key={review._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                        className="relative p-8 rounded-[32px] bg-white/5 border border-white/10 group hover:border-neon-green/30 transition-all duration-500"
                                    >
                                        <Quote className="absolute -top-2 -right-2 w-16 h-16 text-white/5 group-hover:text-neon-green/5" />

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green font-black">
                                                {review.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold font-cairo">{review.name}</h3>
                                                <p className="text-white/20 text-[10px] font-cairo">
                                                    {new Date(review.date).toLocaleDateString('ar-EG')}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-white/80 leading-relaxed font-cairo text-right">
                                            {review.message}
                                        </p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    if (!mounted) return null;

    return createPortal(content, document.body);
}
