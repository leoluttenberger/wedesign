<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800"
  >
    <div class="flex justify-center p-2">
      <div class="px-20 font-bold">Lebenslauf</div>
      <button v-if="dragButtonVisible">
        <DragIcon
          class="dark:stroke-wd-white stroke-black stroke-1"
          @click="dragToggleActive()"
        ></DragIcon>
      </button>
      <button v-if="!dragButtonVisible">
        <CheckIcon
          class="dark:stroke-wd-white stroke-black stroke-1"
          @click="dragToggleDisabled()"
        ></CheckIcon>
      </button>
    </div>
    <div class="flex justify-evenly">
      <button
        id="button1"
        @click="slideTo(1)"
        :class="
          activeButton1
            ? 'border-wd-green dark:border-wd-green'
            : 'border-white dark:border-slate-800'
        "
        class="outline:none text-xs md:text-base border-b-[3px] font-Montserrat dark:text-white font-bold"
      >
        Über mich
      </button>
      <button
        id="button2"
        @click="slideTo(2)"
        :class="
          activeButton2
            ? 'border-wd-green dark:border-wd-green'
            : 'border-white dark:border-slate-800'
        "
        class="outline:none text-xs md:text-base border-b-[3px] font-Montserrat dark:text-white font-bold"
      >
        Ausbildungen
      </button>
      <button
        id="button3"
        @click="slideTo(3)"
        :class="
          activeButton3
            ? 'border-wd-green dark:border-wd-green'
            : 'border-white dark:border-slate-800'
        "
        class="outline:none text-xs md:text-base border-b-[3px] font-Montserrat dark:text-white font-bold"
      >
        Erfahrung
      </button>
      <button
        id="button4"
        @click="slideTo(4)"
        :class="
          activeButton4
            ? 'border-wd-green dark:border-wd-green'
            : 'border-white dark:border-slate-800'
        "
        class="outline:none text-xs md:text-base border-b-[3px] font-Montserrat dark:text-white font-bold"
      >
        Kenntnisse
      </button>
    </div>
  </section>
  <Swiper
    class="userSwiper"
    @Swiper="setSwiperRef"
    @slideChange="onSlideChange"
  >
    <SwiperSlide :show="renderComponent">
      <SwipeView :slideIndex="0"></SwipeView>
    </SwiperSlide>
    <SwiperSlide>
      <SwipeView :slideIndex="1"></SwipeView>
    </SwiperSlide>
    <SwiperSlide>
      <SwipeView :slideIndex="2"></SwipeView>
    </SwiperSlide>
    <SwiperSlide>
      <SwipeView :slideIndex="3"></SwipeView>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { dragOptionActive } from "@/store/store.js";
import SwipeView from "./SwipeView.vue";
import DragIcon from "@/assets/icons/DragIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import "swiper/css";
import "swiper/css/virtual";
const renderComponent = ref(true);
let activeButton1 = ref(true);
let activeButton2 = ref(false);
let activeButton3 = ref(false);
let activeButton4 = ref(false);

let swiperRef = null;
let swiperIndex = 0;

let dragButtonVisible = ref(true);
onMounted(() => {
  renderComponent.value = false;
  renderComponent.value = true;
  dragOptionActive.value = false;
});

const setSwiperRef = (swiper) => {
  swiperRef = swiper;
};
const slideTo = (index) => {
  renderComponent.value = false;
  renderComponent.value = true;
  swiperRef.slideTo(index - 1, 0);
  onSlideChange();
};
const onSlideChange = () => {
  swiperIndex = swiperRef.realIndex;
  switch (swiperIndex) {
    case 0:
      activeButton1.value = true;
      activeButton2.value = false;
      activeButton3.value = false;
      activeButton4.value = false;
      break;
    case 1:
      activeButton1.value = false;
      activeButton2.value = true;
      activeButton3.value = false;
      activeButton4.value = false;
      break;
    case 2:
      activeButton1.value = false;
      activeButton2.value = false;
      activeButton3.value = true;
      activeButton4.value = false;
      break;
    case 3:
      activeButton1.value = false;
      activeButton2.value = false;
      activeButton3.value = false;
      activeButton4.value = true;
      break;
  }
};
const dragToggleActive = () => {
  dragButtonVisible.value = false;
  dragOptionActive.value = true;
};
const dragToggleDisabled = () => {
  dragButtonVisible.value = true;
  dragOptionActive.value = false;
};
</script>
