import {axiosWithToken} from "@/features";

export class ResumeFlowService {
    private static readonly API_URL = '/resume-flow';

    public static async roadmap(): Promise<any> {
        return axiosWithToken.get(`${this.API_URL}/roadmap`);
    }

    public static sendResume(body: {
        personalInformation: { firstName: string; lastName: string; email: string; phone: string };
        links: { linkedin: string; github: string; portfolio: string };
        job: { company: string; position: string; jobPeriod: string }[];
        education: { university: string; degree: string; educationPeriod: string }[];
        skills: string[];
        highlights: string;
        careerGoals: string
    }) {
        return axiosWithToken.post(`${this.API_URL}`, body);
    }
}