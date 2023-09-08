const textClassification = {
  label:
    "inline-block align-middle text-black dark:text-white font-Montserrat md:text-lg text-base placeholder-gray dark:placeholder-gray",
  inner: `
    border-none
    border-transparent
    formkit-invalid:border-red-400
    overflow-hidden
    focus-within:border-wd-green
    bg-white dark:bg-slate-800
  `,
  input:
    "h-10 outline-0 font-Montserrat md:text-lg text-base font-bold text-black bg-wd-white dark:text-white dark:bg-slate-800 placeholder-gray dark:placeholder-gray",
};
const boxClassification = {
  fieldset: "max-w-md border border-gray-400 rounded-md",
  legend: "font-bold text-base",
  wrapper: "flex mb-1 cursor-pointer",
  help: "mb-2",
  input:
    "form-check-input appearance-none h-5 w-5 mr-2 border border-gray-500 rounded-md bg-white focus:outline-none focus:ring-0 transition duration-200",
  label: "text-base text-gray-700 mt-1",
};
const buttonClassification = {
  wrapper: "mb-1",
  input:
    "bg-wd-green hover:bg-transparent-green shadow text-white text-base font-bold font-Montserrat py-2 px-6 rounded-full",
};
const navigationClassification = {
  input:
    "flex items-center text-base uppercase font-Montserrat leading-snug text-black hover:bg-trasparent-black",
};
export default {
  global: {
    outer: "mb-5 formkit-disabled:opacity-50",
    help: "text-base text-gray-500",
    messages: "list-none p-0 mt-1 mb-0",
    message: "text-red-500 mb-1 text-base",
  },
  navigation: navigationClassification,
  button: buttonClassification,
  date: textClassification,
  "datetime-local": textClassification,
  checkbox: boxClassification,
  email: textClassification,
  file: {
    label: "block mb-1 font-bold text-base",
    inner: "max-w-full cursor-pointer",
    input:
      "text-gray-600 text-base mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-base file:bg-blue-500 file:text-white hover:file:bg-blue-600",
    noFiles: "block text-gray-800 text-base mb-1",
    fileItem: "block flex text-gray-800 text-base mb-1",
    fileRemove: "ml-auto text-blue-500 text-base",
  },
  month: textClassification,
  number: textClassification,
  password: textClassification,
  radio: {
    ...boxClassification,
    input: boxClassification.input.replace("rounded-sm", "rounded-full"),
  },
  range: {
    inner: "max-w-full",
    input:
      "form-range appearance-none w-full h-2 p-0 bg-gray-200 rounded-full focus:outline-none focus:ring-0 focus:shadow-none",
  },
  search: textClassification,
  select: textClassification,
  submit: buttonClassification,
  tel: textClassification,
  text: textClassification,
  textarea: {
    ...textClassification,
    input:
      "h-20 outline-0 outline-none font-Montserrat md:text-lg text-base font-bold text-black bg-wd-white dark:text-white dark:bg-slate-800 placeholder-gray dark:placeholder-gray resize-none",
  },
  time: textClassification,
  url: textClassification,
  week: textClassification,
};
