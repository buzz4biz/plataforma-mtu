import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, Check } from "lucide-react";

interface AutoSaveInputProps {
    moduleId: string;
    exerciseId: string;
    placeholder?: string;
}

export default function AutoSaveInput({
    moduleId,
    exerciseId,
    placeholder = "Sua resposta...",
}: AutoSaveInputProps) {
    const [value, setValue] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Carregar resposta salva
    const { data: exerciseData, isLoading } = trpc.exercises.get.useQuery({
        moduleId,
        exerciseId,
    });

    // Mutation para salvar
    const saveMutation = trpc.exercises.save.useMutation({
        onSuccess: () => {
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        },
    });

    // Carregar dados ao montar
    useEffect(() => {
        if (exerciseData?.response) {
            setValue(exerciseData.response);
        }
    }, [exerciseData]);

    // Auto-save com debounce
    useEffect(() => {
        if (value === (exerciseData?.response || "")) {
            return;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setSaveStatus("saving");

        timeoutRef.current = setTimeout(() => {
            saveMutation.mutate({
                moduleId,
                exerciseId,
                response: value,
            });
        }, 1500);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, moduleId, exerciseId]);

    if (isLoading) {
        return <div className="h-10 w-full animate-pulse bg-muted rounded-md" />;
    }

    return (
        <div className="relative inline-block w-full max-w-md my-2">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="pr-20"
            />
            <div className="absolute top-0 right-3 h-full flex items-center gap-2 text-xs text-muted-foreground pointer-events-none">
                {saveStatus === "saving" && (
                    <Loader2 className="h-3 w-3 animate-spin" />
                )}
                {saveStatus === "saved" && (
                    <Check className="h-3 w-3 text-emerald-500" />
                )}
            </div>
        </div>
    );
}
