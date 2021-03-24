<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <!-- <h1 class="demo-home__title"><img src="https://imgs.solui.cn/weapp/logo.png" /><span> VUE H5开发模板</span></h1>
      <h2 class="demo-home__desc">
        A vue h5 template with Vant UI
      </h2>
      <van-icon class-prefix="iconfont icontansuo" size="40" />

      <router-link to="/communication" class="">
        去我的交流页面
      </router-link > -->
      <index-list></index-list>
    </div>
    <van-cell icon="success" v-for="item in list" :key="item" :title="item" />

    <div class="layout-footer">
      <TabBar @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import IndexList from '@/components/IndexList'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },

  computed: {
    ...mapGetters(['list'])
  },

  mounted() {
  },

  methods: {
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '真乖，赶紧关注公众号，组织都在等你~')
    },
    goGithub(index) {
      window.location.href = 'https://github.com/sunniejs/vue-h5-template'
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
