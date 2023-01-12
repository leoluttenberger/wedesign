<template>
  <section
    class="fixed inset-x-0 z-10 top-0 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800"
  >
    <div class="flex justify-center p-2">
      <div class="px-2">Lebenslauf</div>
      <div>
        <Toggle
          v-model="toggleOnDark"
          :classes="{
            container: 'inline-block',
            toggle:
              'flex w-12 h-5 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
            toggleOn:
              'bg-wd-green border-wd-green justify-start text-black bg-slate-800',
            toggleOff: 'bg-gray-200 border-gray-200 justify-end',
            handle:
              'inline-block bg-white w-5 h-5 top-0 rounded-full absolute transition-all',
            handleOn: 'left-full transform -translate-x-full bg-shite',
            handleOff: 'left-0 bg-slate-600',
            label: 'text-center w-8 border-box whitespace-nowrap select-none',
          }"
        />
      </div>
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
        class="outline:none text-sm border-b-[3px] font-Montserrat dark:hover:border-wd-green hover:border-wd-green dark:text-white"
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
        class="outline:none text-sm border-b-[3px] font-Montserrat dark:hover:border-wd-green hover:border-wd-green dark:text-white"
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
        class="outline:none text-sm border-b-[3px] font-Montserrat dark:hover:border-wd-green hover:border-wd-green dark:text-white"
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
        class="outline:none text-sm border-b-[3px] font-Montserrat dark:hover:border-wd-green hover:border-wd-green dark:text-white"
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
    <SwiperSlide>
      <SwipeView :slideIndex="0" :useEditButton="true"> </SwipeView>
    </SwiperSlide>
    <SwiperSlide>
      <SwipeView :slideIndex="1" :useEditButton="false"></SwipeView>
    </SwiperSlide>
    <SwiperSlide>
      <SwipeView :slideIndex="2" :useEditButton="false"></SwipeView>
    </SwiperSlide>
    <SwiperSlide>
      <SwipeView :slideIndex="3" :useEditButton="false"></SwipeView>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CropperItem from "@/components/CropperItem.vue";
import { isDarkMode } from "@/store.js";

import Toggle from "@vueform/toggle";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwipeView from "./SwipeView.vue";
import "swiper/css";
import "swiper/css/virtual";

const toggleOnDark = ref(false);
let activeButton1 = ref(true);
let activeButton2 = ref(false);
let activeButton3 = ref(false);
let activeButton4 = ref(false);

const bottomCardOpen1 = ref(false);
const renderComponent1 = ref(true);

let swiperRef = null;
let swiperIndex = 0;

if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  toggleOnDark.value = true;
}
watch(toggleOnDark, () => {
  isDarkMode.value = toggleOnDark.value;
  if (isDarkMode.value == true) {
    localStorage.setItem("theme", JSON.stringify("dark"));
  } else {
    localStorage.setItem("theme", JSON.stringify("light"));
  }
});
const setSwiperRef = (swiper) => {
  swiperRef = swiper;
};
const slideTo = (index) => {
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
</script>
