"use client";

import * as React from "react";
import Link from "next/link";

export function Header() {
    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/profile" className="flex items-center space-x-2">
                        <span className="font-bold text-xl tracking-tight">CVBUILD</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}