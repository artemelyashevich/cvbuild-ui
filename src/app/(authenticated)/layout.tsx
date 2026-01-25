'use client'

import {StompProvider} from "@/features/context/StompContext";
import Cookies from "js-cookie";
import {NotificationListener} from "@/features";
import {Header} from "@/widgets";

export default function AuthenticatedLayout({children}: { children: React.ReactNode }) {
    const token = Cookies.get('access_token');
    return (
        <StompProvider token={token}>
            <Header />
            <NotificationListener/>
            {children}
        </StompProvider>

    )
}