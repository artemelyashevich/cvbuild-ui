export const UsageStatItem = ({
                                  label,
                                  value
                              }: {
    label: string;
    value: number | string;
}) => (
    <div className="
        border border-zinc-100
        bg-zinc-50/50
        rounded-[2rem]
        p-6
        text-center
        hover:bg-white
        hover:shadow-lg
        transition-all
        group
    ">
        <p className="text-xs uppercase tracking-widest font-bold text-zinc-500">
            {label}
        </p>

        <p className="text-4xl font-black tracking-tight mt-2 group-hover:text-black">
            {value}
        </p>
    </div>
);
