"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import FieldRenderer from "@/widgets/resume/field-renderer";
import AddField from "@/widgets/resume/add-field";

export default function ObjectField({ value, path, label }: any) {
    const [open, setOpen] = useState(true);

    return (
        <Card className="mb-4 rounded-2xl shadow-sm">
            <Collapsible open={open} onOpenChange={setOpen}>
                <CardHeader>
                    <CollapsibleTrigger className="flex justify-between w-full">
                        <CardTitle className="text-lg">{label || "Section"}</CardTitle>
                        <ChevronDown
                            className={`transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </CollapsibleTrigger>
                </CardHeader>

                <CollapsibleContent>
                    <CardContent className="space-y-4">
                        {Object.entries(value).map(([key, val]) => (
                            <FieldRenderer
                                key={key}
                                value={val}
                                path={[...path, key]}
                                label={key}
                            />
                        ))}

                        <AddField path={path} />
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}