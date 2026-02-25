'use client'

import { MouseEvent } from "react";

type SmoothLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export default function SmoothLink({ href, children, className }: SmoothLinkProps) {
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const yOffset = -100; // если есть фиксированный header
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}