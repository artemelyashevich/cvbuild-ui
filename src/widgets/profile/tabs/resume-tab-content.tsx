import { CreateResumePlaceholder, ResumeCard } from "./resume-card";

export const ResumeTabContent = ({ updatedAt }: { updatedAt?: string }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CreateResumePlaceholder />
        <ResumeCard
            title="Основное резюме"
            category="Frontend Developer"
            updatedAt={updatedAt}
        />
    </div>
);

