'use client'

import ResumeBuilder from "@/app/(authenticated)/builder/stage/form/Constructor";
import {useState} from "react";

export default function ConstructorPage() {
    const [data] = useState<any>(
        {
            "id": "69764d3206da1a9499d1c3f3",
            "blocks": {
                "personalInfo": {
                    "name": "Artem",
                    "surname": "",
                    "email": "",
                    "phone": "",
                    "address": ""
                },
                "education": {
                    "university": "БГУ (Белорусский государственный университет)",
                    "faculty": "Механико-математический факультет",
                    "degree": "Бакалавр",
                    "graduationYear": 2027
                },
                "workExperience": {
                    "company1": {
                        "name": "",
                        "position": "",
                        "startDate": "",
                        "endDate": ""
                    },
                    "company2": {
                        "name": "BYNEX",
                        "position": "",
                        "startDate": "Апрель 2025",
                        "endDate": ""
                    }
                },
                "skills": {
                    "programmingLanguages": [
                        "Java",
                        "Python"
                    ],
                    "otherSkills": []
                },
                "projects": {
                    "project1": {
                        "name": "",
                        "description": "",
                        "technologiesUsed": []
                    },
                    "project2": {
                        "name": "AirbnbClone",
                        "description": "",
                        "technologiesUsed": [
                            "NextJS",
                            "TypeScript"
                        ]
                    }
                },
                "achievements": {
                    "awards": [],
                    "publications": []
                },
                "references": {
                    "ref1": {
                        "name": "",
                        "position": ""
                    },
                    "ref2": {
                        "name": "",
                        "position": ""
                    }
                }
            },
            "chatId": "bf1457d9-9f20-428c-90ea-bc3ff6893d29",
            "resumeSettings": null,
            "createdAt": "2026-01-25T20:04:50",
            "updatedAt": "2026-01-25T20:04:50"
        }
    );
    return <ResumeBuilder initialData={data}/>
}