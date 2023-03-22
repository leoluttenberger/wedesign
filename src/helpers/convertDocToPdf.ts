import xml2js from "xml2js";
import jsPDF from "jspdf";

export async function convertXmlToPdf(xmlString: string): Promise<Blob> {
  const parser = new xml2js.Parser({ explicitArray: false });
  const doc = new jsPDF();
  const parseXmlNode = async (node: any) => {
    console.log("node", node);
    if (node.$) {
      const body = node["w:body"];
      const paragraphs = body["w:p"];
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const textNodes = paragraph["w:r"];
        let text = " ";
        if (textNodes) {
          text = textNodes["w:t"] ? textNodes["w:t"]._ : "";
        }
        doc.setFontSize(14);
        doc.setFontType("normal");
        if (text == null) {
          text = " ";
        }
        doc.text(10, 10 + i * 10, text);
      }
    }
  };
  const xmlData = await parser.parseStringPromise(xmlString);
  await parseXmlNode(xmlData["w:document"]);

  return doc.output("blob");
}
