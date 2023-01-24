<template>
  <div class="flex">
    <button type="button" @click="saveModal" class="p-4">
      <BackIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></BackIcon>
    </button>
    <p class="text-black px-0 dark:text-white font-Montserrat text-xl p-4">
      Motivationsschreiben
    </p>
  </div>
  <div class="space-y-1">
    <p class="text-black px-0 dark:text-white font-Montserrat text-sm">
      Einstieg
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-0 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
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
          <button type="button" @click="subjectEdit()" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-0 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
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
          <button type="button" @click="salutationBeginningEdit()" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-1">
    <p class="text-black px-0 dark:text-white font-Montserrat text-sm">
      Motivationsschreiben
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-0 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
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

          <button type="button" @click="textfieldEdit()" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-0 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
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
          <button type="button" @click="endingEdit()" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-1">
    <p class="text-black px-0 dark:text-white font-Montserrat text-sm">
      Abschluss-Grußformel
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-0 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
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
          <button type="button" @click="salutationEndingEdit()" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
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
          :lastIndex="lastindex"
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
import EditTextModal from "@/components/Modals/EditTextModal.vue";
import {
  slideDown,
  sideBack,
  sideBackBack,
  currentSubject,
  currentSalutationBeginning,
  currentTextField,
  currentEnding,
  currentSalutationEnding,
} from "@/store.js";
import { update } from "lodash";
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
const motivation = [
  {
    indexMV: "1",
    subject: "Bewerbung Bewerbung",
    salutationBeginning: "Sehr geehrte Frau/Herr",
    textfield: "Mit großen Interesse habe ich Ihre Anzeige im...",
    ending: "Ich freue mich Ihnen bei einem persönlichen...",
    salutationEnding: "Mit freundlichen Grüßen ...",
  },
];
if (!localStorage.getItem("motivations")) {
  localStorage.setItem("motivations", JSON.stringify([motivation]));
}
const motivations = ref(JSON.parse(localStorage.getItem("motivations")));

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
let isEdited = false;
const indexOfMVid = ref(0);

const MAX_MV_PREVIEW = 5;
const lastindex = ref(0);

onMounted(() => {
  lastindex.value = getLastIndex();
  indexOfMVid.value = getIndexOfMVid();
  motivations.value = JSON.parse(localStorage.getItem("motivations"));
  updateForm();
  buttonDisabled = false;
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

const saveToMVForm = () => {
  motivations.value[indexOfMVid.value][0].subject = subject.value;
  motivations.value[indexOfMVid.value][0].salutationBeginning =
    salutationBeginning.value;
  motivations.value[indexOfMVid.value][0].textfield = textfield.value;
  motivations.value[indexOfMVid.value][0].ending = ending.value;
  motivations.value[indexOfMVid.value][0].salutationEnding =
    salutationEnding.value;
  localStorage.setItem("motivations", JSON.stringify(motivations.value));
};

const getNextIndexMV = () => {
  let index = 0;
  if (lastindex.value <= 0) {
    index = 1;
  } else {
    index = motivations.value[lastindex.value][0].indexMV;
    index++;
  }
  return index;
};

const getLastIndex = () => {
  const tempMotivations = JSON.parse(localStorage.getItem("motivations"));
  let index = tempMotivations.length - 1;
  if (index <= 0) {
    index = 0;
  }
  return index;
};

const createNewMotivation = () => {
  const index = getNextIndexMV();
  const applications = ref(JSON.parse(localStorage.getItem("applications")));

  const motivation = [
    {
      indexMV: index,
      subject: subject.value,
      salutationBeginning: salutationBeginning.value,
      textfield: textfield.value,
      ending: ending.value,
      salutationEnding: salutationEnding.value,
    },
  ];
  if (localStorage.getItem("motivations")) {
    const tempMotivations = JSON.parse(localStorage.getItem("motivations"));
    const newData = [...tempMotivations, motivation];
    const cvlength = applications.value[0].length;
    if (lastindex.value > cvlength) {
      if (lastindex.value > MAX_MV_PREVIEW) {
        const deleteCount = lastindex.value - MAX_MV_PREVIEW;
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
  motivations.value = JSON.parse(localStorage.getItem("motivations"));
};

const updateForm = () => {
  if (isEdited) {
    subject.value = currentSubject.value;
    salutationBeginning.value = currentSalutationBeginning.value;
    textfield.value = currentTextField.value;
    ending.value = currentEnding.value;
    salutationEnding.value = currentSalutationEnding.value;
  } else if (indexOfMVid.value >= 0) {
    subject.value = motivations.value[indexOfMVid.value][0].subject;
    salutationBeginning.value =
      motivations.value[indexOfMVid.value][0].salutationBeginning;
    textfield.value = motivations.value[indexOfMVid.value][0].textfield;
    ending.value = motivations.value[indexOfMVid.value][0].ending;
    salutationEnding.value =
      motivations.value[indexOfMVid.value][0].salutationEnding;
  } else {
    subject.value = "";
    salutationBeginning.value = "";
    textfield.value = "";
    ending.value = "";
    salutationEnding.value = "";

    currentSubject.value = "";
    currentSalutationBeginning.value = "";
    currentTextField.value = "";
    currentEnding.value = "";
    currentSalutationEnding.value = "";
  }
};
const getIndexOfMVid = () => {
  if (localStorage.getItem("motivations")) {
    if (lastindex.value >= 0) {
      for (let i = 0; i <= lastindex.value; i++) {
        if (motivations.value[i][0].indexMV == props.currentApplMVid) {
          return i;
        }
      }
    }
  }
  return -1;
};

const storeFormData = () => {
  if (localStorage.getItem("motivations")) {
    currentSubject.value = subject.value;
    currentSalutationBeginning.value = salutationBeginning.value;
    currentTextField.value = textfield.value;
    currentEnding.value = ending.value;
    currentSalutationEnding.value = salutationEnding.value;
  }
};

const initSlides = () => {
  for (let i = 0; i < lastindex.value; i++) {
    addAfter();
  }
};

const closeModal = () => {
  buttonDisabled = true;
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
};

const salutationBeginningEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 1;
  isEdited = true;
};

const textfieldEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 2;
  isEdited = true;
};
const endingEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 3;
  isEdited = true;
};
const salutationEndingEdit = () => {
  storeFormData();
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 4;
  isEdited = true;
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
