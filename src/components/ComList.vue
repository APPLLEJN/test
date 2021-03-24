<template>
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <div v-for="item in list" :key="item">
       {{item.name}}
    </div>
  </van-list> -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad" >
          <div v-for="item in list" :key="item" class="index-item">
            <router-link :to="{ path: `/meet/${item.meet_id}/status?type=${type}` }">
              <div class="date">
                <span v-if="item.status === 'unconfirmed'" class="status">行家未确认</span>
                <span v-if="item.status === 'cancel'" class="status">用户取消</span>
                <span v-if="item.status === 'confirmed'" class="status">行家已确认</span>
                <span v-if="item.status === 'refused'" class="status">行家拒绝</span>
                <span v-if="item.status === 'paid'" class="status">学员已支付</span>
                <span v-if="item.status === 'refunding'" class="status">退款中</span>
                <span v-if="item.status === 'refunded'" class="status">已退款</span>
                <span v-if="item.status === 'finish'" class="status">完成约见,未评论</span>
                <span v-if="item.status === 'over'" class="status">已评论,流程结束</span>
                <span>{{item.date_updated}}</span>
              </div>
              <div class="item-header">
                <van-image
                  round
                  width="47px"
                  height="47px"
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div v-if="type == 'receive'" class="item-title">
                  <h6>{{item.coder.nick_name}}</h6>
                  <p>{{item.coder.job}} | {{item.coder.company}}</p>
                </div>
                <div v-if="type == 'send'" class="item-title">
                  <h6>{{item.hacker.nick_name}}</h6>
                  <p>{{item.hacker.job}} | {{item.hacker.company}}</p>
                </div>
              </div>
            </router-link>
          </div>
      </van-list>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getMeets, getReceives } from '@/api/user.js'

export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      page_size: 10
    }
  },
  computed: {
    ...mapGetters(['list', 'userName'])
  },
  methods: {
    loadnext() {
      this.updatenews(moment().subtract(this.dayindex, 'days').format('YYYYMMDD'))
      this.dayindex++
    },
    async initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      try {
        const params = { page: this.page, page_size: this.page_size }
        const list = this.type == 'receive' ? await getReceives(params) : await getMeets(params)
        if (list.length) {
          this.list.push(...list)
          this.page = this.page + 1
          this.loading = false
        } else {
          this.loading = false
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      await this.initData()
      // 加载状态结束
      this.loading = false
      this.finished = true

      // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
    },
    test() {

    }
  },
  created() {
    // this.onLoad()
    // this.updatenewslatest()
    // this.updatenews(moment().format('YYYYMMDD'))
  }
}
</script>

<style lang="scss" scoped>
  .index-item {
    padding: 24px 0;
    border-bottom: 1px solid #979797;
    font-size: 15px;
    .item-header {
      display: flex;
      align-items: flex-start;
      margin-top: 20px;
      color: #000;
      .item-title {
        flex: 1;
        margin-left: 17px;
        h6 {
          font-size: 16px;
        }
      }
    }
    .date {
      display: flex;
      justify-content: space-between;
      .status {
        padding: 0 5px;
        height: 28px;
        line-height: 28px;
        border-radius: 12px;
        background-color: #ededed;
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>
