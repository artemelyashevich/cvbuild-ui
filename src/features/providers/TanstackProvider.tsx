'use client'

import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export function TanstackProvider({children}: { children: React.ReactNode }) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: true
                }
            }
        })
    )
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}