<template>
  <div class="my-slider">
    <swiper :options="swiperOption" class="swiper-box">
      <swiper-slide class="swiper-item" v-if="Object.keys(userInfo).length > 0">
        <info></info>
      </swiper-slide>
      <swiper-slide class="swiper-item" v-if="Object.keys(reposInfo).length > 0">
        <repos></repos>
      </swiper-slide>
      <swiper-slide class="swiper-item" v-if="Object.keys(reposInfo).length > 0">
        <repos2></repos2>
      </swiper-slide>
      <swiper-slide class="swiper-item" v-if="Object.keys(commitsInfo).length > 0">
        <commit></commit>
      </swiper-slide>
      <swiper-slide class="swiper-item" v-if="Object.keys(commitsInfo).length > 0">
        <commit2></commit2>
      </swiper-slide>
      <swiper-slide class="swiper-item" v-if="Object.keys(reposInfo).length > 0">
        <star></star>
      </swiper-slide>
      <swiper-slide class="swiper-item" v-if="Object.keys(reposInfo).length > 0 && Object.keys(starsInfo).length > 0">
        <stared></stared>
      </swiper-slide>
      <swiper-slide class="swiper-item" v-if="Object.keys(userOrgs).length > 0">
        <orgs></orgs>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <end></end>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script lang="ts">
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Component, Vue } from 'vue-property-decorator';
import Info from '@/components/Info/index.vue';
import Repos from '@/components/Repos/index.vue';
import Repos2 from '@/components/Repos2/index.vue';
import Commit from '@/components/Commit/index.vue';
import Commit2 from '@/components/Commit2/index.vue';
import Star from '@/components/Star/index.vue';
import Stared from '@/components/Stared/index.vue';
import Orgs from '@/components/Orgs/index.vue';
import End from '@/components/End/index.vue';
import { REPOS_INFO, USERINFO, STARS_INFO, ORG } from '@/api/interface';
import store from '@/store';

import 'swiper/dist/css/swiper.css';

@Component({
  components: {
    swiper,
    swiperSlide,
    Info,
    Repos,
    Repos2,
    Star,
    Stared,
    Orgs,
    Commit,
    Commit2,
    End,
  },
})
export default class MySlider extends Vue {
  get userInfo(): USERINFO {
    return store.userInfo || {};
  }
  get reposInfo(): REPOS_INFO {
    return store.reposInfo || {};
  }
  get starsInfo(): STARS_INFO {
    return store.starsInfo || {};
  }
  get userOrgs(): ORG[] {
    return store.userOrgs || [];
  }
  get commitsInfo(): any {
    return store.commitsInfo || [];
  }
  swiperOption = {
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
