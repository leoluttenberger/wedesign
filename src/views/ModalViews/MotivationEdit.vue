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
import { slideDown, sideBack, sideBackBack } from "@/store.js";

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

let __indexMV = 0;
const subject = ref(null);
const salutationBeginning = ref(null);
const textfield = ref(null);
const ending = ref(null);
const salutationEnding = ref(null);

const showBottomSlide = ref(false);
let buttonIndex = 0;
let buttonDisabled = false;

const mapEditModals = [TextfieldEditModal, EndingEditModal];

onMounted(() => {
  console.log("motivation mounted");
  const motivation = [
    {
      indexMV: 0,
      subject: "",
      salutationBeginning: "",
      textfield: "Mit großen Interesse habe ich Ihre Anzeige im...",
      ending: "Ich freue mich Ihnen bei einem persönlichen...",
      salutationEnding: "",
    },
  ];
  if (!localStorage.getItem("motivations")) {
    console.log("Empty");
    localStorage.setItem("motivations", JSON.stringify([motivation]));
  } else {
    const currentmotivations = JSON.parse(localStorage.getItem("motivations"));
    const newData = [...currentmotivations, motivation];
    console.log(currentmotivations.length);
    if (currentmotivations.length >= 5) {
      newData.splice(0, 1);
    }
    console.log(newData);
    localStorage.setItem("motivations", JSON.stringify(newData));
  }

  buttonDisabled = false;
  sideBackBack.value = false;
  sideBack.value = true;
  slideDown.value = false;
  showBottomSlide.value = false;
  buttonIndex = 0;
  updateForm();
  initSlides();
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

const updateForm = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  let lastIndex = motivations.value.length - 1;
  if (lastIndex <= 0) {
    lastIndex = 0;
    __indexMV = 0;
  } else {
    __indexMV = motivations.value[lastIndex - 1][0].indexMV + 1;
  }
  subject.value = motivations.value[lastIndex][0].subject;
  salutationBeginning.value =
    motivations.value[lastIndex][0].salutationBeginning;
  textfield.value = motivations.value[lastIndex][0].textfield;
  ending.value = motivations.value[lastIndex][0].ending;
  salutationEnding.value = motivations.value[lastIndex][0].salutationEnding;
};

const storeFormData = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  let lastIndex = motivations.value.length - 1;
  motivations.value[lastIndex][0].subject = subject.value;
  motivations.value[lastIndex][0].salutationBeginning =
    salutationBeginning.value;
  motivations.value[lastIndex][0].textfield = textfield.value;
  motivations.value[lastIndex][0].ending = ending.value;
  motivations.value[lastIndex][0].salutatioEnding = salutationEnding;
  localStorage.setItem("motivations", JSON.stringify(motivations.value));
};

const initSlides = () => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  let lastIndex = motivations.value.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    addAfter();
  }
};

const closeModal = () => {
  buttonDisabled = true;
  sideBack.value = false;
};

const saveModal = () => {
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
