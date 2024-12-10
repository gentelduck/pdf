import jsPDF from "jspdf";

export const generatePDF = ({ previews }: { previews: string[] }) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  previews.forEach((src, index) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const pdfWidth = pageWidth - 20; // Margin

      if (index > 0) pdf.addPage(); // Add new page for subsequent images
      pdf.addImage(src, "JPEG", 10, 10, pdfWidth, pageHeight);

      if (index === previews.length - 1) {
        // Save the PDF when the last image is processed
        pdf.save("image-gallery.pdf");
      }
    };
  });
};
