"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface StompContextType {
    stompClient: Client | null;
    isConnected: boolean;
}

const StompContext = createContext<StompContextType>({ stompClient: null, isConnected: false });

export const StompProvider = ({ children, token }: { children: React.ReactNode, token?: string }) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8888/ws'),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = (frame) => {
            console.log('Connected to STOMP');
            setIsConnected(true);
        };

        client.onDisconnect = () => {
            console.log('Disconnected');
            setIsConnected(false);
        };

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [token]);

    return (
        <StompContext.Provider value={{ stompClient, isConnected }}>
            {children}
        </StompContext.Provider>
    );
};

export const useStomp = () => useContext(StompContext);