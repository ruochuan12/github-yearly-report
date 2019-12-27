<template>
  <div class="my-slider">
    <swiper :options="swiperOption" class="swiper-box">
      <swiper-slide class="swiper-item" v-if="Object.keys(userInfo).length > 0">
        <info></info>
      </swiper-slide>
      <swiper-slide class="swiper-item" v-if="Object.keys(reposInfo).length > 0">
        <repos-total></repos-total>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script lang="ts">
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Component, Vue } from 'vue-property-decorator';
import Info from '@/components/Info/index.vue';
import ReposTotal from '@/components/Repos/index.vue';
import { REPOS_INFO, USERINFO } from '@/api/interface';
import store from '@/store';

@Component({
  components: {
    swiper,
    swiperSlide,
    Info,
    ReposTotal,
  },
})
export default class MySlider extends Vue {
  get userInfo(): USERINFO {
    return store.userInfo || {};
  }
  get reposInfo(): REPOS_INFO {
    return store.reposInfo || {};
  }
  swiperOption = {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
  }
}
</script>

<style lang="scss" scoped>
.my-slider {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}
.swiper-box {
  width: 100%;
  height: 100%;
}
.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
