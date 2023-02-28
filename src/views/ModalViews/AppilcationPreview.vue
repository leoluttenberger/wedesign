<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
      <button type="button" @click="closeModal()" class="p-4">
        <CloseIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></CloseIcon>
      </button>
      <p
        class="text-black px-1 dark:text-white font-Montserrat text-xl p-4 font-bold"
      >
        {{ "Download" }}
      </p>
      <button v-if="pdf" @click="saveAndDownLoadDocs()" class="p-4">
        <CheckIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></CheckIcon>
      </button>
    </div>
    <div v-if="imagePreview">
      <img class="absolute max-w-[20%] py-24" :src="imagePreview" />
    </div>
    <vue-pdf-embed :source="pdfDataURL" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import VuePdfEmbed from "vue-pdf-embed";

import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { createDoc } from "@/components/createDoc";
import { sideBack } from "@/store.js";

const pdf = ref("");
const imagePreview = ref(null);
const downloadDocx = ref(null);
const docxContent = ref(null);
const pdfDataURL = ref(null);

const props = defineProps({
  currentApplIndex: {
    type: Number,
    default: 0,
  },
  currentApplMVid: {
    type: Number,
    default: 0,
  },
});

onMounted(async () => {
  console.log("Process 1");
  downloadDocx.value = await createFile();
  console.log("content 1:", docxContent.value);
  console.log("Process 2");
  console.log("content 2:", docxContent.value);
  sideBack.value = true;
  await createPdf();
});

const closeModal = () => {
  sideBack.value = false;
};

const createFile = async () => {
  const file = await createDoc(props.currentApplIndex, props.currentApplMVid);
  const data = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsArrayBuffer(file);
  });
  const zip = new JSZip();
  const doc = await zip.loadAsync(data);
  const content = await doc.file("word/document.xml").async("string");
  docxContent.value = content;
  console.log("onload Process");
  return file;
};
const createPdf = async () => {
  const doc = new jsPDF();
  const layout = docxContent.value;
  console.log("Process 3");
  console.log("content 3:", docxContent.value);
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

const saveAndDownLoadDocs = () => {
  saveAs(pdf.value, "motivation-letter.pdf");
  saveAs(downloadDocx.value, "motivation-letter.docx");
};
</script>
