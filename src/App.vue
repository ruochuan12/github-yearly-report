<template>
  <div id="app"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { GITHUB_TOKEN, GITHUB_CODE } from '@/lib/constant';
import { qs } from './lib/utils';
import { login, fetchToken, authenticate } from '@/lib/auth';

@Component({
  components: {
  },
})
export default class App extends Vue {
  octokit: any = null;
  async mounted() {
    const token = window.localStorage.getItem(GITHUB_TOKEN);
    if (!token) {
      const { code } = qs();
      if (!code) {
        login();
        return;
      }
      await fetchToken(code);
      localStorage.setItem(GITHUB_CODE, code);
      window.location.href = '/';
      return;
    }
    this.octokit = await authenticate();
  }
}
</script>

<style lang="scss">
</style>
