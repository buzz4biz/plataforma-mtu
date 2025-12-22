import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPDF?: () => void;
}

export function BackupPopup({ isOpen, onClose, onDownloadPDF }: BackupPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 border border-accent/20">
        {/* Header com ícone e botão fechar */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 p-2 rounded-lg">
              <AlertCircle className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Importante: Faça backup
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Copie e cole as informações importantes desta conversa em um documento (Word, Google Docs, Notion, etc.) para um backup seguro. Assim você terá sempre acesso aos seus insights.
          </p>

          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
            <p className="text-xs text-foreground font-medium mb-2">💡 Dica:</p>
            <p className="text-xs text-muted-foreground">
              Você também pode baixar a conversa completa em PDF clicando no botão "PDF" no topo da página.
            </p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-2 mt-6">
          <Button
            onClick={onClose}
            className="w-full"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}
