<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
      <button type="button" @click="closeModal()" class="p-4">
        <BackIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></BackIcon>
      </button>
      <p
        class="text-black px-1 dark:text-white font-Montserrat text-xl font-bold"
      >
        {{ "Vorschau" }}
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
      <vue-pdf-embed :source="pdfDataURL" :width="width * zoomFactor" />
    </div>
    <div class="border-[4px] border-wd-black dark:border-slate-800" ref="el">
      {{ height }} x {{ width }}
    </div>
  </div>
  <div
    class="group fixed bottom-0 left-0 p-4 flex items-end justify-end w-24 h-24"
  >
    <button
      @click="zoomOut()"
      class="px-4 w-14 h-14 bg-wd-green rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    >
      <ZoomOutIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></ZoomOutIcon>
    </button>
  </div>
  <div
    class="group fixed bottom-0 right-0 p-4 flex items-end justify-end w-24 h-24"
  >
    <button
      @click="zoomIn()"
      class="px-4 w-14 h-14 bg-wd-green rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    >
      <ZoomInIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></ZoomInIcon>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, onBeforeUnmount } from "vue";
import { useElementSize } from "@vueuse/core";
import { slideDownUserInfo } from "@/store/store.js";
import { Share } from "@capacitor/share";
import { Capacitor } from "@capacitor/core";

import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import AddIcon from "@/assets/icons/AddIcon.vue";
import ZoomOutIcon from "@/assets/icons/ZoomOutIcon.vue";
import ZoomInIcon from "@/assets/icons/ZoomInIcon.vue";

import VuePdfEmbed from "vue-pdf-embed";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

import JSZip from "jszip";
import { createCV } from "@/helpers/createCV";
import { convertXmlToHtml } from "@/helpers/convertXmlToHtml";

import { Filesystem, Directory } from "@capacitor/filesystem";
import { fileToBase64 } from "@/helpers/fileToBase64";
import moment from "moment";
const profileImg = JSON.parse(localStorage.getItem("profileImg"));

const pdf = ref(null);
const pdfDataURL = ref(null);
const html = ref(null);
const downloadDocx = ref(null);
const docxContent = ref(null);
const el = ref(null);
const { width, height } = useElementSize(el);
const zoomFactor = ref(1);
const imgData = ref("");

const props = defineProps({
  currentApplIndex: {
    type: Number,
    default: 0,
  },
  currentMotvationMVIndex: {
    type: Number,
    default: 0,
  },
});

onMounted(async () => {
  downloadDocx.value = await createFile();
  slideDownUserInfo.value = false;
  await convertToPdf();
  window.addEventListener("resize", resizePdfContainer);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizePdfContainer);
});
const closeModal = () => {
  slideDownUserInfo.value = true;
};

const createFile = async () => {
  const file = await createCV();
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
  pdfDataURL.value = URL.createObjectURL(pdf.value.output("blob"));
};
const creatImage = () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const img = new Image();
  img.src = pdf.value.output("datauristring");
  context.drawImage(img, 0, 0);
  imgData.value = canvas.toDataURL("image/png");
};

const mailImage = () => {
  creatImage();
  const mailtoLink = `mailto:recipient@example.com?subject=&body= Bitte hänge dein Motivationsschreiben und deinen Lebenslauf an. Die Datein findest im Ordner Dokumente!&attachment=`;
  window.location.href = mailtoLink;
};
const saveAndDownLoadDocs = async () => {
  const dateString = moment().format("DD_MM_YYYY");
  const fileNameDoc = "lebenslauf-" + dateString + ".docx";
  const fileNamePDF = "lebenslauf-" + "_" + dateString + ".pdf";

  const base64StringPdf = await fileToBase64(pdf.value.output("blob"));
  const base64StringDoc = await fileToBase64(downloadDocx.value);
  saveAs(pdf.value.output("blob"), fileNamePDF);
  saveAs(downloadDocx.value, fileNameDoc);
  let sharePath;
  await Filesystem.writeFile({
    path: fileNameDoc,
    data: base64StringDoc,
    directory: Directory.Documents,
  })
    .then(
      () => {
        Filesystem.getUri({
          directory: Directory.Documents,
          path: fileNameDoc,
        }).then(
          (result) => {
            Share.share({
              title: fileNameDoc,
              text: fileNameDoc,
              files: [result.uri],
            });
            console.log("sharePath", result.uri);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    )
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

  if (Share.share && sharePath != "") {
    await Share.share({
      title: "Share File",
      text: fileNameDoc,
      url: sharePath,
    });
  } else {
    // Fallback for browsers that do not support Web Share API
    console.log("Web Share API is not supported in this browser");
    mailImage();
  }
  slideDownUserInfo.value = true;
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

  doc.addImage(profileImg, "PNG", 400, 95, 120, 120);

  const margins = {
    top: 60,
    bottom: 60,
    left: 50,
    right: 50,
    width: 500,
  };
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
  return doc;
};
const resizePdfContainer = () => {
  const container = document.getElementById("pdf-container");
  const parentWidth = el.value.width;
  const parentHeight = el.value.height;
  const aspectRatio = 1.4142; // assume A4 paper size
  const width = Math.min(parentWidth, parentHeight * aspectRatio);
  const height = width / aspectRatio;
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
};
const zoomIn = () => {
  if (zoomFactor.value < 2) {
    zoomFactor.value += 0.1;
  }
};
const zoomOut = () => {
  if (zoomFactor.value > 1) {
    zoomFactor.value -= 0.1;
  }
};
</script>
