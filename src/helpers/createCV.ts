import { Document, Paragraph, HeadingLevel, AlignmentType, Packer } from "docx";
import moment from "moment";
import { ref } from "vue";

export const createCV = async () => {
  const blob = createDocHandler();
  return blob;
};
async function createDocHandler() {
  // Create the Docx file in memory
  const docxBlob = await createDocx();
  return docxBlob;
}

async function createDocx(): Promise<Blob> {
  const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")) || []);
  const educations = ref(JSON.parse(localStorage.getItem("educations")) || []);
  const experiences = ref(
    JSON.parse(localStorage.getItem("experiences")) || []
  );
  const knowledges = ref(JSON.parse(localStorage.getItem("knowledges")) || []);

  let titleBefore = "";
  let titleAfter = "";
  let firstName = "";
  let secondName = "";
  let birthDate = "";
  let birthArea = "";
  let civilStatus = "";
  let gender = "";
  let email = "";
  let phone = "";
  let streetName = "";
  let streetNumber = "";
  let districtNumber = "";
  let city = "";
  let hobbies = "";

  if (localStorage.getItem("userInfos")) {
    titleBefore = userInfos.value[0][0].titleBefore
      ? userInfos.value[0][0].titleBefore
      : "";
    titleAfter = userInfos.value[0][0].titleAfter
      ? userInfos.value[0][0].titleAfter
      : "";
    firstName = userInfos.value[0][0].firstName
      ? userInfos.value[0][0].firstName
      : "";
    secondName = userInfos.value[0][0].secondName
      ? userInfos.value[0][0].secondName
      : "";
    birthDate = userInfos.value[0][0].birthDate
      ? userInfos.value[0][0].birthDate
      : "";
    birthArea = userInfos.value[0][0].birthArea
      ? userInfos.value[0][0].birthArea
      : "";
    civilStatus = userInfos.value[0][0].civilStatus
      ? userInfos.value[0][0].civilStatus
      : "";
    gender = userInfos.value[0][0].gender ? userInfos.value[0][0].gender : "";
    email = userInfos.value[0][0].email ? userInfos.value[0][0].email : "";
    phone = userInfos.value[0][0].phone ? userInfos.value[0][0].phone : "";
    streetName = userInfos.value[0][0].streetName
      ? userInfos.value[0][0].streetName
      : "";
    streetNumber = userInfos.value[0][0].streetNumber
      ? userInfos.value[0][0].streetNumber
      : "";
    districtNumber = userInfos.value[0][0].districtNumber
      ? userInfos.value[0][0].districtNumber
      : "";

    city = userInfos.value[0][0].city ? userInfos.value[0][0].city : "";
    hobbies = userInfos.value[0][0].hobbies
      ? userInfos.value[0][0].hobbies
      : "";
  }

  const date_city = moment().format("DD.MM.YYYY, ") + city;
  const streetPlusNumber = streetName + " " + streetNumber;
  const districtPlusCity = districtNumber + " " + city;
  let fullName = "";
  const sections = [];

  sections.push({
    properties: {},
    children: [
      new Paragraph({
        text: " ",
        style: "normal",
      }),
    ],
  });
  if (titleBefore == "") {
    fullName = firstName + " " + secondName + " " + titleAfter;
  } else {
    fullName =
      titleBefore + " " + firstName + " " + secondName + " " + titleAfter;
  }

  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "h1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "helvetica",
            size: 44,
            bold: true,
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 60,
            },
          },
        },
        {
          id: "h2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "helvetica",
            size: 28,
            bold: true,
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 60,
            },
          },
        },
        {
          id: "paragraph",
          name: "Paragraph",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "helvetica",
            size: 24,
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 60,
            },
          },
        },
        {
          id: "normal",
          name: "Normal",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "helvetica",
            size: 24,
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 0,
            },
          },
        },
      ],
    },
    sections,
  });
  const mimeType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  const fileName = "motivationLetter.docx";
  const docblob = Packer.toBlob(doc).then((blob) => {
    const docblob = blob.slice(0, blob.size, mimeType);
    return docblob;
  });
  return docblob;
}
