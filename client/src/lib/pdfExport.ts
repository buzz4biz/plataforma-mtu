import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
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
    doc.setFont('Playfair Display', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(184, 134, 11); // Ouro
    doc.text('Assistente MTU™', margin, yPosition);
    yPosition += 10;

    doc.setFont('Montserrat', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50); // Cinza escuro
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, margin, yPosition);
    yPosition += 8;

    // Linha separadora
    doc.setDrawColor(184, 134, 11); // Ouro
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Mensagens
    doc.setFont('Montserrat', 'normal');
    doc.setFontSize(11);

    for (const message of messages) {
      const isUser = message.role === 'user';
      const label = isUser ? 'Você' : 'Assistente MTU™';
      
      // Label
      doc.setFont('Montserrat', 'bold');
      doc.setTextColor(isUser ? 100 : 184, isUser ? 100 : 134, isUser ? 100 : 11);
      doc.text(label, margin, yPosition);
      yPosition += 5;

      // Conteúdo
      doc.setFont('Montserrat', 'normal');
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
    doc.setFont('Montserrat', 'normal');
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
