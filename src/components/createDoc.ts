import { saveAs } from "file-saver";
import { Document, Paragraph, HeadingLevel, AlignmentType, Packer } from "docx";
import moment from "moment";
export const createDoc = async (applicationIndex) => {
  const applications = JSON.parse(localStorage.getItem("applications"));
  const motivations = JSON.parse(localStorage.getItem("motivations"));
  const userInfos = JSON.parse(localStorage.getItem("userInfos"));

  console.log(applications);
  console.log(applications);
  console.log(motivations);
  console.log(userInfos);

  const currentApplMVid = applications[applicationIndex][0].mv;
  const tempMotivations = JSON.parse(localStorage.getItem("motivations"));

  const titleBefore = userInfos[0][0].titleBefore
    ? userInfos[0][0].titleBefore
    : "";
  const titleAfter = userInfos[0][0].titleAfter
    ? userInfos[0][0].titleAfter
    : "";
  const firstName = userInfos[0][0].firstName ? userInfos[0][0].firstName : "";
  const secondName = userInfos[0][0].secondName
    ? userInfos[0][0].secondName
    : "";
  const birthDate = userInfos[0][0].birthDate ? userInfos[0][0].birthDate : "";
  const birthArea = userInfos[0][0].birthArea ? userInfos[0][0].birthArea : "";
  const civilStatus = userInfos[0][0].civilStatus
    ? userInfos[0][0].civilStatus
    : "";
  const gender = userInfos[0][0].gender ? userInfos[0][0].gender : "";
  const email = userInfos[0][0].email ? userInfos[0][0].email : "";
  const phone = userInfos[0][0].phone ? userInfos[0][0].phone : "";
  const streetName = userInfos[0][0].streetName
    ? userInfos[0][0].streetName
    : "";
  const streetNumber = userInfos[0][0].streetNumber
    ? userInfos[0][0].streetNumber
    : "";
  const districtNumber = userInfos[0][0].districtNumber
    ? userInfos[0][0].districtNumber
    : "";

  const city = userInfos[0][0].city ? userInfos[0][0].city : "";
  const hobbies = userInfos[0][0].hobbies ? userInfos[0][0].hobbies : "";
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
  let mvIndex = 0;
  for (let i = 0; i <= lastIndex; i++) {
    if (motivations[i][0].indexMV == currentApplMVid) {
      mvIndex = i;
    }
  }
  console.log("LastIndes: ", lastIndex);
  console.log("mvIndes: ", mvIndex);

  const company = applications[applicationIndex][0].company
    ? applications[applicationIndex][0].company
    : "";
  const contactPerson = applications[applicationIndex][0].contactPerson
    ? applications[applicationIndex][0].contactPerson
    : "";
  const applStreetName = applications[applicationIndex][0].streetName
    ? applications[applicationIndex][0].streetName
    : "";
  const applStreetNumber = applications[applicationIndex][0].streetNumber
    ? applications[applicationIndex][0].streetNumber
    : "";
  const applDistrict = applications[applicationIndex][0].districtNumber
    ? applications[applicationIndex][0].districtNumber
    : "";
  const applCity = applications[applicationIndex][0].city
    ? applications[applicationIndex][0].city
    : "";

  const job = applications[applicationIndex][0].job
    ? applications[applicationIndex][0].job
    : "";

  const applStreetNameNumber = applStreetName + " " + applStreetNumber;
  const applDistrictplusCity = applDistrict + " " + applCity;
  const toContactPerson = "zH." + contactPerson;

  const subject = motivations[mvIndex][0].subject
    ? motivations[mvIndex][0].subject
    : "";
  const salutationBeginning = motivations[mvIndex][0].salutationBeginning
    ? motivations[mvIndex][0].salutationBeginning
    : "";
  const textBegining = motivations[mvIndex][0].textBegining
    ? motivations[mvIndex][0].textBegining
    : "";
  const textExperience = motivations[mvIndex][0].textExperience
    ? motivations[mvIndex][0].textExperience
    : "";
  const textContribution = motivations[mvIndex][0].textContribution
    ? motivations[mvIndex][0].textContribution
    : "";
  const textCompetence = motivations[mvIndex][0].textCompetence
    ? motivations[mvIndex][0].textCompetence
    : "";
  const ending = motivations[mvIndex][0].ending
    ? motivations[mvIndex][0].endin
    : "";
  const salutationEnding = motivations[mvIndex][0].salutationEnding
    ? motivations[mvIndex][0].salutationEnding
    : "";
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
          id: "h2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 24,
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
          id: "normal",
          name: "Normal",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 22,
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 60,
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
            text: "",
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
            text: "",
            style: "normal",
          }),
          new Paragraph({
            text: date_city,
            style: "normal",
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: "",
            style: "normal",
          }),
          new Paragraph({
            text: subject,
            heading: HeadingLevel.HEADING_1,
            style: "h1",
          }),
          new Paragraph({
            text: "",
            style: "normal",
          }),
          new Paragraph({
            text: salutationBeginning,
            style: "normal",
          }),
          new Paragraph({
            text: "",
            style: "normal",
          }),
          new Paragraph({
            text: textBegining,
            style: "normal",
          }),
          new Paragraph({
            text: "",
            style: "normal",
          }),
          new Paragraph({
            text: textExperience,
            style: "normal",
          }),
          new Paragraph({
            text: "",
            style: "normal",
          }),
          new Paragraph({
            text: textContribution,
            style: "normal",
          }),
          new Paragraph({
            text: "",
            style: "normal",
          }),
          new Paragraph({
            text: textCompetence,
            style: "normal",
          }),
          new Paragraph({
            text: ending,
            style: "normal",
          }),
          new Paragraph({
            text: "",
            style: "normal",
          }),
          new Paragraph({
            text: salutationEnding,
            style: "normal",
          }),
          new Paragraph({
            text: "",
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
  Packer.toBlob(doc).then((blob) => {
    const docblob = blob.slice(0, blob.size, mimeType);
    saveAs(docblob, fileName);
  });
};
