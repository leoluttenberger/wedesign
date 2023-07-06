<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2">
      <div class="px-20 font-bold">Bewerbung</div>
      <button class="" v-if="dragButtonVisible">
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
  </section>
  <swiper
    class="applicationSwiper"
    @swiper="setSwiperRef"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <SwipeView :slideIndex="3"> </SwipeView>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { dragOptionActive } from "@/store/store.js";
import DragIcon from "@/assets/icons/DragIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import SwipeView from "./SwipeView.vue";
import ArchiveView from "./ArchiveView.vue";

let activeButton1 = ref(true);
let activeButton2 = ref(false);
let swiperRef = null;
let swiperIndex = 0;

let dragButtonVisible = ref(true);
onMounted(() => {
  dragOptionActive.value = false;
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
      break;
    case 1:
      activeButton1.value = false;
      activeButton2.value = true;
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
