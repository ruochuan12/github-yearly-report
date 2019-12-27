<template>
  <div id="app">
    <home v-if="status === HOME_STATUS.INIT || status === HOME_STATUS.BEGIN"></home>
    <my-slider v-if="status === HOME_STATUS.FINISH"></my-slider>
    <div v-if="status === HOME_STATUS.ERROR">
      不好意思，访问 GitHub 出错了，请重试 ~
    </div>

    <van-overlay :show="loading" @click="closeLoading">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" vertical v-if="loading">正在生成数据(挺慢的)...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Home from '@/components/Home/index.vue';
import MySlider from '@/components/Slider/index.vue';
import { HOME_STATUS } from '@/lib/constant';
import store from '@/store';

@Component({
  components: {
    Home,
    MySlider,
  },
})
export default class App extends Vue {
  loading: boolean = false
  HOME_STATUS = HOME_STATUS;
  get status() {
    return store.status;
  }
  @Watch('status')
  onWatchStatus() {
    switch (this.status) {
    case 1: this.showLoading(); break;
    default: this.closeLoading(); break;
    }
  }
  showLoading() {
    this.loading = true;
  }
  closeLoading() {
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
