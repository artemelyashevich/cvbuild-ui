'use client'

import {useAuth, useStats} from "@/features";
import {LeftAside, ProfileTabs} from "@/widgets";
import useSettings from "@/features/hooks/use-settings";
import ProfilePageSkeleton from "@/widgets/skeleton/profile-skeleton";

export default function ProfilePage() {
    const {user, loading: authLoading} = useAuth();
    const {data: settings, loading: settingsLoading} = useSettings();

    const {stats, loading: statsLoading} = useStats(user?.id)

    if (authLoading || statsLoading || settingsLoading) return <ProfilePageSkeleton />;

    if (!user) return <div className="p-10 text-center">Войдите в систему</div>;

    return (
        <div className="container w-full py-10 px-4 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LEFT COLUMN */}
                <LeftAside stats={stats} />

                {/* RIGHT COLUMN */}
                <ProfileTabs stats={stats} user={user} settings={settings} />
            </div>
        </div>
    );
}