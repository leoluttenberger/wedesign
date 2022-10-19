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
