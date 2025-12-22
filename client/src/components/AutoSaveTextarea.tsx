import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Check } from "lucide-react";

interface AutoSaveTextareaProps {
  moduleId: string;
  exerciseId: string;
  placeholder?: string;
  minHeight?: string;
  label?: string;
}

export default function AutoSaveTextarea({
  moduleId,
  exerciseId,
  placeholder = "Digite sua resposta aqui...",
  minHeight = "200px",
  label,
}: AutoSaveTextareaProps) {
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
      return; // Não salvar se não mudou
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
    }, 1500); // Salva após 1.5s de inatividade

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, moduleId, exerciseId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] resize-y"
          style={{ minHeight }}
        />
        <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-muted-foreground">
          {saveStatus === "saving" && (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Salvando...
            </>
          )}
          {saveStatus === "saved" && (
            <>
              <Check className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">Salvo</span>
            </>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Suas respostas são salvas automaticamente
      </p>
    </div>
  );
}
