import {
    Card,
    CardContent
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ResumeCardProps {
    title: string;
    updatedAt?: string;
    category: string;
}

export const ResumeCard = ({ title, updatedAt, category }: ResumeCardProps) => (
    <Card className="
        relative overflow-hidden
        border border-zinc-100
        bg-zinc-50/50
        rounded-[2.5rem]
        p-8
        hover:bg-white
        hover:border-black
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        group
    ">

        {/* Big background label */}
        <div className="absolute -right-4 -bottom-10 text-[6rem] font-black text-zinc-100 group-hover:text-zinc-50 transition-colors select-none pointer-events-none">
            CV
        </div>

        <CardContent className="relative z-10 p-0 space-y-6">

            <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    {category}
                </span>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-black transition-colors cursor-pointer" />
            </div>

            <div>
                <h3 className="text-2xl font-black tracking-tight">{title}</h3>
                <p className="text-sm text-zinc-500 mt-1">
                    Обновлено: {updatedAt ? new Date(updatedAt).toLocaleDateString() : "—"}
                </p>
            </div>

            <Button
                variant="outline"
                className="
                    w-full
                    rounded-2xl
                    border-zinc-200
                    bg-white
                    font-bold
                    uppercase
                    tracking-widest
                    text-xs
                    hover:border-black
                    hover:bg-[#D6FF00]
                    hover:text-black
                "
            >
                Редактировать
            </Button>

        </CardContent>
    </Card>
);

export const CreateResumePlaceholder = () => (
    <Link href="/builder/stage/welcome" className="block">
        <Card
            className="
                border border-dashed border-zinc-200
                bg-zinc-50/40
                rounded-[2.5rem]
                p-10
                flex flex-col items-center justify-center
                hover:bg-white
                hover:border-black
                hover:shadow-xl
                hover:-translate-y-1
                transition-all duration-300
                group
            "
        >
            <div className="
                h-14 w-14
                rounded-2xl
                bg-white
                flex items-center justify-center
                shadow-sm
                group-hover:bg-[#D6FF00]
                group-hover:scale-110
                transition-all
            ">
                <Plus className="w-6 h-6" />
            </div>

            <p className="mt-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
                Новое резюме
            </p>
        </Card>
    </Link>
);
