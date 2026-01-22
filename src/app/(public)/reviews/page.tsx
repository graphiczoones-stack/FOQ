"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, Quote } from "lucide-react";

interface Feedback {
    _id: string;
    name: string;
    message: string;
    status: string;
    date: string;
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Feedback[]>([]);

    useEffect(() => {
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
    }, []);

    return (
        <main className="min-h-screen pt-32 pb-24" dir="rtl">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/20 mb-6"
                    >
                        <Star className="w-4 h-4 text-neon-green fill-neon-green" />
                        <span className="text-neon-green font-bold text-sm font-cairo">آراء اللاعبين</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white font-cairo leading-tight"
                    >
                        الناس بتقول إيه عن<br />
                        <span className="font-voltex text-neon-green block mt-4 text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(0,255,204,0.3)]">
                            فوق؟
                        </span>
                    </motion.h1>
                </div>

                {reviews.length === 0 ? (
                    <div className="text-center py-20">
                        <MessageSquare className="w-20 h-20 text-white/10 mx-auto mb-6" />
                        <p className="text-white/40 text-xl font-cairo">لسه مفيش آراء منشورة.. كن أول واحد يقول رأيه!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-8 rounded-[32px] bg-white/5 border border-white/10 overflow-hidden group hover:border-neon-green/30 transition-all duration-500"
                            >
                                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-neon-green/5 transition-colors" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green font-black text-xl">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold font-cairo text-lg">{review.name}</h3>
                                        <p className="text-white/30 text-xs font-cairo">
                                            {new Date(review.date).toLocaleDateString('ar-EG')}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-white/80 leading-relaxed font-cairo text-right">
                                    {review.message}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
