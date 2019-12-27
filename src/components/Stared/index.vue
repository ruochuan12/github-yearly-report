<template>
  <background>
    <div slot="body" class="stars">
      <my-title title="Star 数据(总)"></my-title>
      <div class="container">
        <card>
          <div slot="body" class="stars-cell">
            <div class="key">收获了几个小星星</div>
            <div class="tip">记得 Code > Star 哦</div>
            <div class="value">{{reposInfo.stars || 0}}</div>
          </div>
        </card>
        <card>
          <div slot="body" class="stars-cell">
            <div class="key">最受欢迎 Top 5</div>
            <div class="value list">
              <top-list :data="reposInfo.mostStars || []"></top-list>
            </div>
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
import TopList from '@/components/common/topList.vue';
import store from '@/store';
import { REPO, REPOS_INFO, STARS_INFO } from '@/api/interface';
import { COLORS } from '../../lib/constant';
import { toPercent } from '../../lib/utils';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
    TopList,
  },
})
export default class Stars extends Vue {
  get stars(): REPO[] {
    if (store.starsInfo && store.starsInfo.stars) {
      return store.starsInfo.stars;
    }
    return [];
  }
  get starsInfo(): STARS_INFO {
    return store.starsInfo || {};
  }
  get reposInfo(): REPOS_INFO {
    return store.reposInfo || {};
  }
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.container {
  margin-top: 30px;
  .stars {
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
      .list {
        width: 100%;
      }
    }
    &-language {
      width: 100%;
      height: 160px;
    }
  }
}
</style>
