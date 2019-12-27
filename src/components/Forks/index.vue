<template>
  <background>
    <div slot="body" class="repos-total">
      <my-title title="Fork 数据(总)"></my-title>
      <div class="container">
        <card>
          <div slot="body" class="repos-total-cell">
            <div class="key">有多少人 Fork 了你的仓库</div>
            <div class="tip">继续加油哟</div>
            <div class="value">{{reposInfo.forked || 0}}</div>
          </div>
        </card>
        <card>
          <div slot="body" class="repos-total-cell">
            <div class="key">你 Fork 了几个仓库</div>
            <div class="tip">好好学习，天天向上</div>
            <div class="value">{{reposInfo.forks || 0}}</div>
          </div>
        </card>
      </div>
    </div>
  </background>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Background from '@/components/common/background.vue';
import Card from '@/components/common/card.vue';
import Title from '@/components/common/title.vue';
import store from '@/store';
import { REPOS_INFO } from '@/api/interface';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
  },
})
export default class Forks extends Vue {
  get reposInfo(): REPOS_INFO {
    return store.reposInfo || {};
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.container {
  margin-top: 30px;
  .repos-total {
    &-cell {
      padding: 8px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .key {
        font-size: 16px;
      }
      .value {
        margin-top: 4px;
        font-size: 28px;
        font-weight: bold;
        color: $MAIN_TEXT_COLOR;
      }
      .tip {
        margin-top: 6px;
        font-size: 12px;
        color: $TIP_COLOR;
      }
    }
    &-created {
      width: 100%;
      height: 110px;
    }
  }
}
</style>
