<template>
  <div class="w-screen h-screen">
    <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
      <button type="button" @click="closeModal()" class="p-4">
        <CloseIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></CloseIcon>
      </button>
      <p
        class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
      >
        Motivationsschreiben speichern!
      </p>
      <button type="button" @click="saveModal()" class="p-4">
        <CheckIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></CheckIcon>
      </button>
    </div>

    <div class="space-y-1">
      <p
        class="text-black p-2 dark:text-white font-Montserrat text-sm font-bold"
      >
        Einstieg
      </p>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="p-2 px-2 w-32 h-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
            >
              Betreff:
            </p>
            <div class="p-2">
              <FormKit
                v-model="subject"
                type="textarea"
                placeholder="Bewerbung Beruf"
              />
            </div>
            <button type="button" @click="subjectEdit()" class="p-4">
              <EditIcon
                class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
              ></EditIcon>
            </button>
          </div>
        </div>

        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="p-2 px-2 w-32 h-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
            >
              Anrede:
            </p>
            <div class="p-2">
              <FormKit
                v-model="salutationBeginning"
                type="textarea"
                placeholder="Sehr geehrte Frau/Herr"
              />
            </div>
            <button
              type="button"
              @click="salutationBeginningEdit()"
              class="p-4"
            >
              <EditIcon
                class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
              ></EditIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-1">
      <p
        class="text-black p-2 dark:text-white font-Montserrat text-sm font-bold"
      >
        Hauptteil:
      </p>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="p-2 px-2 w-32 h-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
            >
              Einleitung:
            </p>
            <div class="p-2">
              <FormKit
                v-model="textBegining"
                type="textarea"
                placeholder="Mit großem Interesse habe ich Ihre Anzeige gelesen."
              />
            </div>

            <button type="button" @click="textBeginingEdit()" class="p-4">
              <EditIcon
                class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
              ></EditIcon>
            </button>
          </div>
        </div>

        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="p-2 px-2 w-32 h-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
            >
              Werdegang:
            </p>
            <div class="py-2">
              <FormKit
                v-model="textExperience"
                type="textarea"
                placeholder="Die Berufsausbildung zum KFZ-Mechaniker habe ich im Jahr 2020 erfolgreich bei der Musterfirma abgeschlossen..."
              />
            </div>
            <button type="button" @click="textExperienceEdit()" class="p-4">
              <EditIcon
                class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
              ></EditIcon>
            </button>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="p-2 px-2 w-32 h-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
            >
              Kompetenzen:
            </p>
            <div class="p-2">
              <FormKit
                v-model="textCompetence"
                type="textarea"
                placeholder="Ich kann mit stressigen Situationen sehr gut umgehen..."
              />
            </div>
            <button type="button" @click="textCompetenceEdit()" class="p-4">
              <EditIcon
                class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
              ></EditIcon>
            </button>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="p-2 px-2 w-32 h-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
            >
              Beitrag:
            </p>
            <div class="p-2">
              <FormKit
                v-model="textContribution"
                type="textarea"
                placeholder="In Ihrem Unternehmen möchte ich mein handwerkliches Geschick einbringen..."
              />
            </div>
            <button type="button" @click="textContributionEdit()" class="p-4">
              <EditIcon
                class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
              ></EditIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-1">
      <p class="text-black px-2 dark:text-white font-Montserrat text-sm">
        Schlussteil:
      </p>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="p-2 px-2 w-32 h-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
            >
              Abschluss:
            </p>
            <div class="p-2">
              <FormKit
                v-model="ending"
                type="textarea"
                placeholder="Für offene Fragen zu meiner Bewerbung stehe ich Ihnen jederzeit zur Verfügung..."
              />
            </div>
            <button type="button" @click="endingEdit()" class="p-4">
              <EditIcon
                class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
              ></EditIcon>
            </button>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="p-2 px-2 w-32 h-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
            >
              Abschied:
            </p>
            <div class="p-2">
              <FormKit
                v-model="salutationEnding"
                type="textarea"
                placeholder="Mit freundlichen Grüßen ..."
              />
            </div>
            <button type="button" @click="salutationEndingEdit()" class="p-4">
              <EditIcon
                class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
              ></EditIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <BottomCard v-model:open="showBottomSlide">
      <SwiperCard :items="items" v-slot="slotProps">
        <component
          :is="EditTextModal"
          :itemIndex="slotProps.itemIndex"
          :buttonIndex="buttonIndex"
          :indexOfMVid="indexOfMVid"
          :textLabel="textLabel"
        />
      </SwiperCard>
    </BottomCard>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue";
import {
  slideDown,
  sideBack,
  sideBackBack,
  currentSubject,
  currentSalutationBeginning,
  currentEnding,
  currentSalutationEnding,
  currentTextBegining,
  currentTextExperience,
  currentTextContribution,
  currentTextCompetence,
} from "@/store/store.js";

import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";

import BottomCard from "@/components/MenuModals/BottomCard.vue";
import EditTextModal from "@/components/MenuModals/EditTextModal.vue";

const props = defineProps({
  currentApplIndex: {
    type: Number,
    default: 0,
  },
  currentApplMVid: {
    type: Number,
    default: 0,
  },
});

interface SlideItem {
  id: string;
  index: number;
  text: string;
}
const defaultData = [
  {
    indexMV: "1",
    subject: "Bewerbung als ...",
    salutationBeginning: " Sehr geehrte/r Frau/Herr... Musterfrau, ",
    textBegining:
      "mit großem Interesse habe ich in der Zeitung / auf der Website gelesen, dass Sie eine/n Mustermitarbeiter/in suchen. Ich möchte hiermit meine Chance nutzen, um mich Ihnen vorzustellen.",
    textExperience:
      "Wie Sie den beigefügten Unterlagen entnehmen können, bringe ich die erforderlichen fachlichen Qualifikationen für die ausgeschriebene Stelle mit. Nach dem erfolgreichen Abschluss meiner Musterausbildung an der Musterschule im Jahr JJJJ war ich mehrere Jahre als Mustermitarbeiter/in tätig. Zu meinen Aufgaben gehörten vor allem Aufzählen der wichtigsten Aufgaben.",
    textCompetence:
      "Bei meiner bisherigen beruflichen Tätigkeit zählte ein hohes Maß an Lernbereitschaft ebenso zu meinen Stärken wie Teamfähigkeit und Problemlösungsfähigkeit . Diese Kompetenzen konnte ich vor allem bei der Umsetzung von Projekten unter Beweis stellen. Während meiner beruflichen Laufbahn / Ausbildung /... habe ich äußerst fundierte Kenntnisse bezüglich Daten- und Texterfassung , telefonische Beratung und Interviewführung erworben. Besonders möchte ich meine Kompetenzen und Erfahrungen auf dem Gebiet Verfassen von Texten hervorheben, die ich in meine zukünftige Arbeitsstelle mitbringe.",
    textContribution:
      "Da Ihre Stellenbeschreibung meinen Fähigkeiten und Kenntnissen entspricht , bin ich davon überzeugt, für diesen Beruf bestens geeignet zu sein.",
    ending:
      "Ich freue mich darauf, mich bald in einem persönlichen Gespräch vorzustellen und mehr über die Position zu erfahren.",
    salutationEnding: " Mit freundlichen Grüßen",
  },
];

const motivation1 = [
  {
    indexMV: "2",
    subject: "Bewerbung als Bäcker",
    salutationBeginning: "Sehr geehrte Frau/Herr",
    textBegining: "Mit großem Interesse habe ich Ihre Anzeige gelesen.",
    textExperience:
      "Die Berufsausbildung zum Bäcker habe ich im Jahr 2020 erfolgreich bei der Musterfirma abgeschlossen...",
    textCompetence: "Ich kann mit stressigen Situationen sehr gut umgehen...",
    textContribution:
      "In Ihrem Unternehmen möchte ich meine Backkünste einbringen...",
    ending:
      "Für offene Fragen zu meiner Bewerbung stehe ich Ihnen jederzeit zur Verfügung...",
    salutationEnding: "Mit freundlichen Grüßen ...",
  },
];
const motivation2 = [
  {
    indexMV: "3",
    subject: "Bewerbung als Verkäufer",
    salutationBeginning: "Sehr geehrte Frau/Herr",
    textBegining: "Mit großem Interesse habe ich Ihre Anzeige gelesen.",
    textExperience:
      "Die Berufsausbildung zum Bäcker habe ich im Jahr 2020 erfolgreich bei der Musterfirma abgeschlossen...",
    textCompetence: "Ich kann mit stressigen Situationen sehr gut umgehen...",
    textContribution:
      "In Ihrem Unternehmen möchte ich mein verkäuferisches Geschick einbringen...",
    ending:
      "Für offene Fragen zu meiner Bewerbung stehe ich Ihnen jederzeit zur Verfügung...",
    salutationEnding: "Mit freundlichen Grüßen ...",
  },
];

if (!localStorage.getItem("motivations")) {
  localStorage.setItem("motivations", JSON.stringify([defaultData]));
  const tempMotivations = JSON.parse(localStorage.getItem("motivations"));
  const newData = [...tempMotivations, motivation1, motivation2];
  localStorage.setItem("motivations", JSON.stringify(newData));
}
let idCounter = 0;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
let negIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;
const getNegIndex = () => negIndexCounter--;
const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

const subject = ref(null);
const salutationBeginning = ref(null);
const textBegining = ref(null);
const textExperience = ref(null);
const textCompetence = ref(null);
const textContribution = ref(null);
const ending = ref(null);
const salutationEnding = ref(null);

const showBottomSlide = ref(false);
let buttonIndex = 0;
let isEdited = false;
const indexOfMVid = ref(0);

const MAX_MV_PREVIEW = 5;
const lastIndex = ref(0);

let textLabel = "";

onMounted(() => {
  setLastAndMVIndex();
  updateForm();
  sideBackBack.value = false;
  sideBack.value = true;
  slideDown.value = false;
  showBottomSlide.value = false;
  initSlides();
});

watch(slideDown, () => {
  if (sideBackBack.value == false) {
    showBottomSlide.value = false;
    updateForm();
  }
});
watch(sideBackBack, () => {
  if (sideBackBack.value == false) {
    showBottomSlide.value = false;
    updateForm();
  }
});

const setLastAndMVIndex = () => {
  if (localStorage.getItem("motivations")) {
    const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
    lastIndex.value = motivations.value.length;
    lastIndex.value--;
    if (lastIndex.value < 0) {
      console.log("Error last index negative!");
    } else {
      for (let i = 0; i <= lastIndex.value; i++) {
        if (motivations.value[i][0].subject == props.currentApplMVid) {
          indexOfMVid.value = i;
          break;
        }
      }
    }
  } else {
    lastIndex.value = 0;
    indexOfMVid.value = 0;
    console.log("Error default motivations are not set!");
  }
};

const saveToMVForm = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  motivations.value[indexOfMVid.value][0].subject = subject.value;
  motivations.value[indexOfMVid.value][0].salutationBeginning =
    salutationBeginning.value;
  motivations.value[indexOfMVid.value][0].textBegining = textBegining.value;
  motivations.value[indexOfMVid.value][0].textExperience = textExperience.value;
  motivations.value[indexOfMVid.value][0].textContribution =
    textContribution.value;
  motivations.value[indexOfMVid.value][0].textCompetence = textCompetence.value;
  motivations.value[indexOfMVid.value][0].ending = ending.value;
  motivations.value[indexOfMVid.value][0].salutationEnding =
    salutationEnding.value;
  localStorage.setItem("motivations", JSON.stringify(motivations.value));
};

const createNewMotivation = () => {
  const applications = ref(JSON.parse(localStorage.getItem("applications")));
  const index = indexOfMVid.value + 1;
  const motivation = [
    {
      indexMV: index,
      subject: subject.value,
      salutationBeginning: salutationBeginning.value,
      textBegining: textBegining.value,
      textExperience: textExperience.value,
      textContribution: textContribution.value,
      textCompetence: textCompetence.value,
      ending: ending.value,
      salutationEnding: salutationEnding.value,
    },
  ];
  if (localStorage.getItem("motivations")) {
    const tempMotivations = JSON.parse(localStorage.getItem("motivations"));
    const newData = [...tempMotivations, motivation];
    const cvlength = applications.value[0].length;
    if (lastIndex.value > cvlength) {
      if (lastIndex.value > MAX_MV_PREVIEW) {
        const deleteCount = lastIndex.value - MAX_MV_PREVIEW;
        newData.splice(0, deleteCount);
        console.log("Splice newData");
      }
    }

    console.log("New motivation letter added!");
    localStorage.setItem("motivations", JSON.stringify(newData));
  } else {
    localStorage.setItem("motivations", JSON.stringify([motivation]));
  }

  applications.value[props.currentApplIndex][0].mv = index;
  localStorage.setItem("applications", JSON.stringify(applications.value));
};

const updateForm = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));

  if (isEdited) {
    subject.value = currentSubject.value;
    salutationBeginning.value = currentSalutationBeginning.value;
    textBegining.value = currentTextBegining.value;
    textExperience.value = currentTextExperience.value;
    textContribution.value = currentTextContribution.value;
    textCompetence.value = currentTextCompetence.value;
    ending.value = currentEnding.value;
    salutationEnding.value = currentSalutationEnding.value;
  } else if (indexOfMVid.value >= 0) {
    subject.value = motivations.value[indexOfMVid.value][0].subject;
    salutationBeginning.value =
      motivations.value[indexOfMVid.value][0].salutationBeginning;
    textBegining.value = motivations.value[indexOfMVid.value][0].textBegining;
    textExperience.value =
      motivations.value[indexOfMVid.value][0].textExperience;
    textContribution.value =
      motivations.value[indexOfMVid.value][0].textContribution;
    textCompetence.value =
      motivations.value[indexOfMVid.value][0].textCompetence;
    ending.value = motivations.value[indexOfMVid.value][0].ending;
    salutationEnding.value =
      motivations.value[indexOfMVid.value][0].salutationEnding;
  } else {
    subject.value = "";
    salutationBeginning.value = "";
    textBegining.value = "";
    textExperience.value = "";
    textContribution.value = "";
    textCompetence.value = "";
    ending.value = "";
    salutationEnding.value = "";

    currentSubject.value = "";
    currentSalutationBeginning.value = "";
    currentTextBegining.value = "";
    currentTextExperience.value = "";
    currentTextContribution.value = "";
    currentTextCompetence.value = "";
    currentEnding.value = "";
    currentSalutationEnding.value = "";
  }
};

const storeFormData = () => {
  if (localStorage.getItem("motivations")) {
    currentSubject.value = subject.value;
    currentSalutationBeginning.value = salutationBeginning.value;
    currentTextBegining.value = textBegining.value;
    currentTextExperience.value = textExperience.value;
    currentTextContribution.value = textContribution.value;
    currentTextCompetence.value = textCompetence.value;
    currentEnding.value = ending.value;
    currentSalutationEnding.value = salutationEnding.value;
  }
};

const initSlides = () => {
  for (let i = 0; i <= lastIndex.value; i++) {
    addAfter();
  }
};

const closeModal = () => {
  sideBack.value = false;
  isEdited = false;
};

const saveModal = () => {
  if (props.currentApplMVid == 0) {
    console.log("create mv");
    createNewMotivation();
  } else {
    console.log("save mv");
    saveToMVForm();
  }

  closeModal();
};

const subjectEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 0;
  isEdited = true;
  textLabel = "Betreff ";
};

const salutationBeginningEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 1;
  isEdited = true;
  textLabel = "Anrede ";
};

const textBeginingEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 2;
  isEdited = true;
  textLabel = "Einleitung ";
};

const textExperienceEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 3;
  isEdited = true;
  textLabel = "Werdegang ";
};

const textContributionEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 4;
  isEdited = true;
  textLabel = "Kompetenz ";
};
const textCompetenceEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 5;
  isEdited = true;
  textLabel = "Beitrag ";
};

const endingEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 6;
  isEdited = true;
  textLabel = "Abschluss ";
};
const salutationEndingEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 7;
  isEdited = true;
  textLabel = "Abschied ";
};

const addAfter = () => {
  items.value = [
    ...items.value,
    {
      id: getID(),
      index: getPosIndex(),
      text: "After",
    },
  ];
};
</script>
