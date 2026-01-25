import {Card, CardFooter, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ExternalLink, Plus} from "lucide-react";
import Link from "next/link";

interface ResumeCardProps {
    title: string;
    updatedAt?: string;
    category: string;
}

export const ResumeCard = ({title, updatedAt, category}: ResumeCardProps) => (
    <Card>
        <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
                <Badge variant="secondary">{category}</Badge>
                <ExternalLink className="h-4 w-4 text-muted-foreground cursor-pointer"/>
            </div>
            <CardTitle className="text-lg mt-2 font-semibold">{title}</CardTitle>
            <CardDescription>
                Последнее обновление: {updatedAt ? new Date(updatedAt).toLocaleDateString() : '—'}
            </CardDescription>
        </CardHeader>
        <CardFooter className="pt-2">
            <Button variant="outline" className="w-full" size="sm">Редактировать</Button>
        </CardFooter>
    </Card>
);

export const CreateResumePlaceholder = () => (
    <Link href={"/builder/stage/welcome"} className="font-medium">
        <Card
            className="border-dashed flex flex-col items-center justify-center p-6 hover:bg-accent cursor-pointer transition-colors group">
            <div
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Plus className="text-primary"/>
            </div>
            Новое резюме
        </Card>
    </Link>
);