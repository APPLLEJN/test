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
      <!-- <div v-for="item in list" :key="item.id"> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
          <div v-for="item in list" class="index-item">
            <router-link :to="{ path: `/detail/${item.id}` }">
            <div class="item-header">
              <van-image
                round
                width="47px"
                height="47px"
                fit="cover"
                :src="item.avatar"
              />
              <div class="item-title">
                <h6>{{item.nick_name}}</h6>
                <p>{{item.company}} | {{item.job}}</p>
              </div>
            </div>
            <section class="item-content">
              {{item.introduction}}
            </section>
            <section>
              <span>已交流<span class="blue">{{item.meet_count || '-'}}</span>人</span>
              <span class="money">¥ {{item.price / 100}}元</span>
            </section>
            </router-link>
          </div>
      <!-- </div> -->
      </van-list>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getList } from '@/api/home.js'

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
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
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const params = { page: this.page, page_size: this.page_size }
      const list = await getList(params)
      if (list && list.length) {
        this.list.push(...list)
        this.page = this.page + 1
        this.loading = false
      } else {
        this.loading = false
        this.finished = true
      }

      // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
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
    padding: 30px 20px;
    border-bottom: 1px solid #979797;
    font-size: 15px;
    .item-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      color: #000;
      .item-title {
        flex: 1;
        margin-left: 17px;
        h6 {
          font-size: 16px;
        }
      }
    }
    section {
      margin-top: 13px;
      display: flex;
      justify-content: space-between;
      color: #4a4a4a;
      &.item-content {
        color: #6e6e6e
      }
    }
    .money {
      background: #ffe9b8;
      color: #b77637;
      padding: 2px 13px;
      border-radius: 20px;;
    }
  }
</style>
