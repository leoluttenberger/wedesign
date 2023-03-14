import { saveAs } from "file-saver";
import { Document, Paragraph, HeadingLevel, AlignmentType, Packer } from "docx";
import moment from "moment";
export const createDoc = async (applicationIndex: number, mvIndex: number) => {
  const blob = createDocHandler(applicationIndex, mvIndex);
  return blob;
};
async function createDocHandler(applicationIndex: number, mvIndex: number) {
  // Create the Docx file in memory
  const docxBlob = await createDocx(applicationIndex, mvIndex);
  return docxBlob;
}

async function createDocx(
  applicationIndex: number,
  mvIndex: number
): Promise<Blob> {
  const applications = JSON.parse(localStorage.getItem("applications"));
  const motivations = JSON.parse(localStorage.getItem("motivations"));
  const userInfos = JSON.parse(localStorage.getItem("userInfos"));
  const tempMotivations = JSON.parse(localStorage.getItem("motivations"));

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
    titleBefore = userInfos[0][0].titleBefore
      ? userInfos[0][0].titleBefore
      : "";
    titleAfter = userInfos[0][0].titleAfter ? userInfos[0][0].titleAfter : "";
    firstName = userInfos[0][0].firstName ? userInfos[0][0].firstName : "";
    secondName = userInfos[0][0].secondName ? userInfos[0][0].secondName : "";
    birthDate = userInfos[0][0].birthDate ? userInfos[0][0].birthDate : "";
    birthArea = userInfos[0][0].birthArea ? userInfos[0][0].birthArea : "";
    civilStatus = userInfos[0][0].civilStatus
      ? userInfos[0][0].civilStatus
      : "";
    gender = userInfos[0][0].gender ? userInfos[0][0].gender : "";
    email = userInfos[0][0].email ? userInfos[0][0].email : "";
    phone = userInfos[0][0].phone ? userInfos[0][0].phone : "";
    streetName = userInfos[0][0].streetName ? userInfos[0][0].streetName : "";
    streetNumber = userInfos[0][0].streetNumber
      ? userInfos[0][0].streetNumber
      : "";
    districtNumber = userInfos[0][0].districtNumber
      ? userInfos[0][0].districtNumber
      : "";

    city = userInfos[0][0].city ? userInfos[0][0].city : "";
    hobbies = userInfos[0][0].hobbies ? userInfos[0][0].hobbies : "";
  }

  const date_city = moment().format("DD.MM.YYYY, ") + city;
  const streetPlusNumber = streetName + " " + streetNumber;
  const districtPlusCity = districtNumber + " " + city;
  let fullName = "";
  if (titleBefore == "") {
    fullName = firstName + " " + secondName + " " + titleAfter;
  } else {
    fullName =
      titleBefore + " " + firstName + " " + secondName + " " + titleAfter;
  }

  let lastIndex = tempMotivations.length - 1;
  if (lastIndex <= 0) {
    lastIndex = 0;
  }

  let company = "";
  let contactPerson = "";
  let applStreetName = "";
  let applStreetNumber = "";
  let applDistrict = "";
  let applCity = "";
  let job = "";

  if (localStorage.getItem("applications")) {
    company = applications[applicationIndex][0].company
      ? applications[applicationIndex][0].company
      : "";
    contactPerson = applications[applicationIndex][0].contactPerson
      ? applications[applicationIndex][0].contactPerson
      : "";
    applStreetName = applications[applicationIndex][0].streetName
      ? applications[applicationIndex][0].streetName
      : "";
    applStreetNumber = applications[applicationIndex][0].streetNumber
      ? applications[applicationIndex][0].streetNumber
      : "";
    applDistrict = applications[applicationIndex][0].districtNumber
      ? applications[applicationIndex][0].districtNumber
      : "";
    applCity = applications[applicationIndex][0].city
      ? applications[applicationIndex][0].city
      : "";
    job = applications[applicationIndex][0].job
      ? applications[applicationIndex][0].job
      : "";
  }

  const applStreetNameNumber = applStreetName + " " + applStreetNumber;
  const applDistrictplusCity = applDistrict + " " + applCity;
  const toContactPerson = "zH. " + contactPerson;

  let subject = "";
  let salutationBeginning = "";
  let textBegining = "";
  let textExperience = "";
  let textContribution = "";
  let textCompetence = "";
  let ending = "";
  let salutationEnding = "";
  if (localStorage.getItem("motivations")) {
    subject = motivations[mvIndex][0].subject
      ? motivations[mvIndex][0].subject
      : "";
    salutationBeginning = motivations[mvIndex][0].salutationBeginning
      ? motivations[mvIndex][0].salutationBeginning
      : "";
    textBegining = motivations[mvIndex][0].textBegining
      ? motivations[mvIndex][0].textBegining
      : "";
    textExperience = motivations[mvIndex][0].textExperience
      ? motivations[mvIndex][0].textExperience
      : "";
    textContribution = motivations[mvIndex][0].textContribution
      ? motivations[mvIndex][0].textContribution
      : "";
    textCompetence = motivations[mvIndex][0].textCompetence
      ? motivations[mvIndex][0].textCompetence
      : "";
    ending = motivations[mvIndex][0].ending
      ? motivations[mvIndex][0].endin
      : "";
    salutationEnding = motivations[mvIndex][0].salutationEnding
      ? motivations[mvIndex][0].salutationEnding
      : "";
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
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: fullName,
            heading: HeadingLevel.HEADING_2,
            style: "h2",
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: streetPlusNumber,
            style: "normal",
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: districtPlusCity,
            style: "normal",
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: phone,
            style: "normal",
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: email,
            style: "normal",
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: company,
            heading: HeadingLevel.HEADING_2,
            style: "h2",
          }),
          new Paragraph({
            text: toContactPerson,
            style: "normal",
          }),
          new Paragraph({
            text: applStreetNameNumber,
            style: "normal",
          }),
          new Paragraph({
            text: applDistrictplusCity,
            style: "normal",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: date_city,
            style: "normal",
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: subject,
            heading: HeadingLevel.HEADING_1,
            style: "h1",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: salutationBeginning,
            style: "paragraph",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: textBegining,
            style: "paragraph",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: textExperience,
            style: "paragraph",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: textContribution,
            style: "paragraph",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: textCompetence,
            style: "paragraph",
          }),
          new Paragraph({
            text: ending,
            style: "paragraph",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: salutationEnding,
            style: "paragraph",
          }),
          new Paragraph({
            text: " ",
            style: "normal",
          }),
          new Paragraph({
            text: fullName,
            heading: HeadingLevel.HEADING_2,
            style: "h2",
          }),
        ],
      },
    ],
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
