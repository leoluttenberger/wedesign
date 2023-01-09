<template>
  <div class="flex">
    <button type="button" @click="closeModal" class="p-4">
      <BackIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></BackIcon>
    </button>
    <p class="text-black px-1 dark:text-white font-Montserrat text-xl p-4">
      Motivationsschreiben
    </p>
    <button type="button" @click="saveModal" class="p-4">
      <CheckIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></CheckIcon>
    </button>
  </div>
  <div class="space-y-1">
    <p class="text-black px-1 dark:text-white font-Montserrat text-sm">
      Einstieg
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Betreff:
          </p>
          <div class="py-2">
            <FormKit
              v-model="subject"
              type="textarea"
              placeholder="Bewerbung Beruf"
            />
          </div>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Anrede:
          </p>
          <div class="py-2">
            <FormKit
              v-model="salutationBeginning"
              type="textarea"
              placeholder="Sehr geehrte Frau/Herr"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-1">
    <p class="text-black px-1 dark:text-white font-Montserrat text-sm">
      Motivationsschreiben
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Text:
          </p>
          <div class="py-2">
            <FormKit
              v-model="textfield"
              type="textarea"
              placeholder="Mit großen Interesse habe ich Ihre Anzeige im..."
            />
          </div>

          <button type="button" @click="textfieldEdit" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Abschluss:
          </p>
          <div class="py-2">
            <FormKit
              v-model="ending"
              type="textarea"
              placeholder="Ich freue mich Ihnen bei einem persönlichen..."
            />
          </div>
          <button type="button" @click="endingEdit" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-1">
    <p class="text-black px-1 dark:text-white font-Montserrat text-sm">
      Abschluss-Grußformel
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Grußformel:
          </p>
          <div class="py-2">
            <FormKit
              v-model="salutationEnding"
              type="textarea"
              placeholder="Mit freundlichen Grüßen ..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <BottomCard v-model:open="showBottomSlide">
      <SwiperCard :items="items" v-slot="slotProps">
        <component
          :is="mapEditModals[buttonIndex]"
          :itemIndex="slotProps.itemIndex"
        />
      </SwiperCard>
    </BottomCard>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import BottomCard from "@/components/BottomCard.vue";
import EndingEditModal from "@/components/Modals/EndingEditModal.vue";
import TextfieldEditModal from "@/components/Modals/TextfieldEditModal.vue";
import {
  slideDown,
  sideBack,
  sideBackBack,
  currentTextField,
  currentEnding,
} from "@/store.js";

const props = defineProps({
  currentIndex: {
    type: Number,
    default: 0,
  },
});

interface SlideItem {
  id: string;
  index: number;
  text: string;
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
const textfield = ref(null);
const ending = ref(null);
const salutationEnding = ref(null);

const showBottomSlide = ref(false);
let buttonIndex = 0;
let buttonDisabled = false;

const mapEditModals = [TextfieldEditModal, EndingEditModal];

if (!localStorage.getItem("motivations")) {
  console.log("Empty");
  const defaulfMotivation = [
    {
      indexMV: 1,
      subject: "Bewerbung Beruf",
      salutationBeginning: "Sehr geehrte Frau/Herr",
      textfield: "Mit großen Interesse habe ich Ihre Anzeige im...",
      ending: "Ich freue mich Ihnen bei einem persönlichen...",
      salutationEnding: "Mit freundlichen Grüßen ...",
    },
  ];
  localStorage.setItem("motivations", JSON.stringify([defaulfMotivation]));
  console.log("Default motivation letter added!");
}

const MAX_MV_PREVIEW = 5;

onMounted(() => {
  currentEnding.value = "";
  currentTextField.value = "";
  console.log("motivation mounted");
  const applications = ref(JSON.parse(localStorage.getItem("applications")));
  console.log("application mv:", applications.value[props.currentIndex][0].mv);
  if (applications.value[props.currentIndex][0].mv == 0) {
    console.log("currentindex:", props.currentIndex);
    createNewMotivation();
  } else {
    currentEnding.value = "";
    currentTextField.value = "";
    updateForm();
  }
  initSlides();
  buttonDisabled = false;
  sideBackBack.value = false;
  sideBack.value = true;
  slideDown.value = false;
  showBottomSlide.value = false;
  buttonIndex = 0;
});

watch(slideDown, () => {
  if (sideBackBack.value == false) {
    showBottomSlide.value = false;
    updateForm();
    console.log("Updated tiptap");
    buttonIndex = 0;
  }
});
watch(sideBackBack, () => {
  if (sideBackBack.value == false) {
    showBottomSlide.value = false;
    updateForm();
    console.log("Updated tiptap");
    buttonIndex = 0;
  }
});

const saveMVToApplication = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  const applications = ref(JSON.parse(localStorage.getItem("applications")));
  let lastIndex = getLastIndex();
  if (applications.value[props.currentIndex][0].mv == 0) {
    applications.value[props.currentIndex][0].mv =
      motivations.value[lastIndex][0].indexMV;
    localStorage.setItem("applications", JSON.stringify(applications.value));
  } else {
    console.log("Error saving MV to application!");
  }
};

const getNextIndexMV = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  let lastIndex = getLastIndex();
  let index = 0;
  if (lastIndex < 0) {
    lastIndex = 0;
    index = 1;
  } else {
    index = motivations.value[lastIndex][0].indexMV;
    index++;
  }
  console.log("lastINdex:", lastIndex);
  console.log("motivation last index", motivations.value[lastIndex][0].indexMV);
  console.log("indexMV", index);
  return index;
};

const getLastIndex = () => {
  const tempMotivations = JSON.parse(localStorage.getItem("motivations"));
  let lastIndex = tempMotivations.length - 1;
  if (lastIndex <= 0) {
    lastIndex = 0;
  }
  return lastIndex;
};

const createNewMotivation = () => {
  const index = getNextIndexMV();
  console.log("nextindexMV:", index);
  const motivation = [
    {
      indexMV: index,
      subject: "Bewerbung Beruf",
      salutationBeginning: "Sehr geehrte Frau/Herr",
      textfield: "Mit großen Interesse habe ich Ihre Anzeige im...",
      ending: "Ich freue mich Ihnen bei einem persönlichen...",
      salutationEnding: "Mit freundlichen Grüßen ...",
    },
  ];
  const tempMotivations = JSON.parse(localStorage.getItem("motivations"));
  const newData = [...tempMotivations, motivation];
  const indexCal = tempMotivations.length - 1;
  console.log("indexCal:", indexCal);
  const applications = JSON.parse(localStorage.getItem("applications"));

  const cvlength = applications.length;
  console.log(cvlength);
  if (cvlength > 0) {
    if (indexCal > cvlength) {
      if (indexCal > MAX_MV_PREVIEW) {
        const deleteCount = indexCal - MAX_MV_PREVIEW;
        newData.splice(0, deleteCount);
        console.log("Splice newData");
      }
    }
    console.log(newData);
    console.log("New motivation letter added!");
    localStorage.setItem("motivations", JSON.stringify(newData));
  }
};

const updateForm = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  const indexOfID = getIndexOfMVid();
  subject.value = motivations.value[indexOfID][0].subject;
  salutationBeginning.value =
    motivations.value[indexOfID][0].salutationBeginning;
  salutationEnding.value = motivations.value[indexOfID][0].salutationEnding;
  ending.value = motivations.value[indexOfID][0].ending;
  textfield.value = motivations.value[indexOfID][0].textfield;
  if (currentEnding.value != "") {
    ending.value = currentEnding.value;
    console.log("udpated ending");
  }
  if (currentTextField.value != "") {
    textfield.value = currentTextField.value;
    console.log("udpated Text field");
  }
};

const getIndexOfMVid = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  const applications = ref(JSON.parse(localStorage.getItem("applications")));
  console.log("application mv:", applications.value[props.currentIndex][0].mv);
  let lastIndex = getLastIndex();
  let indexOfId = 0;
  if (lastIndex > 0) {
    for (let i = 0; i <= lastIndex; i++) {
      if (
        motivations.value[i][0].indexMV ==
        applications.value[props.currentIndex][0].mv
      ) {
        indexOfId = i;
        console.log("indexOfId", indexOfId);
        return indexOfId;
      }
    }
  }
  return 0;
};

const storeFormData = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  const indexOfID = getIndexOfMVid();
  motivations.value[indexOfID][0].subject = subject.value;
  motivations.value[indexOfID][0].salutationBeginning =
    salutationBeginning.value;
  motivations.value[indexOfID][0].textfield = textfield.value;
  motivations.value[indexOfID][0].ending = ending.value;
  motivations.value[indexOfID][0].salutationEnding = salutationEnding;
  localStorage.setItem("motivations", JSON.stringify(motivations.value));
  console.log(motivations.value);
};

const initSlides = () => {
  let lastIndex = getLastIndex();
  for (let i = 0; i < lastIndex; i++) {
    addAfter();
  }
};

const closeModal = () => {
  buttonDisabled = true;
  sideBack.value = false;
};

const saveModal = () => {
  saveMVToApplication();
  storeFormData();
  buttonDisabled = true;
  sideBack.value = false;
};

const textfieldEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 0;
};
const endingEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 1;
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
