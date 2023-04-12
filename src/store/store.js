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
export const slideDownUserInfo = reactive({
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
export const currentTextBegining = reactive({
  value: " ",
});
export const currentTextExperience = reactive({
  value: " ",
});
export const currentTextContribution = reactive({
  value: " ",
});
export const currentTextCompetence = reactive({
  value: " ",
});
export const currentEnding = reactive({
  value: " ",
});
export const currentSalutationEnding = reactive({
  value: " ",
});
export const selectedDay = reactive({
  value: 0,
});
export const selectedMonth = reactive({
  value: 0,
});
export const selectedYear = reactive({
  value: 0,
});
export const addedDate = reactive({
  value: "",
});
export const changedDate = reactive({
  value: true,
});
export const addedType = reactive({
  value: "",
});
export const isMonthEvent = reactive({
  value: null,
});
export const dragOptionActive = reactive({
  value: null,
});

export const lastApplicationIndex = reactive({
  value: null,
});
export const isQuickAccessApplication = reactive({
  value: null,
});

export const lastCalendarIndex = reactive({
  value: null,
});
export const isQuickAccessCalendar = reactive({
  value: null,
});
