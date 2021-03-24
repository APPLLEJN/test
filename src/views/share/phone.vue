<!-- home -->
<template>
  <div class="code-container">
  <nav-bar></nav-bar>
   <div class="">
     <h1>绑定手机号</h1>
     <div class="flex code">
       <span>手机号</span>
       <input placeholder="点击输入手机号" type="text" name="" v-model="phone">
     </div>
     <div class="flex code">
       <span>验证码</span>
       <input placeholder="点击输入验证码" type="text" name="" v-model="code">
       <button type="button" name="button">发送验证码</button>
     </div>
     <div class="button-wrapper">
       <button class="prev" type="button" name="button" @click="prev">上一步</button>
       <button type="button" name="button" @click="next">下一步</button>
     </div>
   </div>
   <van-overlay :show="show">
      <div class="wrapper">
        <div class="block">
          <div class="code-close flex"> 
            <div @click="show = false">X</div>
          </div>
          <div>
            <h5>在公号留言申请成为认证分享者</h5>
            <p>请告诉我们你是谁、所在公司、职位、或者做的项目，谢谢（信息都会人工看）</p>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import IndexList from '@/components/IndexList'
import { acceptInvite } from '@/api/user.js'
import { mapGetters } from 'vuex'
import NavBar from '@/components/NavBar'

export default {
  data() {
    return {
      name: '',
      project: '',
      position: '',
      intru: '',
      curIndex: 0,
      show: false,
    }
  },

  computed: {
    ...mapGetters(['list'])
  },

  mounted() {
  },

  methods: {
    // 请求数据案例
    async initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      try {
        const params = {}
        const list = await getList(params)
        this.$store.dispatch('setList', [{name: 1}, {name: 2}, {name: 3}])
      } catch (err) {
        console.log(err)
        this.$store.dispatch('setList', [{name: 1}, {name: 2}, {name: 3}])
      }
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '真乖，赶紧关注公众号，组织都在等你~')
    },
    goGithub(index) {
      window.location.href = 'https://github.com/sunniejs/vue-h5-template'
    },
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        await this.initData()
        // 加载状态结束
        this.loading = false;
        this.finished = true;

        // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
    },
    next () {
      this.show = true
      acceptInvite({code:  this.$route.query.id})
    },
    prev () {
      this.$router.push('/sharecode?id=' + this.$route.query.id)
    },
  },

  components: {
    TabBar,
    IndexList,
    NavBar
  }
}
</script>
<style lang="scss" scoped>
  .code-container {
    padding: 15px 30px;
    .van-image {
      display: block;
      margin: 15px auto 20px;
    }
    h1 {
      font-size: 19px;
      margin-bottom: 20px
    }

    input, textarea, button {
      background-color: #f6f6f6;
      border: 0px;
      flex: 1;
    }
    .flex {
      align-items: center;
    }
    .code {
      margin: 30px 0;
    }
    input {
      height: 44px;
      background: #f0f0f0;
      border-radius: 10px;
      flex: 1;
      margin-left: 10px;
      padding-left: 10px
    }

    button {
     width: 155px;
     height: 40px;
     display: block;
     border-radius: 20px;
     box-shadow: 5px 5px 50px 0 rgba(123, 123, 123, 0.25);
     background-color: #56bbc6;
     color: #fff
    }
    .prev {
       background: #fff;
       color: #56bbc6;
    }
    .button-wrapper {
      display: flex;
      justify-content: space-between;
      button {
        flex: 0 1 45%
      }
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
    }

  .block {
    padding: 20px 25px;
    border-radius: 10px;
    background-color: #fff;
    margin: 20px;
    position: relative;
    font-size: 13px;
    .code-close {
      justify-content: flex-end;
      font-size: 20px;
      color: #bdbdbd;
    }
    h5 {
      font-size: 16px;
      margin: 8px 0;
    }
  }
}
</style>
