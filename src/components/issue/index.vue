<template>
  <background>
    <div slot="body" class="repos-total">
    </div>
  </background>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Background from '@/components/common/background.vue';
import Card from '@/components/common/card.vue';
import Title from '@/components/common/title.vue';
import store from '@/store';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
  },
})
export default class Issue extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
</style>
