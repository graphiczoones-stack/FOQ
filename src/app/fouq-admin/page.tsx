"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Check, Trash2, ShieldCheck, Mail, Phone, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

interface Feedback {
    _id: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    status: "pending" | "published";
    date: string;
    screenshot?: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState<Feedback[]>([]);

    // Simple password - In a real app this should be an env variable
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "fouq_game_2024";
    const ALLOWED_EMAIL = "ziad46333@gmail.com";

    useEffect(() => {
        // Check if already logged in for this session
        if (localStorage.getItem("fouq_admin_auth") === "true") {
            setIsAuthenticated(true);
            loadFeedback();
        }
    }, []);

    const loadFeedback = async () => {
        try {
            const response = await fetch('/api/admin/feedback');
            if (response.ok) {
                const data = await response.json();
                setFeedback(data);
            }
        } catch (error) {
            console.error('Failed to load feedback:', error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/admin/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setIsAuthenticated(true);
                localStorage.setItem("fouq_admin_auth", "true");
                loadFeedback();
                Swal.fire({
                    title: "أهلاً بيك!",
                    text: "نورت لوحة التحكم يا ريس",
                    icon: "success",
                    background: "#0a0a0a",
                    color: "#fff",
                    confirmButtonColor: "#00ffcc",
                    timer: 2000
                });
            } else {
                const data = await response.json();
                let errorMessage = "حصلت مشكلة غير متوقعة";

                if (response.status === 401) {
                    errorMessage = data.error === 'Unauthorized email'
                        ? "الإيميل ده ملهوش صلاحية دخول ياباشا!"
                        : "الباسورد غلط ياباشا!";
                } else if (response.status === 500) {
                    errorMessage = "في مشكلة في السيرفر (Server Error)";
                }

                Swal.fire({
                    title: "خطأ!",
                    text: errorMessage,
                    icon: "error",
                    background: "#0a0a0a",
                    color: "#fff",
                    confirmButtonColor: "#ff3366"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "خطأ!",
                text: "حصل مشكلة في الاتصال بالسيرفر",
                icon: "error",
                background: "#0a0a0a",
                color: "#fff"
            });
        }
    };

    const toggleStatus = async (id: string) => {
        try {
            const response = await fetch('/api/admin/feedback', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                loadFeedback();
                const updatedItem = feedback.find(f => f._id === id);
                const isPublished = updatedItem?.status === "published";

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    background: "#1a1a1a",
                    color: "#fff"
                });

                Toast.fire({
                    icon: 'success',
                    title: isPublished ? 'تم إلغاء النشر' : 'تم نشر الرأي بنجاح'
                });
            }
        } catch (error) {
            console.error('Failed to toggle status:', error);
        }
    };

    const deleteFeedback = async (id: string) => {
        const result = await Swal.fire({
            title: 'متأكد؟',
            text: "الرأي ده هيتمسح نهائياً!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff3366',
            cancelButtonColor: '#333',
            confirmButtonText: 'إيوة، امسح!',
            cancelButtonText: 'لأ، استنى',
            background: "#0a0a0a",
            color: "#fff",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/admin/feedback?id=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    loadFeedback();
                    Swal.fire({
                        title: 'تم المسح!',
                        text: 'الرأي اتمسح بنجاح.',
                        icon: 'success',
                        background: "#0a0a0a",
                        color: "#fff",
                        confirmButtonColor: "#00ffcc",
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Failed to delete feedback:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("fouq_admin_auth");
        setIsAuthenticated(false);
        Swal.fire({
            title: "باي باي!",
            text: "تم تسجيل الخروج بنجاح",
            icon: "info",
            background: "#0a0a0a",
            color: "#fff",
            confirmButtonColor: "#00ffcc",
            timer: 1500
        });
    };

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4 bg-black overflow-hidden" dir="rtl">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md p-6 md:p-10 rounded-[40px] glass-modern border border-white/10 text-center"
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-neon-green/10 flex items-center justify-center mx-auto mb-6 md:mb-8 border border-neon-green/20">
                        <Lock className="text-neon-green w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white font-cairo mb-2">منطقة المدير</h1>
                    <p className="text-white/40 font-cairo mb-6 md:mb-8 text-sm">دخل الباسورد عشان تدخل تشوف الآراء</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-3 text-right">
                            <input
                                type="email"
                                placeholder="الإيميل"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:border-neon-green/50 outline-none transition-all font-cairo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="الباسورد"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:border-neon-green/50 outline-none transition-all text-center text-xl tracking-widest font-voltex"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button className="w-full h-14 rounded-2xl bg-neon-green text-black font-black text-lg hover:bg-neon-green/90 shadow-[0_10px_30px_rgba(0,255,204,0.1)] transition-transform active:scale-95">
                            دخول
                        </Button>
                    </form>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-20 md:py-32 px-4 md:px-8 bg-black" dir="rtl">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4 text-center md:text-right">
                        <div className="w-12 h-12 rounded-2xl bg-neon-green flex items-center justify-center shadow-[0_0_20px_rgba(0,255,204,0.3)] shrink-0">
                            <ShieldCheck className="text-black w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white font-cairo">لوحة التحكم</h1>
                            <p className="text-neon-green/60 text-sm font-bold font-cairo">أهلاً بيك ياريس.. عندك {feedback.length} آراء</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="text-white/60 hover:text-neon-red hover:bg-white/5 font-bold font-cairo gap-2 px-6 rounded-2xl w-full md:w-auto"
                    >
                        <LogOut className="w-5 h-5" />
                        تسجيل خروج
                    </Button>
                </div>

                {/* Feedback List */}
                <div className="grid gap-6">
                    <AnimatePresence mode="popLayout">
                        {feedback.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-32 glass-modern rounded-[40px] border-white/5"
                            >
                                <MessageSquare className="w-16 h-16 text-white/5 mx-auto mb-4" />
                                <p className="text-white/20 font-cairo text-xl">لسه مفيش حد بعت حاجة..</p>
                            </motion.div>
                        ) : (
                            feedback.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`p-6 md:p-8 rounded-[32px] md:rounded-[40px] glass-modern border border-white/10 relative overflow-hidden transition-all ${item.status === "published" ? "border-neon-green/20" : ""
                                        }`}
                                >
                                    {item.status === "published" && (
                                        <div className="absolute top-0 right-0 h-1 w-full md:h-full md:w-2 bg-neon-green shadow-[0_0_15px_rgba(0,255,204,0.5)]" />
                                    )}

                                    <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
                                        <div className="flex-1 space-y-4 md:space-y-6">
                                            {/* User Info Grid */}
                                            <div className="grid sm:grid-cols-3 gap-3">
                                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                                                    <User className="text-neon-green w-4 h-4 shrink-0" />
                                                    <span className="text-white font-bold font-cairo text-sm truncate">{item.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                                                    <Phone className="text-neon-green w-4 h-4 shrink-0" />
                                                    <span className="text-white font-bold font-cairo text-sm text-center w-full" dir="ltr">{item.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                                                    <Mail className="text-neon-green w-4 h-4 shrink-0" />
                                                    <span className="text-white font-bold font-cairo text-xs truncate break-all">{item.email}</span>
                                                </div>
                                            </div>

                                            <div className="p-5 md:p-6 bg-white/5 rounded-3xl border border-white/5">
                                                <p className="text-white/80 font-cairo leading-relaxed text-sm md:text-base">{item.message}</p>
                                            </div>

                                            {item.screenshot && (
                                                <div className="mt-4">
                                                    <p className="text-white/40 text-xs font-cairo mb-2">سكرين شوت مرفقة:</p>
                                                    <div
                                                        className="relative w-full max-w-sm rounded-[32px] overflow-hidden border border-white/10 group cursor-pointer"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                imageUrl: item.screenshot,
                                                                imageAlt: 'Screenshot',
                                                                background: '#0a0a0a',
                                                                showConfirmButton: false,
                                                                showCloseButton: true,
                                                                width: 'auto',
                                                                padding: '0'
                                                            });
                                                        }}
                                                    >
                                                        <img src={item.screenshot} alt="Screenshot" className="w-full h-auto object-cover max-h-[200px]" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                                                <span className="text-white text-xs font-bold font-cairo">تكبير الصورة</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <p className="text-white/20 text-[10px] md:text-xs font-cairo">تاريخ الإرسال: {new Date(item.date).toLocaleString('ar-EG')}</p>
                                        </div>

                                        <div className="flex flex-row lg:flex-col gap-3 justify-end items-center sm:grid sm:grid-cols-2 lg:flex">
                                            <Button
                                                onClick={() => toggleStatus(item._id)}
                                                className={`flex-1 lg:w-40 h-14 rounded-2xl font-black font-cairo transition-all gap-2 text-sm md:text-base ${item.status === "published"
                                                    ? "bg-white text-black hover:bg-white/90"
                                                    : "bg-neon-green text-black hover:bg-neon-green/90 shadow-[0_0_20px_rgba(0,255,204,0.2)]"
                                                    }`}
                                            >
                                                <Check className="w-5 h-5 shrink-0" />
                                                <span className="truncate">{item.status === "published" ? "إلغاء النشر" : "نشر الرأي"}</span>
                                            </Button>
                                            <Button
                                                onClick={() => deleteFeedback(item._id)}
                                                variant="ghost"
                                                className="w-14 lg:w-40 h-14 rounded-2xl text-white/40 hover:text-neon-red hover:bg-neon-red/10 group overflow-hidden transition-all border border-white/5 lg:border-none"
                                            >
                                                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
                                                <span className="hidden lg:inline mr-2 font-bold font-cairo">مسح</span>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
