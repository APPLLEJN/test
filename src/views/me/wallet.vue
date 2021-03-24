<!-- home -->
<template>
  <div class="about-container">
    <nav-bar></nav-bar>
    <div class="wallet">
      <h5>钱包余额</h5>
      <p>￥{{amount}}</p>
    </div>
    <button @click="withdraw">提现</button>
    <p class="info"><svg-icon :iconClass="'info'" :size="16"/><span>骇客白收入提现说明</span></p>
  </div>
</template>

<script>
// 请求接口
import { getUserInfo, getFund, postWithdraw } from '@/api/user.js'
import { mapGetters } from 'vuex'
import TabBar from '@/components/TabBar'
import NavBar from '@/components/NavBar'

export default {
  data() {
    return {
      amount: 0,
    }
  },
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 请求数据案例
    async initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      const res = await getFund()
      this.amount = res.amount
    },

    async withdraw () {
      const res = await postWithdraw()
      this.amount = 0
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '真乖，赶紧关注公众号，组织都在等你~')
    },
    goGithub(index) {
      window.location.href = 'https://github.com/sunniejs/vue-h5-template'
    }
  },
}
</script>
<style lang="scss">
.about-container {
  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  padding: 16px 30px;
  .wallet {
    height: 166px;
    margin: 50px auto 26px;
    padding: 11px 66px 40px 9px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 5px 5px 50px 0 rgba(123, 123, 123, 0.25);
    background-image: linear-gradient(119deg, #ffe9b8, #ffd5a0 80%, #ffc78f 105%);
    color: #b77637;
    h5 {
      font-size: 17px;
      margin-bottom: 20px;
    }
    p {
      font-size: 45px;
    }
  }

  button {
    width: 100%;
    height: 55px;
    border-radius: 30px;
    background-color: #ffc78f;
    border: 0px;
    font-size: 15px;
    color: #b77637;
  }

  .info {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    span {
      margin-left: 8px
    }
  }
}
</style>
