<template>
  <div class="background">
    <div class="bg-inner"></div>
    <div class="bg-container"><slot name="body"></slot></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Background extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.background {
  width: 375px;
  height: 100%;
  background-color: #F5F5F5;
  position: relative;
  z-index: 2019;
}
.bg-inner {
  z-index: 0;
  height: 160px;
  border-radius: 0 0 100% 100%;
  background-color: $BASE_COLOR;
  position: absolute;
  right: -10%;
  left: -10%;
}
.bg-container {
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
