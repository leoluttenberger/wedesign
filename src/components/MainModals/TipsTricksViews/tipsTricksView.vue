<template>
  <section
    class="fixed inset-x-0 z-10 top-20 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 rounded-3xl border-t-[5px] border-t-gray"
  >
    <button @click="closeBottomCard()">
      <div class="flex">
        <h1
          class="non-flex pt-8 px-4 text-black dark:text-white font-Montserrat text-2xl md:text-2xl font-bold"
        >
          Tips & Tricks
        </h1>
        <div class="grow ..."></div>
        <div class="p-4 non-flex">
          <CloseIcon
            class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
          ></CloseIcon>
        </div>
      </div>
    </button>
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
        Kategorie1
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
        Kategorie2
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
        Kategorie3
      </button>
    </div>

    <Swiper
      class="userSwiper"
      @Swiper="setSwiperRef"
      @slideChange="onSlideChange"
    >
      <SwiperSlide> <Category></Category> </SwiperSlide>
      <SwiperSlide> <Category></Category></SwiperSlide>
      <SwiperSlide> <Category></Category></SwiperSlide>
    </Swiper>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/virtual";
import Category from "./tipsTricksCategory.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { slideDown } from "@/store/store.js";

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
