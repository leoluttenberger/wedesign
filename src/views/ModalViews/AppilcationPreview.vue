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
    <div
      class="border-[4px] border-wd-black dark:border-slate-800"
      id="pdf-container"
    >
      <vue-pdf-embed :source="pdfDataURL" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, onBeforeUnmount } from "vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import VuePdfEmbed from "vue-pdf-embed";

import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import JSZip from "jszip";
import { createDoc } from "@/helpers/createDoc";
import { convertXmlToPdf } from "@/helpers/convertDocToPdf";
import { convertXmlToHtml } from "@/helpers/convertXmlToHtml";
import { sideBack } from "@/store.js";

import { Filesystem, Directory } from "@capacitor/filesystem";
import { fileToBase64 } from "@/helpers/fileToBase64";

const pdf = ref(null);
const pdfDataURL = ref(null);
const html = ref(null);
const imagePreview = ref(null);
const downloadDocx = ref(null);
const docxContent = ref(null);

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
  downloadDocx.value = await createFile();
  sideBack.value = true;
  await convertToPdf();
  //window.addEventListener("resize", resizePdfContainer);
});
onBeforeUnmount(() => {
  //window.removeEventListener("resize", resizePdfContainer);
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
const convertToPdf = async () => {
  const xmlString = docxContent.value;
  html.value = convertXmlToHtml(xmlString);
  pdf.value = createPdfFromHtml(html.value);
  pdfDataURL.value = URL.createObjectURL(pdf.value);
};

const fileNameDoc = "motivation-letter.docx";
const fileNamePDF = "motivation-letter.pdf";

const saveAndDownLoadDocs = async () => {
  saveAs(pdf.value, fileNamePDF);
  saveAs(downloadDocx.value, fileNameDoc);
  console.log(downloadDocx.value);
  const base64StringDoc = await fileToBase64(downloadDocx.value);
  const base64StringPdf = await fileToBase64(pdf.value);

  await Filesystem.writeFile({
    path: `${fileNameDoc}`,
    data: base64StringDoc,
    directory: Directory.Documents,
  })
    .then(() => {
      console.log("File written to document docx directory!");
    })
    .catch((error) => {
      console.error(error);
    });

  await Filesystem.writeFile({
    path: `${fileNamePDF}`,
    data: base64StringPdf,
    directory: Directory.Documents,
  })
    .then(() => {
      console.log("File written to document pdf directory!");
    })
    .catch((error) => {
      console.error(error);
    });
  sideBack.value = false;
};

const createPdfFromHtml = (html: string) => {
  const element = document.createElement("div");
  element.innerHTML = html;

  const doc = new jsPDF("p", "pt"),
    specialElementHandlers = {
      "#bypassme": function (element, renderer) {
        return true;
      },
    };

  const margins = {
    top: 60,
    bottom: 60,
    left: 40,
    right: 40,
    width: 522,
  };
  doc.setFont("helvetica");
  doc.fromHTML(
    element,
    margins.left,
    margins.top,
    {
      width: margins.width,
      elementHandlers: specialElementHandlers,
    },
    margins
  );
  return doc.output("blob");
};
const resizePdfContainer = () => {
  const container = document.getElementById("pdf-container");
  const parentWidth = container.offsetWidth;
  const parentHeight = container.offsetHeight;
  const aspectRatio = 1.4142; // assume A4 paper size
  const width = Math.min(parentWidth, parentHeight * aspectRatio);
  const height = width / aspectRatio;
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;

  // Get current width and height of the container
  const currentWidth = container.offsetWidth;
  const currentHeight = container.offsetHeight;
  console.log(
    `Current container dimensions: ${currentWidth} x ${currentHeight}`
  );
};
</script>
