import { DocxToPdf } from "docx-to-pdf";

export async function convertDocxToPdf(
  docxFilePath: string,
  pdfFilePath: string
): Promise<void> {
  const converter = new DocxToPdf();

  // Convert the docx file to a pdf file
  await converter.convertDocxToPdf(docxFilePath, pdfFilePath);
}
