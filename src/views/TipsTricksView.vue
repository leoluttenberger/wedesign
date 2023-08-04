<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
      <button type="button" @click="closeBottomCard" class="p-4">
        <BackIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></BackIcon>
      </button>
      <p
        class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
      >
        Tipps Tricks
      </p>
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
        class="outline:none text-base border-b-[3px] font-Montserrat dark:text-white font-bold"
      >
        FAQ
      </button>
      <button
        id="button2"
        @click="slideTo(2)"
        :class="
          activeButton2
            ? 'border-wd-green dark:border-wd-green'
            : 'border-white dark:border-slate-800'
        "
        class="outline:none text-base border-b-[3px] font-Montserrat dark:text-white font-bold"
      >
        Stellensuche
      </button>
      <button
        id="button3"
        @click="slideTo(3)"
        :class="
          activeButton3
            ? 'border-wd-green dark:border-wd-green'
            : 'border-white dark:border-slate-800'
        "
        class="outline:none text-base border-b-[3px] font-Montserrat dark:text-white font-bold"
      >
        Fotos und Info
      </button>
    </div>

    <Swiper
      class="userSwiper"
      @Swiper="setSwiperRef"
      @slideChange="onSlideChange"
    >
      <SwiperSlide> <FAQ></FAQ> </SwiperSlide>
      <SwiperSlide> <Links></Links></SwiperSlide>
      <SwiperSlide> <Category></Category></SwiperSlide>
    </Swiper>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/virtual";
import BackIcon from "@/assets/icons/BackIcon.vue";
import { slideDown } from "@/store/store.js";
import Category from "@/components/MainModals/TipsTricksViews/TipsTricksCategory.vue";
import FAQ from "@/components/MainModals/TipsTricksViews/TipsTricksFAQ.vue";
import Links from "@/components/MainModals/TipsTricksViews/TipsTricksLinks.vue";

let activeButton1 = ref(true);
let activeButton2 = ref(false);
let activeButton3 = ref(false);

let swiperRef = null;
let swiperIndex = 0;

const setSwiperRef = (swiper) => {
  swiperRef = swiper;
};
const slideTo = (index) => {
  if (swiperRef != null) {
    swiperRef.slideTo(index - 1, 0);
  }
  onSlideChange();
};
const onSlideChange = () => {
  if (swiperRef != null) {
    swiperIndex = swiperRef.realIndex;
  }
  switch (swiperIndex) {
    case 0:
      activeButton1.value = true;
      activeButton2.value = false;
      activeButton3.value = false;
      break;
    case 1:
      activeButton1.value = false;
      activeButton2.value = true;
      activeButton3.value = false;
      break;
    case 2:
      activeButton1.value = false;
      activeButton2.value = false;
      activeButton3.value = true;
      break;
  }
};
const closeBottomCard = () => {
  slideDown.value = false;
  slideDown.value = true;
};
</script>
