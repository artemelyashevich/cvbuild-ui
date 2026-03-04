'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onChat: () => void;
    onForm: () => void;
    loading?: boolean;
    title?: string;
    description?: string;
}

export function PopupSelector({
                                  isOpen,
                                  onClose,
                                  onChat,
                                  onForm,
                                  loading = false,
                                  title = 'Куда вы хотите перейти?',
                                  description = 'Выберите действие для продолжения работы с резюме.'
                              }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full max-w-md p-8 rounded-3xl relative shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <Card className="p-6 rounded-2xl space-y-6">
                            <h2 className="text-3xl font-black text-center">{title}</h2>
                            <p className="text-zinc-500 text-sm text-center">{description}</p>

                            <div className="flex flex-col gap-4">
                                <Button
                                    onClick={onChat}
                                    className="bg-[#D6FF00] text-black font-black uppercase py-4 rounded-[2.5rem] flex items-center justify-center gap-3 hover:brightness-105 active:scale-95 transition-all"
                                    disabled={loading} // Disable button when loading
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Переходим к чату...
                                        </>
                                    ) : (
                                        <>Перейти к чату</>
                                    )}
                                </Button>

                                <Button
                                    onClick={onForm}
                                    variant="outline"
                                    className="py-4 rounded-[2.5rem] font-black uppercase tracking-wider"
                                    disabled={loading} // Disable button when loading
                                >
                                    Перейти к форме
                                </Button>

                                <Button
                                    onClick={onClose}
                                    variant="ghost"
                                    className="py-2 text-zinc-400 hover:text-zinc-600"
                                    disabled={loading} // Disable button when loading
                                >
                                    Закрыть
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}