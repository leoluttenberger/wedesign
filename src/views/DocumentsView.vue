<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2">Bewerbung</div>
    <div class="flex justify-evenly">
      <button
        id="button1"
        @click="slideTo(1)"
        :class="
          activeButton1
            ? 'border-wd-green dark:border-wd-green'
            : 'border-white dark:border-slate-800'
        "
        class="outline:none text-sm border-b-[3px] font-Montserrat dark:text-white"
      >
        Offen
      </button>
      <button
        id="button2"
        @click="slideTo(2)"
        :class="
          activeButton2
            ? 'border-wd-green dark:border-wd-green'
            : 'border-white dark:border-slate-800'
        "
        class="outline:none text-sm border-b-[3px] font-Montserrat dark:text-white"
      >
        Archiv
      </button>
    </div>
  </section>
  <swiper
    class="applicationSwiper"
    @swiper="setSwiperRef"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <SwipeView :slideIndex="3"> </SwipeView>
    </swiper-slide>
    <swiper-slide>
      <ArchiveView></ArchiveView>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import swipe from "./SwipeView.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwipeView from "./SwipeView.vue";
import ArchiveView from "./ArchiveView.vue";
import { Tiptap } from "@/components";

let activeButton1 = ref(true);
let activeButton2 = ref(false);
let swiperRef = null;
let swiperIndex = 0;

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
      break;
    case 1:
      activeButton1.value = false;
      activeButton2.value = true;
      break;
  }
};
</script>
