'use client';

import { useState } from 'react';
import LinkedinStep from "@/widgets/steps/linkedin-step";
import WorkExperienceStep from "@/widgets/steps/work-experience-step";
import SkillsStep from "@/widgets/steps/skills-step";
import HighlightsStep from "@/widgets/steps/highlights-step";
import JobNameStep from "@/widgets/steps/job-step";
import EducationStep from "@/widgets/steps/education-step";
import CareerGoalsStep from "@/widgets/steps/career-step";

export default function ResumeFlowPage() {
    const [step, setStep] = useState(0);

    const total = 7;

    const next = () => setStep((s) => s + 1);
    const back = () => setStep((s) => s - 1);

    switch (step) {
        case 0:
            return <LinkedinStep step={1} total={total} next={next} />;
        case 1:
            return <WorkExperienceStep step={2} total={total} next={next} back={back} />;
        case 2:
            return <JobNameStep step={3} total={total} next={next} back={back} />;
        case 3:
            return <EducationStep step={4} total={total} next={next} back={back} />;
        case 4:
            return <SkillsStep step={5} total={total} next={next} back={back} />;
        case 5:
            return <HighlightsStep step={6} total={total} next={next} back={back} />;
        case 6:
            return <CareerGoalsStep step={7} total={total} back={back} />;
        default:
            return <div>Done</div>;
    }
}