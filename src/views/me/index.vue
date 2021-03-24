<!-- home -->
<template>
  <div class="index-container">
    <van-cell is-link to="edit">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
       <div class="flex info">
         <van-image
            round
            width="66px"
            height="66px"
            fit="cover"
            :src="info.avatar"
          />
          <div class="item-title flex-1">
            <h6>{{info.nick_name}}</h6>
            <p v-if="info.level === 'hacker'">{{info.job}} {{info.introduction ? ('| ' + info.introduction) : ''}}</p>
          </div>
       </div>
       <div class="status" v-if="info.level === 'hacker'">
          <div v-if="info.review_status === 'passed'" class="">审核通过</div>
          <div v-if="info.review_status === 'pending'" class="">资料审核中</div>
          <div v-if="info.review_status === 'reject'" class="">审核失败</div>
       </div>
      </template>
    </van-cell>
    <van-cell v-if="info.level=== 'hacker'" title="钱包" is-link to="/wallet" />
    <van-cell v-if="info.level=== 'hacker'" is-link to="/share">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="recommend">
          <span>
            我的引荐
          </span>
          <span class="tips">已经帮助<span>{{info.follower_count}}</span>人进入骇客白</span>
        </div>
      </template>
    </van-cell>
    <van-cell v-if="info.level=== 'coder'" title="认证称为分享者" is-link to="share" />
    <van-cell title="我的交流" is-link to="communication" />
    <van-cell title="关于骇客白" is-link to="index" />
    <div class="layout-footer">
      <TabBar @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import IndexList from '@/components/IndexList'
import { getInfo } from '@/api/user.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      info: {}
    }
  },

  computed: {
    ...mapGetters(['list'])
  },

  mounted() {
    this.onLoad()
  },

  methods: {
    // 请求数据案例
    async initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      const res = await getInfo()
      this.info = res
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '真乖，赶紧关注公众号，组织都在等你~')
    },
    goGithub(index) {
      window.location.href = 'https://github.com/sunniejs/vue-h5-template'
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      await this.initData()
      // 加载状态结束
      // this.loading = false;
      // this.finished = true;

      // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
    }
  },

  components: {
    TabBar,
    IndexList
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  padding: 0 30px;
  .van-cell__title {
    width: 90%;
  }
  .info {
    color: #000;
    padding: 24px 0;
    .item-title {
      margin-left: 18px;
      min-width: 0;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    h6 {
      font-size: 16px;
    }
  }
  .status {
    color: #51bbc7;
  }
  .recommend {
    display: flex;
    justify-content: space-between;
    .tips {
      font-size: 11px;
      span {
        color: #51bbc7
      }
    }
  }
  .van-cell {
    background: #f6f6f6;
    padding: 24px 0;
    border-bottom: 1px solid #d8d8d8;
    align-items: center;
    color: #575757;
  }
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
}
</style>
