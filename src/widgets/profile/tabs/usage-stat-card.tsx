export const UsageStatItem = ({ label, value }: { label: string; value: number | string }) => (
    <div className="p-4 border rounded-lg text-center">
        <p className="text-xs text-muted-foreground uppercase mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);