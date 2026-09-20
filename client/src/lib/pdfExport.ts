import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
}

export interface ExerciseResponse {
  exerciseId: string;
  lessonTitle: string;
  exerciseTitle: string;
  response: string;
}

export async function exportModuleToPDF(
  moduleTitle: string,
  moduleSubtitle: string,
  exercises: ExerciseResponse[],
  filename: string = "modulo-mtu.pdf"
) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper para adicionar nova página
    const addNewPageIfNeeded = (requiredSpace: number = 20) => {
      if (yPosition > pageHeight - margin - requiredSpace) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(184, 134, 11); // Ouro
    doc.text(moduleTitle, margin, yPosition);
    yPosition += 8;

    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(moduleSubtitle, margin, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, margin, yPosition);
    yPosition += 8;

    // Linha separadora
    doc.setDrawColor(184, 134, 11);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Respostas dos exercícios
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];
      
      addNewPageIfNeeded(30);

      // Título da lição
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(184, 134, 11);
      const lessonLines = doc.splitTextToSize(exercise.lessonTitle, contentWidth);
      doc.text(lessonLines, margin, yPosition);
      yPosition += lessonLines.length * 6;

      // Título do exercício
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);
      const exerciseLines = doc.splitTextToSize(exercise.exerciseTitle, contentWidth);
      doc.text(exerciseLines, margin, yPosition);
      yPosition += exerciseLines.length * 5 + 3;

      // Resposta
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(70, 70, 70);
      
      if (exercise.response && exercise.response.trim()) {
        const responseLines = doc.splitTextToSize(exercise.response, contentWidth - 5);
        
        // Quebrar em páginas se necessário
        for (let j = 0; j < responseLines.length; j++) {
          if (addNewPageIfNeeded(10)) {
            // Se mudou de página, adiciona indicador de continuação
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 120);
            doc.text('(continuação)', margin, yPosition);
            yPosition += 5;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(70, 70, 70);
          }
          doc.text(responseLines[j], margin + 5, yPosition);
          yPosition += 5;
        }
      } else {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('[Não respondido]', margin + 5, yPosition);
        yPosition += 5;
      }
      
      yPosition += 8;

      // Linha separadora entre exercícios
      if (i < exercises.length - 1) {
        addNewPageIfNeeded(5);
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 8;
      }
    }

    // Footer em todas as páginas
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        'Gerado pela Plataforma MTU™ - Protocolo de Mecanismo Terapêutico Único',
        margin,
        pageHeight - 10
      );
      doc.text(
        `Página ${i} de ${pageCount}`,
        pageWidth - margin - 20,
        pageHeight - 10
      );
    }

    // Salvar
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    return false;
  }
}

export async function exportConversationToPDF(messages: Message[], filename: string = "conversa-mtu.pdf") {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(184, 134, 11); // Ouro
    doc.text('Assistente MTU™', margin, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50); // Cinza escuro
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, margin, yPosition);
    yPosition += 8;

    // Linha separadora
    doc.setDrawColor(184, 134, 11); // Ouro
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Mensagens
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);

    for (const message of messages) {
      const isUser = message.role === 'user';
      const label = isUser ? 'Você' : 'Assistente MTU™';
      
      // Label
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(isUser ? 100 : 184, isUser ? 100 : 134, isUser ? 100 : 11);
      doc.text(label, margin, yPosition);
      yPosition += 5;

      // Conteúdo
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      
      const lines = doc.splitTextToSize(message.content, contentWidth - 5);
      doc.text(lines, margin + 5, yPosition);
      yPosition += lines.length * 5 + 3;

      // Verificar se precisa de nova página
      if (yPosition > pageHeight - margin - 10) {
        doc.addPage();
        yPosition = margin;
      }
    }

    // Footer
    yPosition = pageHeight - margin - 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Gerado pelo Assistente MTU™ - Protocolo de Mecanismo Terapêutico Único', margin, yPosition);

    // Salvar
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    return false;
  }
}
