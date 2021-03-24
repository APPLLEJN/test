<!-- home -->
<template>
  <div class="card-wrapper">
    <nav-bar></nav-bar>
    <div class="card">
      <div class="card-header">
        <van-image
          round
          width="66px"
          height="66px"
          fit="cover"
          :src="detail.avatar"
        />
        <div class="item-title">
          <h6>{{detail.name}}</h6>
          <p>{{detail.company}}</p>
          <p>{{detail.job}}</p>
        </div>
      </div>
      <div class="card-content">
        {{detail.introduction}}
         <section>
          <span>已交流{{detail.meet_count}}人</span>
          <span>¥ {{detail.price/100}}元</span>
        </section>
      </div>
    </div>
    <svg-icon :iconClass="'zhushi'" :size="33" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="initData"
    >
      <div v-for="item in list" class="flex card-list-item">
        <header-info :avatar="item.coder.avatar" :title="item.coder.name" :des="'des1'" :content="item.content" :color="'#000'" />
      </div>
    </van-list>
    <div class="button_wrapper">
      <button type="button" name="button">咨询顾问</button>
      <button class="booking" type="button" name="button" @click="booking">￥{{detail.price / 100}}预约交流</button>
    </div>
  </div>
</template>

<script>
import { getDetail, getComments } from '@/api/home.js'
import { booking } from '@/api/user.js'
import NavBar from '@/components/NavBar'
import HeaderInfo from '@/components/HeaderInfo'

export default {
  data() {
    return {
      detail: {},
      list: [],
      loading: false,
      finished: false,
      page: 1,
      page_size: 10
    }
  },

  computed: {},

  mounted() {},

  async onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    // await this.initData()
    this.loading = false
    this.finished = true
  },

  methods: {
    async initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      try {
        const params = { page: this.page, page_size: this.page_size }
        const data = await getDetail(this.$route.params.id)
        const list = await getComments(this.$route.params.id, params)
        this.detail = data
        if (list && list.length) {
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
    booking() {
      this.$router.push('/appointment/' + this.detail.id)
    }
  },
  components: {
    NavBar,
    HeaderInfo
  }
}
</script>
<style lang="scss" scoped>
  .card-wrapper {
    padding: 16px 20px;
  }
  .card {
    font-size: 15px;
    box-shadow: 3px 3px 17px 0 rgba(122, 122, 122, 0.25);
    margin-bottom: 25px;
    .card-header {
      background-color: #51bbc7;
      border-radius: 11px 11px 0 0;
      padding: 18px 14px;
      display: flex;
      color: #fff;
      .item-title {
        flex: 1;
        margin-left: 18px;
        h6 {
          font-size: 17px
        }
      }
    }
    .card-content {
        color: #6e6e6e;
        padding: 12px 14px 33px;
        background-color: #fff;
        border-radius: 0 0 11px 11px;
    }
    section {
      padding-top: 22px;
      display: flex;
      justify-content: space-between;
      span {
        color: #6e6e6e;
      }
    }
  }

  .card-list-item {
    padding: 8px 0;
    border-bottom: 1px solid #bdbdbd;
  }

  .button_wrapper {
    height: 100px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    align-items: center;
    button {
     width: 150px;
     height: 40px;
     margin: 30px 0;
     border: 0px;
     border-radius: 20px;
     box-shadow: 5px 5px 50px 0 rgba(123, 123, 123, 0.25);
     background-color: #fff;
     color: #51bbc7;
     display: block;
     margin: 0 auto;
     &.booking {
        color: #fff;
        background-image: linear-gradient(100deg, #51bbc7, #51bbc7 32%, #49aeec);
     }
    }
  }

</style>
