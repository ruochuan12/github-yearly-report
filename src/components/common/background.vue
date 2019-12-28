<template>
  <div class="background">
    <div class="bg-inner"></div>
    <div class="bg-container">
      <slot name="body"></slot>
      <div class="arrow" v-if="hasArrow">
        <img class="arrow-img" :src="require('@/assets/img/arrow.png')"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Background extends Vue {
  @Prop({
    default: true,
  }) hasArrow?: boolean;
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
.arrow {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &-img {
    width: 32px;
    height: 32px;
    animation: heart 1.7s ease-in-out 0.1s infinite alternate;
    @keyframes heart{
      from{transform:translate(0,0)}
      to{transform:translate(0, 6px)}
    }
  }
}
</style>
