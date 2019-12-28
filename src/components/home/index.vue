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
      <img class="avatar" src="@/assets/img/avatar.png"/>
      <span class="name">Design/Code By axuebin</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { YEAR_START_FORMAT, GITHUB_TOKEN, GITHUB_CODE, HOME_STATUS } from '@/lib/constant';
import { qs } from '@/lib/utils';
import { login, fetchToken, authenticate } from '@/lib/auth';
import { updateState, fetchAll } from '@/store';

@Component({
  components: {
  },
})
export default class Home extends Vue {
  status: number = HOME_STATUS.INIT;
  year: number = YEAR_START_FORMAT;
  toAxuebinPage() {
    window.location.href = 'https://github.com/axuebin';
  }
  async go() {
    const token = window.sessionStorage.getItem(GITHUB_TOKEN);
    if (!token) {
      const { code } = qs();
      if (!code) {
        login();
        return;
      }
      await fetchToken(code);
      sessionStorage.setItem(GITHUB_CODE, code);
      window.location.href = '/';
      return;
    }
    updateState({ status: HOME_STATUS.BEGIN });
    const octokit = await authenticate();
    fetchAll(octokit);
  }
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
