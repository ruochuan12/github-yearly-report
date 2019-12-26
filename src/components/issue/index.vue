<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import {
  YEAR_2019,
} from '@/lib/constant';
import { fetchIssuesService } from '@/api/service';

@Component({
  components: {
  },
})
export default class Issue extends Vue {
  octokit: any = null;
  async fetchIssues() {
    const issues = [];
    const res = await fetchIssuesService(this.octokit, {
      filter: 'all',
      state: 'all',
      sort: 'created',
      since: YEAR_2019.toISOString(),
      per_page: 100,
      page: 5,
    });
  }
  async mounted() {
    this.fetchIssues();
  }
}
</script>

<style lang="scss">
</style>
