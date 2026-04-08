'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function LeftAsideSkeleton() {
    return (
        <div className="space-y-6">
            {/* AI Usage Card */}
            <Card className="relative overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-zinc-50/50 shadow-sm">
                <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-2xl" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                        <Skeleton className="h-4 w-10" />
                    </div>

                    <Skeleton className="h-12 w-24" />

                    <Skeleton className="h-2 w-full rounded-full" />
                </CardContent>
            </Card>

            {/* Stats Cards */}
            {[1, 2, 3].map((i) => (
                <Card
                    key={i}
                    className="relative overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-zinc-50/50 shadow-sm"
                >
                    <CardContent className="p-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-2xl" />

                            <div className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-7 w-16" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function TabsSkeleton() {
    return (
        <div className="space-y-8">
            {/* Tabs List */}
            <div className="grid grid-cols-4 bg-zinc-100 rounded-[2rem] p-1 gap-1">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton
                        key={i}
                        className="h-10 w-full rounded-[1.5rem]"
                    />
                ))}
            </div>

            {/* Active Tab Content (resumes-like layout) */}
            <Card className="rounded-[2rem] border border-zinc-100 bg-white shadow-sm">
                <CardContent className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-8 w-24 rounded-xl" />
                    </div>

                    {/* List items */}
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="p-4 rounded-2xl border border-zinc-100 flex items-center justify-between"
                            >
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-3 w-32" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-8 w-8 rounded-xl" />
                                    <Skeleton className="h-8 w-8 rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function ProfilePageSkeleton() {
    return (
        <div className="container w-full py-10 px-4 space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <LeftAsideSkeleton />

                <div className="md:col-span-2">
                    <TabsSkeleton />
                </div>
            </div>
        </div>
    );
}
