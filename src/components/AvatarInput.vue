<template>
  <div class="relative inline-block overflow-hidden">
    <input
      type="file"
      accept="image/*"
      class="hidden"
      ref="file"
      @change="change"
    />
    <img :src="image" class="h-full w-full object-cover" />
    <div
      class="absolute top-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center"
    >
      <button
        type="button"
        @click="browse()"
        class="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200"
      >
        <icon-profile name="camera" class="h-6 w-6"></icon-profile>
      </button>
      <button
        type="button"
        v-if="value"
        @click="remove()"
        class="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200"
      >
        <icon-profile name="x" class="h-6 w-6"></icon-profile>
      </button>
    </div>
  </div>
</template>

<script>
import IconProfile from "./IconProfile";
export default {
  props: {
    value: File,
    defaultSrc: String,
  },
  data() {
    return {
      image: this.defaultSrc,
    };
  },
  methods: {
    browse() {
      console.log("browse");
      this.$refs.file.click();
    },
    remove() {
      console.log("remove");
      this.$emit("input", null);
    },
    change(e) {
      if (!e.target.files[0]) {
        console.log("file read");
        this.image = this.defaultSrc;
        this.$refs.file.value = "";
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
          console.log("file read");
          this.image = e.target.result;
        };
      }
    },
  },
  components: {
    IconProfile,
  },
};
</script>
