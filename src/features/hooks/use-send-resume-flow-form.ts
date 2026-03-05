import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResumeStore } from "@/features/store/resume-store";
import {toast} from "sonner";
import {ResumeFlowService} from "@/service/ResumeFlowService";

export const useSendResumeFlowForm = () => {
    const queryClient = useQueryClient();
    const resume = useResumeStore.getState();

    const body = {
        personalInformation: {
            firstName: resume.firstName,
            lastName: resume.lastName,
            email: resume.email,
            phone: resume.phone,
        },
        links: {
            linkedin: resume.linkedin,
            github: resume.github,
            portfolio: resume.portfolio,
        },
        job: resume.workExperiences.map((w) => ({
            company: w.companyName,
            position: w.jobTitle,
            jobPeriod: `${w.startDate || ""}-${w.endDate || ""}`,
        })),
        education: resume.education.map((e) => ({
            university: e.schoolName,
            degree: e.degree,
            educationPeriod: `${e.startDate || ""}-${e.endDate || ""}`,
        })),
        skills: resume.skills,
        highlights: resume.highlights,
        careerGoals: resume.careerGoals,
    };

    return useMutation({
        mutationFn: () => ResumeFlowService.sendResume(body),

        onMutate: () => {
            toast.loading("Отправка резюме...", { id: "send-resume" });
        },

        onSuccess: (data) => {
            toast.success("Резюме успешно отправлено!", { id: "send-resume" });
            queryClient.invalidateQueries({ queryKey: ["resume-list"] });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Ошибка при отправке резюме", { id: "send-resume" });
        },
    });
};

export default useSendResumeFlowForm;