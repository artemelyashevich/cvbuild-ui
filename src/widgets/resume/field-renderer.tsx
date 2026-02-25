"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {useResumeStore} from "@/features/store/resume-store";
import {Textarea} from "@/components/ui/textarea";
import ArrayField from "@/widgets/resume/array-field";
import ObjectField from "@/widgets/resume/object-field";
import {Label} from "@/components/ui/label";

type Props = {
    value: any;
    path: string[];
    label?: string;
};
export default function FieldRenderer({ value, path, label }: Props) {
    const updateValue = useResumeStore((s) => s.updateValue);

    const renderInput = () => {
        if (Array.isArray(value)) {
            return <ArrayField value={value} path={path} label={label} />;
        }

        if (typeof value === "object" && value !== null) {
            return <ObjectField value={value} path={path} label={label} />;
        }

        if (typeof value === "boolean") {
            return (
                <div className="flex items-center justify-between mt-2">
                    <Switch
                        checked={value}
                        onCheckedChange={(val) => updateValue(path, val)}
                    />
                </div>
            );
        }

        if (typeof value === "number") {
            return (
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => updateValue(path, Number(e.target.value))}
                />
            );
        }

        if (typeof value === "string" && value.length > 100) {
            return (
                <Textarea
                    value={value}
                    onChange={(e) => updateValue(path, e.target.value)}
                />
            );
        }

        return (
            <Input
                value={value ?? ""}
                onChange={(e) => updateValue(path, e.target.value)}
            />
        );
    };

    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
        return renderInput();
    }

    return (
        <div className="space-y-2">
            {label && (
                <Label className="text-sm font-medium capitalize">
                    {label}
                </Label>
            )}
            {renderInput()}
        </div>
    );
}