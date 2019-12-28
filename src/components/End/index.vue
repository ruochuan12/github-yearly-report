<template>
  <background :hasArrow="false">
    <div slot="body" class="end">
      <my-title title="尾声"></my-title>
      <div class="container">
         <card>
          <div slot="body" class="end-cell">
            <div class="content">去年就有这样的想法，今年花了一周末的时间玩了一下。</div>
            <div class="content">在浏览器做的请求和处理数据，还是有点压力，有待优化。</div>
            <div class="content">基本是想到哪写到哪，不足之处欢迎指出和 PR。</div>
          </div>
        </card>
         <card>
          <div slot="body" class="end-cell">
            <div class="content">我也有一个公众号，分享代码和摄影，目前长期不营业，计划明年捡起来，有兴趣的可以先关注一下。</div>
            <div class="content">
              <div class="weixin"><img class="weixin-img" :src="require('@/assets/img/weixin.png')"/></div>
            </div>
          </div>
        </card>
         <card>
          <div slot="body" class="end-cell">
            <div class="content">如果觉得还挺有意思，可以赞助一下 ~</div>
            <div class="content">
              <div class="coffee"><img class="coffee-img" :src="require('@/assets/img/coffee.png')"/></div>
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

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
  },
})
export default class Orgs extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.end {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  height: 0;
  flex: 1;
  margin: 16px 0 36px;
  padding-bottom: 10px;
  overflow-y: scroll;
  .end-cell {
    padding: 12px;
    .content {
      margin-bottom: 6px;
      font-size: 12px;
      color: $TIP_COLOR;
      .weixin {
        display: flex;
        justify-content: center;
        &-img {
          width: 300px;
          height: 95px;
        }
      }
      .coffee {
        display: flex;
        justify-content: center;
        &-img {
          width: 200px;
          height: 200px;
        }
      }
    }
  }
}
</style>
