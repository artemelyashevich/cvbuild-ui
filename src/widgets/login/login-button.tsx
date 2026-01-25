'use client'

export function LoginButton() {
    const handleLogin = () => {
        window.location.href = "http://localhost:8888/login";
    };

    return <button onClick={handleLogin}>Login with GitHub</button>
}