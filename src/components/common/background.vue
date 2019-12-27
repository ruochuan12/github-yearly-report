<template>
  <div class="background">
    <div class="bg-inner">
      <slot name="body"></slot>
    </div>
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
  opacity: 2019;
}
.bg-inner {
  height: 160px;
  border-radius: 0 0 100% 100%;
  background-color: $BASE_COLOR;
  position: absolute;
  right: -10%;
  left: -10%;
}
</style>
