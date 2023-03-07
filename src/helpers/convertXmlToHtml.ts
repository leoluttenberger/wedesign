export function convertXmlToHtml(xmlString: string): string {
  const domParser = new DOMParser();
  const xmlDoc = domParser.parseFromString(xmlString, "application/xml");
  const paragraphs = xmlDoc.getElementsByTagName("w:p");

  let htmlString = "";
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const paragraphStyle = paragraph
      .getElementsByTagName("w:pStyle")[0]
      ?.getAttribute("w:val");
    const paragraphAlign = paragraph
      .getElementsByTagName("w:jc")[0]
      ?.getAttribute("w:val");

    if (paragraphStyle === "Heading1") {
      htmlString += `<h1 style="text-align: ${paragraphAlign}; font-size: 30px; ">`;
    } else if (paragraphStyle === "Heading2") {
      htmlString += `<h2 style="text-align: ${paragraphAlign}; font-size: 16px;">`;
    } else if (paragraphStyle === "normal") {
      htmlString += `<div style="text-align: ${paragraphAlign}; font-size: 14px;">`;
    }

    const textNodes = paragraph.getElementsByTagName("w:t");
    for (let j = 0; j < textNodes.length; j++) {
      const textNode = textNodes[j];
      const text = textNode.textContent.replace(/\n/g, "");
      const isBold = textNode.parentNode?.nodeName === "w:b";
      const fontType = "Arial";
      if (text == " " || text == "" || text == null) {
        htmlString += `<br>${text}`;
      } else {
        htmlString += `<span style="font-family: ${fontType}">${text}</span>`;
      }
    }

    if (paragraphStyle === "Heading1") {
      htmlString += `</h1>`;
    } else if (paragraphStyle === "Heading2") {
      htmlString += `</h2>`;
    } else if (paragraphStyle === "normal") {
      htmlString += `</div>`;
    }
  }

  return htmlString;
}
