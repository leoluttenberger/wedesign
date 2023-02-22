<template>
  <input type="file" @change="onFileSelected" />
  <div v-if="imagePreview">
    <img class="absolute max-w-[20%] py-24" :src="imagePreview" />
  </div>
  <div v-if="xmlContent">
    <div>
      <button @click="createPdf()">Create PDF</button>
    </div>
  </div>
  <div v-if="pdf">PDF created!</div>
  <div>
    <button v-if="pdf" @click="savePdf()">Save PDF</button>
  </div>
  <vue-pdf-embed :source="pdfDataURL" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import JSZip from "jszip";
import xml2js from "xml2js";
import VuePdfEmbed from "vue-pdf-embed";

const docx = ref("");
const docxLayout = ref("");
const pdf = ref("");
const imagePreview = ref(null);
const xmlContent = ref(null);
const downloadDocx = ref(null);
const pdfDataURL = ref(null);

const onFileSelected = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = e.target.result;
    const zip = new JSZip();
    const doc = await zip.loadAsync(data);
    const content = await doc.file("word/document.xml").async("string");
    const layout = await doc.file("word/document.xml").async("string");

    // Parse the XML content using xml2js
    const parser = new xml2js.Parser();
    parser.parseStringPromise(content).then(function (result) {
      // Access the document content and layout
      const documentContent = result["w:document"]["w:body"][0];
      const documentLayout = layout;

      // Do something with the content and layout
      console.log(documentContent);
      console.log(documentLayout);
      xmlContent.value = documentLayout;
      // Set the docx value to the document content
      docx.value = documentContent;
      docxLayout.value = documentLayout;

      // Generate a data URL for the preview image
      const docxAsBlob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      downloadDocx.value = docxAsBlob;
      console.log(downloadDocx.value);
    });
  };

  reader.readAsArrayBuffer(file);
};
const createPdf = async () => {
  const doc = new jsPDF();
  const layout = docxLayout.value;
  const parser = new DOMParser();
  const layoutDoc = parser.parseFromString(layout, "text/xml");

  // Get all the paragraph elements in the layout
  const paragraphs = layoutDoc.getElementsByTagName("w:p");

  // Loop through the paragraphs and add the content to the PDF
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const textNodes = paragraph.getElementsByTagName("w:t");
    let text = "";

    // Get the text content of the paragraph
    for (let j = 0; j < textNodes.length; j++) {
      const textNode = textNodes[j];
      text += textNode.textContent;
    }

    // Get the formatting of the paragraph
    const runProperties = paragraph.getElementsByTagName("w:rPr")[0];
    const bold = runProperties?.getElementsByTagName("w:b")?.length > 0;
    const italic = runProperties?.getElementsByTagName("w:i")?.length > 0;
    const fontSize = runProperties
      ?.getElementsByTagName("w:sz")[0]
      ?.getAttribute("w:val");

    // Add the text to the PDF with the formatting
    if (Number(fontSize)) {
      console.log(Number(fontSize));
      doc.setFontSize(Number(fontSize));
    } else {
      console.log("Default fontsize 20");
      doc.setFontSize(20);
    }
    if (bold) {
      doc.setFontType("bold");
    }
    if (italic) {
      doc.setFontType("italic");
    }
    doc.text(10, 10 + i * 10, text);
  }
  const pdfBlob = doc.output("blob");
  pdf.value = pdfBlob;
  const reader = new FileReader();
  reader.readAsDataURL(pdfBlob);
  reader.onloadend = () => {
    pdfDataURL.value = reader.result;
  };
};

const createDocx = async () => {
  saveAs(downloadDocx.value, "motivation-letter.docx");
};

const savePdf = () => {
  console.log(pdf.value);
  saveAs(pdf.value, "motivation-letter.pdf");
};
</script>
