<template>
  <div>
    <input type="file" @change="onFileSelected" />
    <div>
      <button v-if="docx" @click="previewDocx()">Preview</button>
    </div>
    <div v-if="docx" ref="preview" />
    <div>
      <button @click="createPdf()">Create PDF</button>
    </div>
    <div v-if="pdf">PDF created!</div>
    <div>
      <button v-if="pdf" @click="savePdf()">Save PDF</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import jsPDF from "jspdf";
import { createWorker } from "tesseract.js";
const docx = ref();
const pdf = ref();
const preview = ref();

const onFileSelected = (event: any) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = e.target.result as ArrayBuffer;
    const zip = new JSZip();
    const doc = await zip.loadAsync(data);
    docx.value = await doc.file("word/document.xml").async("text");
  };

  reader.readAsArrayBuffer(file);
};

const previewDocx = async () => {
  const el = preview.value as HTMLElement;
  el.innerHTML = docx.value;

  const worker = createWorker();
  (await worker).load();
  (await worker).loadLanguage("eng");
  (await worker).initialize("eng");

  const result = (await worker).recognize(el.innerText);
  const data = (await result).data;

  (await worker).terminate();

  console.log(data.text);
};

const createPdf = async () => {
  const doc = new jsPDF();
  doc.text(docx.value, 10, 10);
  pdf.value = doc.output("blob");
};

const savePdf = () => {
  saveAs(pdf.value, "motivation-letter.pdf");
};
</script>
