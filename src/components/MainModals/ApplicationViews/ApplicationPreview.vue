<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div class="grid grid-cols-3 p-2 place-items-center">
      <button type="button" @click="closeModal()">
        <BackIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></BackIcon>
      </button>
      <p
        class="text-black px-1 dark:text-white font-Montserrat text-xl font-bold"
      >
        {{ "Vorschau & Teilen" }}
      </p>
      <div class="flex gap-4">
        <button v-if="pdf" @click="saveAndDownLoadDocs()">
          <DocIcon
            class="h-8 w-8 dark:stroke-wd-white stroke-black stroke-1 fill-black dark:fill-white"
          ></DocIcon>
        </button>

        <button v-if="pdf" @click="saveAndDownLoadPDF()">
          <PdfIcon
            class="h-8 w-8 dark:stroke-wd-white stroke-black stroke-1 fill-black dark:fill-white"
          ></PdfIcon>
        </button>
      </div>
    </div>
    <ConfettiExplosion v-if="visible" />

    <div class="grid place-items-center">
      <div role="status" v-if="!pdf">
        <svg
          aria-hidden="true"
          class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
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
  <MVEditModal :show="bottomCardOpen">
    <div class="flex">
      <div
        class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
      >
        <component :is="ApplicationCheck" />
      </div>
    </div>
  </MVEditModal>
</template>
<script setup lang="ts">
import {
  nextTick,
  ref,
  onMounted,
  defineProps,
  onBeforeUnmount,
  watch,
} from "vue";
import { useElementSize } from "@vueuse/core";
import { sideBack, sideBackBack } from "@/store/store.js";
import { Share } from "@capacitor/share";

import BackIcon from "@/assets/icons/BackIcon.vue";
import DocIcon from "@/assets/icons/DocIcon.vue";
import PdfIcon from "@/assets/icons/PdfIcon.vue";
import ZoomOutIcon from "@/assets/icons/ZoomOutIcon.vue";
import ZoomInIcon from "@/assets/icons/ZoomInIcon.vue";

import VuePdfEmbed from "vue-pdf-embed";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

import JSZip from "jszip";
import { createDoc } from "@/helpers/createDoc";
import { convertXmlToHtml } from "@/helpers/convertXmlToHtml";

import { Filesystem, Directory } from "@capacitor/filesystem";
import { fileToBase64 } from "@/helpers/fileToBase64";
import ApplicationCheck from "@/components/MainModals/ApplicationViews/ApplicationCheck.vue";
import ConfettiExplosion from "vue-confetti-explosion";
import moment from "moment";

const pdf = ref(null);
const pdfDataURL = ref(null);
const html = ref(null);
const downloadDocx = ref(null);
const docxContent = ref(null);
const el = ref(null);
const { width, height } = useElementSize(el);
const zoomFactor = ref(1);
const imgData = ref("");
const bottomCardOpen = ref(false);
const visible = ref(false);
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

watch(sideBackBack, () => {
  if (sideBackBack.value) {
    bottomCardOpen.value = true;
  } else {
    bottomCardOpen.value = false;
  }
});
onMounted(async () => {
  downloadDocx.value = await createFile();
  bottomCardOpen.value = true;
  sideBack.value = true;
  setTimeout(() => {
    convertToPdf();
  }, 1000);
  window.addEventListener("resize", resizePdfContainer);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizePdfContainer);
});
const closeModal = () => {
  sideBack.value = false;
};

const createFile = async () => {
  console.log(props.currentMotvationMVIndex);
  const file = await createDoc(
    props.currentApplIndex,
    props.currentMotvationMVIndex
  );
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

const saveAndDownLoadDocs = async () => {
  const applications = JSON.parse(localStorage.getItem("applications"));
  const dateString = moment().format("DD_MM_YYYY");
  visible.value = false;
  await nextTick();
  visible.value = true;

  const fileNameDoc =
    "motivationsschreiben-" +
    applications[props.currentApplIndex][0].company +
    "_" +
    dateString +
    ".docx";

  const base64StringDoc = await fileToBase64(downloadDocx.value);

  if ((await Share.canShare()).value == true) {
    console.log("Sharing is supported!");
    try {
      await Filesystem.writeFile({
        path: fileNameDoc,
        data: base64StringDoc,
        directory: Directory.External,
      })
        .then(
          () => {
            Filesystem.getUri({
              directory: Directory.External,
              path: fileNameDoc,
            }).then(
              (result) => {
                Share.share({
                  title: fileNameDoc,
                  files: [result.uri],
                });
                console.log("sharePathDoc", result.uri);
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
    } catch (e) {
      console.log("File Share not supported on this platform");
    }
  } else {
    // Fallback for browsers that do not support Web Share API
    console.log("Web Share API is not supported in this browser");
    try {
      saveAs(downloadDocx.value, fileNameDoc);
    } catch (e) {
      console.log("File Save not supported on this platform");
    }
  }
};
const saveAndDownLoadPDF = async () => {
  const applications = JSON.parse(localStorage.getItem("applications"));
  const dateString = moment().format("DD_MM_YYYY");
  visible.value = false;
  await nextTick();
  visible.value = true;
  const fileNamePDF =
    "motivationsschreiben-" +
    applications[props.currentApplIndex][0].company +
    "_" +
    dateString +
    ".pdf";
  const fileSize = pdf.value.output("blob").size / 1024;
  console.log("Pdf-size", fileSize + " KB");
  const base64StringPdf = await fileToBase64(pdf.value.output("blob"));

  if (fileSize <= 4000) {
    if ((await Share.canShare()).value == true) {
      console.log("Sharing is supported!");
      await nextTick();
      try {
        await Filesystem.writeFile({
          path: fileNamePDF,
          data: base64StringPdf,
          directory: Directory.External,
        })
          .then(
            () => {
              Filesystem.getUri({
                directory: Directory.External,
                path: fileNamePDF,
              }).then(
                (result) => {
                  Share.share({
                    title: fileNamePDF,
                    files: [result.uri],
                  });
                  console.log("sharePathPDF", result.uri);
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
            console.log("File written to document pdf directory!");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.log("File Share not supported on this platform");
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      console.log("Web Share API is not supported in this browser");
      try {
        saveAs(pdf.value.output("blob"), fileNamePDF);
      } catch (e) {
        console.log("File Save not supported on this platform");
      }
    }
  } else {
    console.log("Error PDF filesize to big!");
  }
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
