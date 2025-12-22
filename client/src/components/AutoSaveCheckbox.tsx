import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

interface AutoSaveCheckboxProps {
    moduleId: string;
    exerciseId: string;
    label: string;
}

export default function AutoSaveCheckbox({
    moduleId,
    exerciseId,
    label,
}: AutoSaveCheckboxProps) {
    const [checked, setChecked] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Carregar resposta salva
    const { data: exerciseData, isLoading } = trpc.exercises.get.useQuery({
        moduleId,
        exerciseId,
    });

    // Mutation para salvar
    const saveMutation = trpc.exercises.save.useMutation({
        onSuccess: () => {
            setIsSaving(false);
        },
        onMutate: () => {
            setIsSaving(true);
        },
    });

    // Carregar dados ao montar
    useEffect(() => {
        if (exerciseData?.response) {
            setChecked(exerciseData.response === "true");
        }
    }, [exerciseData]);

    const handleCheckedChange = (checked: boolean) => {
        setChecked(checked);
        saveMutation.mutate({
            moduleId,
            exerciseId,
            response: checked ? "true" : "false",
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center space-x-2 my-2 opacity-50">
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2 my-2">
            <Checkbox
                id={exerciseId}
                checked={checked}
                onCheckedChange={(c) => handleCheckedChange(c === true)}
            />
            <label
                htmlFor={exerciseId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
                {label}
            </label>
            {isSaving && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
        </div>
    );
}
