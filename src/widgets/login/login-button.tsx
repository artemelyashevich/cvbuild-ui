'use client'

import { Github } from 'lucide-react'

export function LoginButton() {
    const handleLogin = () => {
        window.location.href = "http://localhost:8888/login";
    };

    return (
        <button
            onClick={handleLogin}
            className="
        flex
        items-center
        justify-center
        gap-2
        text-black
        font-black
        uppercase
        tracking-widest
        rounded-[2rem]
        px-6
        hover:cursor-pointer
        hover:underline
        transition-all
      "
        >
            <Github className="w-5 h-5" />
            Login with GitHub
        </button>
    )
}
