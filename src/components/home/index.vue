<template>
  <div class="home">
    <div class="container">
      <img class="logo" src="@/assets/img/logo.png"/>
      <div class="year">{{year}}</div>
      <div class="title">年度数据报告</div>
      <div class="sub-title">非官方</div>
      <div class="sub-title">Data From GitHub</div>
      <div class="lucky-btn" @click="go">开启时光机</div>
      <div class="tip">静态托管 GitHub Pages，放心食用</div>
    </div>
    <div class="me" @click="toAxuebinPage">
      <img class="avatar" src="https://raw.githubusercontent.com/axuebin/articles/master/images/avatar.png"/>
      <span class="name">Design/Code By axuebin</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Toast, Dialog } from 'vant';
import { YEAR_START_FORMAT, GITHUB_TOKEN, GITHUB_CODE, HOME_STATUS } from '@/lib/constant';
import { qs } from '@/lib/utils';
import { login, fetchToken, authenticate } from '@/lib/auth';
import { updateState, fetchAll } from '@/store';

@Component({
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
})
export default class Home extends Vue {
  status: number = HOME_STATUS.INIT;
  year: number = YEAR_START_FORMAT;
  toAxuebinPage() {
    window.location.href = 'https://github.com/axuebin';
  }
  async init() {
    const { code } = qs();
    if (!code) {
      login();
      return;
    }
    Dialog.confirm({
      title: '授权提示',
      message: '需要通过 OAuth 获取 GitHub 相关 API 权限，无他用，请放心食用',
    }).then(async () => {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '正在授权...',
      });
      await fetchToken(code);
      toast.message = '授权成功';
      sessionStorage.setItem(GITHUB_CODE, code);
      window.location.href = '/';
    }).catch(() => {});
  }
  async go() {
    const token = window.sessionStorage.getItem(GITHUB_TOKEN);
    if (!token) {
      this.init();
      return;
    }
    updateState({ status: HOME_STATUS.BEGIN });
    const octokit = await authenticate();
    Toast.clear();
    fetchAll(octokit);
  }
  mounted() {
    const token = window.sessionStorage.getItem(GITHUB_TOKEN);
    if (!token) {
      this.init();
    }
  }
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
