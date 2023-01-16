// store.js
import { reactive } from "vue";

export const canvasCoordinates = reactive({
  height: 0,
  width: 0,
  top: 0,
  left: 0,
});
export const fileObject = reactive({
  file: null,
});
export const imageObject = reactive({
  value: null,
});
export const imagePreviewObject = reactive({
  value: null,
});
export const isDarkMode = reactive({
  value: null,
});
export const slideDown = reactive({
  value: null,
});
export const sideBack = reactive({
  value: null,
});
export const sideBackBack = reactive({
  value: null,
});
export const currentSubject = reactive({
  value: " ",
});
export const currentSalutationBeginning = reactive({
  value: " ",
});
export const currentTextField = reactive({
  value: " ",
});
export const currentEnding = reactive({
  value: " ",
});

export const currentSalutationEnding = reactive({
  value: " ",
});
