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
    const textNodes = paragraph.getElementsByTagName("w:t");
    const tabs = paragraph.getElementsByTagName("w:tab");
    for (let j = 0; j < textNodes.length; j++) {
      const textNode = textNodes[j];
      const text = textNode.textContent.replace(/\n/g, "");
      const isBold = textNode.parentNode?.nodeName === "w:b";
      const fontType = "helvetica";
      if (text == " " || text == "" || text == null) {
        htmlString += `<ul class="whitespace-list"><li><br> </li></ul>`;
      } else {
        if (paragraphStyle == "basic") {
          if (tabs && j == 2) {
            htmlString += `<span style="margin: 10px;">&emsp; --> </span><span style="font-family: ${fontType}; font-size: 14px; "> &emsp;${text}</span>`;
          } else {
            htmlString += `<span style="font-family: ${fontType}; font-size: 14px">${text}</span>`;
          }
        } else {
          if (paragraphStyle == "Heading1") {
            htmlString += `<h1 style="text-align: ${paragraphAlign}; font-size: 30px; margin: 0 0 10px 0; padding: 0 0 10px 0;">`;
          } else if (paragraphStyle == "Heading2") {
            htmlString += `<h2 style="text-align: ${paragraphAlign}; font-size: 16px; margin: 0 0 0px 0; padding: 0 0 3px 0; ">`;
          } else if (paragraphStyle == "paragraph") {
            htmlString += `<p style="text-align: ${paragraphAlign}; font-size: 14px; margin: 0 0 0px 0; padding: 0 0 4px 0; ">`;
          } else if (paragraphStyle == "normal") {
            htmlString += `<div style="text-align: ${paragraphAlign}; font-size: 14px; ">`;
          }

          htmlString += `<span style="font-family: ${fontType}">${text}</span>`;
          if (paragraphStyle === "Heading1") {
            htmlString += `</h1>`;
          } else if (paragraphStyle === "Heading2") {
            htmlString += `</h2>`;
          } else if (paragraphStyle === "paragraph") {
            htmlString += `</p>`;
          } else if (paragraphStyle === "normal") {
            htmlString += `</div>`;
          }
        }
      }
    }
  }

  return htmlString;
}
