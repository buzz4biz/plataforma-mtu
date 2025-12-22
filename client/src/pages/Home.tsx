import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Streamdown } from "streamdown";
import { Send, Sparkles, MessageCircle, Target, FileText, Lightbulb, Loader2, Copy, Edit2, Trash2, Plus, HelpCircle, Download } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import { exportConversationToPDF } from "@/lib/pdfExport";
import { BackupPopup } from "@/components/BackupPopup";

interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
}

const SUGGESTED_QUESTIONS = [
  {
    icon: Target,
    title: "Extrair meu mecanismo",
    question: "Quero descobrir e nomear meu Mecanismo Terapêutico Único. Por onde começo?",
  },
  {
    icon: FileText,
    title: "Criar minha bio",
    question: "Preciso criar uma bio profissional para meu Instagram que comunique meu diferencial.",
  },
  {
    icon: MessageCircle,
    title: "Revisar comunicação",
    question: "Quero que você analise minha comunicação atual e me diga o que precisa melhorar.",
  },
  {
    icon: Lightbulb,
    title: "Dúvidas sobre o protocolo",
    question: "Tenho dúvidas sobre como implementar o Protocolo MTU na prática.",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [showBackupPopup, setShowBackupPopup] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    // Mostrar pop-up de backup na primeira mensagem
    if (messages.length === 0) {
      setTimeout(() => setShowBackupPopup(true), 2000);
    }

    try {
      const response = await sendMessageMutation.mutateAsync({
        messages: newMessages,
      });

      if (response.success) {
        setMessages([...newMessages, { role: "assistant", content: response.message }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: response.message }]);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Texto copiado!");
  };

  const handleEditMessage = (index: number) => {
    const message = messages[index];
    if (message.role === "user") {
      setEditingId(`msg-${index}`);
      setEditingContent(message.content);
    }
  };

  const handleSaveEdit = async (index: number) => {
    if (editingContent.trim()) {
      const newMessages = [...messages];
      newMessages[index].content = editingContent.trim();
      
      // Remover resposta do assistente que veio após esta mensagem
      const messagesUpToEdit = newMessages.slice(0, index + 1);
      setMessages(messagesUpToEdit);
      setEditingId(null);
      setEditingContent("");
      toast.success("Mensagem editada! Reprocessando...");
      
      // Reprocessar com o assistente
      setIsTyping(true);
      try {
        const response = await sendMessageMutation.mutateAsync({
          messages: messagesUpToEdit,
        });

        if (response.success) {
          setMessages([...messagesUpToEdit, { role: "assistant", content: response.message }]);
        } else {
          setMessages([...messagesUpToEdit, { role: "assistant", content: response.message }]);
        }
      } catch (error) {
        console.error("Erro ao reprocessar mensagem:", error);
        setMessages([
          ...messagesUpToEdit,
          {
            role: "assistant",
            content: "Desculpe, ocorreu um erro ao reprocessar sua mensagem. Por favor, tente novamente.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleDeleteMessage = (index: number) => {
    const newMessages = messages.filter((_, i) => i !== index);
    setMessages(newMessages);
    toast.success("Mensagem removida!");
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      setMessages([]);
      setInputValue("");
      setEditingId(null);
      toast.success("Novo chat iniciado!");
    }
  };

  const handleDownloadPDF = async () => {
    if (messages.length === 0) {
      toast.error("Nenhuma mensagem para exportar");
      return;
    }
    
    try {
      const success = await exportConversationToPDF(messages);
      if (success) {
        toast.success("PDF baixado com sucesso!");
      } else {
        toast.error("Erro ao gerar PDF");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao baixar PDF");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  Assistente MTU™
                </h1>
                <p className="text-sm text-muted-foreground">Mecanismo Terapêutico Único</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/faq">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-lg"
                  title="Saiba mais sobre o Protocolo MTU"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">FAQ</span>
                </Button>
              </Link>
              {messages.length > 0 && (
                <>
                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF</span>
                  </Button>
                  <Button
                    onClick={handleNewChat}
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Novo Chat
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
          <div className="py-6 space-y-6">
            {messages.length === 0 ? (
              /* Welcome Screen */
              <div className="animate-fade-in">
                <div className="text-center mb-8 pt-8">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                  <h2
                    className="text-2xl font-semibold text-foreground mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Olá! Sou o Assistente MTU™
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Estou aqui para ajudar você a descobrir, nomear e comunicar seu Mecanismo Terapêutico Único. No que
                    posso te ajudar hoje?
                  </p>
                </div>

                {/* Suggested Questions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {SUGGESTED_QUESTIONS.map((item, index) => (
                    <Card
                      key={index}
                      className="p-4 cursor-pointer hover:bg-accent/50 transition-colors duration-200 border-border/50"
                      onClick={() => handleSuggestedQuestion(item.question)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.question}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const messageId = `msg-${index}`;
                  const isEditing = editingId === messageId;
                  return (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in group`}
                    >
                      <div className="flex gap-2 items-end">
                        {message.role === "assistant" && (
                          <Button
                            onClick={() => handleCopyMessage(message.content)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Copiar"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        )}
                        <div
                          className={`max-w-[85%] ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3"
                              : "bg-card border border-border/50 rounded-2xl rounded-bl-md px-4 py-3"
                          }`}
                        >
                          {isEditing ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                className="min-h-[60px] text-sm"
                              />
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleSaveEdit(index)}
                                  size="sm"
                                  className="h-8 text-xs"
                                >
                                  Salvar
                                </Button>
                                <Button
                                  onClick={() => setEditingId(null)}
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs"
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ) : message.role === "assistant" ? (
                            <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground">
                              <Streamdown>{message.content}</Streamdown>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>
                        {message.role === "user" && !isEditing && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              onClick={() => handleEditMessage(index)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteMessage(index)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              title="Deletar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>



        {/* Input Area */}
        <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="min-h-[48px] max-h-[200px] resize-none pr-12 rounded-xl border-border/50 bg-background focus:border-primary/50 transition-colors"
                rows={1}
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 transition-colors"
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Assistente baseado no Protocolo MTU™ para terapeutas
          </p>
        </div>
      </main>
      <BackupPopup
        isOpen={showBackupPopup}
        onClose={() => setShowBackupPopup(false)}
        onDownloadPDF={handleDownloadPDF}
      />
    </div>
  );
}
