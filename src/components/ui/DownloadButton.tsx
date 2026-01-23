"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
    className?: string;
    text?: string;
    href?: string;
}

export function DownloadButton({
    className
}: DownloadButtonProps) {
    return (
        <div className={cn("relative", className)}>
            <Button
                size="lg"
                disabled={true}
                className={cn(
                    "w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-xl transition-all duration-300 relative overflow-hidden bg-gray-600 text-white/50 cursor-not-allowed"
                )}
            >
                <div className="flex items-center">
                    <X className="w-5 h-5 ml-2" />
                    متوقف حالياً
                </div>
            </Button>
        </div>
    );
}
