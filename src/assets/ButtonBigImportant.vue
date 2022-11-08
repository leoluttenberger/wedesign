<template>
  <div class="button">
    <p class="button-big-important">Label</p>
  </div>
</template>

<script>
export default {
  name: "ButtonBigImportant",
};
</script>

<style lang="scss" scoped>
// This is the project stylesheet

// Colors
$transparent-black: #00000033;
$wd-green: #00e0ac;
$wd-white: #ffffff;

// Typographies
@mixin montserrat-18-medium {
  font-family: "Montserrat";
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
}
.button {
  background-color: $wd-green;
  border-radius: 6px;
  padding: 14px 20px;
  box-shadow: 0 8px 20px 0 $transparent-black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-big-important {
  color: $wd-white;
  text-align: center;
  @include montserrat-18-medium;
}
</style>
