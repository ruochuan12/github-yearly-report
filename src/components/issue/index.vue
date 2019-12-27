<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  YEAR_START,
} from '@/lib/constant';
import { fetchIssuesService } from '@/api/service';

@Component({
  components: {
  },
})
export default class Issue extends Vue {
}
</script>

<style lang="scss">
</style>
