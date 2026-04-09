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
            const type = String(notification.type).toLowerCase();
            switch(type) {
                case "success": toast.success(notification.message); break;
                case "warning": toast.warning(notification.message); break;
                case "error": toast.error(notification.message); break;
                case "info": toast.info(notification.message); break;
                default: toast.error(notification.message);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [isConnected, stompClient]);

    return null;
};