'use client'

import {StompProvider} from "@/features/context/StompContext";
import Cookies from "js-cookie";
import {NotificationListener, useAuth} from "@/features";
import {LayoutHeader} from "@/widgets";

export default function AuthenticatedLayout({children}: { children: React.ReactNode }) {
    const token = Cookies.get('access_token');
    const {user} = useAuth();
    return (
        <StompProvider token={token}>
            <LayoutHeader user={user}/>
            <NotificationListener/>
            <div className={"flex justify-center w-full mt-20"}>
                {children}
            </div>
        </StompProvider>

    )
}