import { saveAs } from "file-saver";
import { Document, Paragraph, HeadingLevel, Packer } from "docx";
export const createDoc = async () => {
  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "h1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 28,
            bold: true,
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 60,
            },
          },
        },
        {
          id: "h2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 24,
            bold: true,
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 60,
            },
          },
        },
        {
          id: "normal",
          name: "Normal",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 22,
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 60,
            },
          },
        },
      ],
    },
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Personal Info",
            heading: HeadingLevel.HEADING_1,
            style: "h1",
          }),
          new Paragraph({
            text: "Datum, Ort",
            style: "normal",
          }),
          new Paragraph({
            text: "Betreff",
            style: "normal",
          }),
          new Paragraph({
            text: "Anrede",
            style: "normal",
          }),
          new Paragraph({
            text: "Einleitung",
            style: "normal",
          }),
          new Paragraph({
            text: "Werdegang",
            style: "normal",
          }),
          new Paragraph({
            text: "Kompetenzen",
            style: "normal",
          }),
          new Paragraph({
            text: "Beitrag",
            style: "normal",
          }),
          new Paragraph({
            text: "Abschluss",
            style: "normal",
          }),
          new Paragraph({
            text: "Abschied",
            style: "normal",
          }),
        ],
      },
    ],
  });

  const mimeType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  const fileName = "motivationLetter.docx";
  Packer.toBlob(doc).then((blob) => {
    const docblob = blob.slice(0, blob.size, mimeType);
    saveAs(docblob, fileName);
  });
};
