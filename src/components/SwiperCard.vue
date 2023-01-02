<template>
  <swiper
    class="h-screen"
    :slides-per-view="1"
    :space-between="spaceBetween"
    :pagination="(({
      type: 'bullets',
      enabled: true,
      dynamicBullets:true,
        }) as any)"
    :modules="modules"
    @swiper="onSwiper"
    @activeIndexChange="onActiveIndexChange"
  >
    <swiper-slide
      class="top-20 bg-white dark:bg-slate-800 rounded-3xl"
      v-for="slide in items"
      :key="slide.index"
      :virtual-index="slide.index"
    >
      <slot :id="slide.id" :index="slide.index" />
    </swiper-slide>
  </swiper>
</template>
<script lang="ts">
import { nextTick, PropType, toRefs, watch } from "vue";
import SwiperCore, { Virtual } from "swiper";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.min.css";
import "swiper/css/pagination";

SwiperCore.use([Virtual, Pagination, Navigation]);

export interface SlideItem {
  index: number;
  id: string;
}

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    items: {
      type: Array as PropType<SlideItem[]>,
      required: true,
    },
    spaceBetween: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:index"],
  setup(props, { emit }) {
    const { items, index } = toRefs(props);

    let swiper: SwiperCore;

    const counterChanges = (items: SlideItem[], oldItems: SlideItem[]) => {
      if (swiper) {
        const lowest = Math.min(...items.map((i) => i.index));
        const oldLowest = Math.min(...oldItems.map((i) => i.index));

        const newSlides = -(lowest - oldLowest);

        nextTick(() => {
          for (let i = 0; i < newSlides; i++) {
            swiper.slideNext(0);
          }
        });
      }
    };

    watch(items, counterChanges);

    const reactToIndex = () => {
      const activeItem = items.value[swiper.activeIndex];
      if (index.value !== activeItem.index) {
        const swiperIndex = items.value.findIndex(
          (item) => item.index === index.value
        );
        swiper.slideTo(swiperIndex, 0);
      }
    };

    watch(index, reactToIndex);

    const onSwiper = (swiperIn: any) => {
      swiper = swiperIn;
      reactToIndex();
    };

    const onActiveIndexChange = () => {
      const activeItem = items.value[swiper.activeIndex];
      emit("update:index", activeItem.index);
    };

    return {
      onSwiper,
      onActiveIndexChange,
      modules: [Pagination, Navigation],
    };
  },
};
</script>
