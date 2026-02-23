import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportElementToPdf(element, filename = "decitwo.pdf") {
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Fit image to page width, split into pages if needed
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  let y = 0;
  let remaining = imgHeight;

  pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
  remaining -= pageHeight;

  while (remaining > 0) {
    pdf.addPage();
    y = - (imgHeight - remaining);
    pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
    remaining -= pageHeight;
  }

  pdf.save(filename);
}
