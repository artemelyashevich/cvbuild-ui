"use client";
import { useEffect } from 'react';
import {useStomp} from "@/features/context/StompContext";
import {toast} from "sonner";

export const NotificationListener = () => {
    const { stompClient, isConnected } = useStomp();

    useEffect(() => {
        if (!isConnected || !stompClient) return;

        const subscription = stompClient.subscribe('/user/queue/notifications', (message) => {
            const notification = JSON.parse(message.body);
            console.log("Received notification:", notification);
            toast.warning(notification.message);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [isConnected, stompClient]);

    return null;
};