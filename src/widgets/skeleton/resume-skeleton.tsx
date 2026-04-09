export default function ResumeSkeleton() {
    return (
        <div className="min-h-screen bg-zinc-50 animate-pulse">
            <div className="max-w mx-auto px-6 py-10 space-y-10">

                {/* Header */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                        <div className="h-10 w-80 bg-zinc-200 rounded-lg" />
                        <div className="h-4 w-64 bg-zinc-200 rounded-md" />
                    </div>

                    <div className="flex gap-3">
                        <div className="h-10 w-32 bg-zinc-200 rounded-xl" />
                        <div className="h-10 w-32 bg-zinc-200 rounded-xl" />
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10">

                    {/* LEFT */}
                    <div className="space-y-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-28 bg-white border border-zinc-200 rounded-2xl shadow-sm"
                            />
                        ))}

                        <div className="h-12 bg-zinc-200 rounded-xl w-full" />
                    </div>

                    {/* RIGHT PREVIEW */}
                    <div className="h-[600px] bg-white border border-zinc-200 rounded-[2rem] shadow-2xl" />
                </div>
            </div>
        </div>
    );
}