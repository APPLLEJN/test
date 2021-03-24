<!-- home -->
<template>
  <div class="code-container">
    <nav-bar></nav-bar>
    <van-image
     round
     width="66px"
     height="66px"
     fit="cover"
     :src="require('@/assets/images/group.png')"
   />
   <div class="">
     <h1>成为“骇客白”认证分享者</h1>
     <div class="">
       骇客白，是开发者和创造者的1对1深度交流平台。如果您在“开发者职业规划、模拟面试和晋级答辩、独立开发者、创业、开发以外的知识”有愿意分享的经验，欢迎成为认证分享者，获得收入，帮助更多人。项目还在内测，输入引荐码成为认证分享者
     </div>
     <div class="flex code">
       <span>引荐码</span>
       <input placeholder="点击输入引荐码" type="text" name="" v-model="project">
     </div>
     <button type="button" name="button" @click="start">开始</button>
     <p class="ques">没有引荐码？关注公号申请成为认证分享者</p>
   </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import IndexList from '@/components/IndexList'
import { getList } from '@/api/home.js'
import { mapGetters } from 'vuex'
import NavBar from '@/components/NavBar'

export default {
  data() {
    return {
      name: '',
      project: '',
      position: '',
      intru: '',
      curIndex: 0
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
    start() {
      this.$router.push('/phone?id=' + this.$route.query.id)
    }
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
     margin: 90px auto 20px;
     border-radius: 20px;
     box-shadow: 5px 5px 50px 0 rgba(123, 123, 123, 0.25);
     background-color: #56bbc6;
     color: #fff
    }
    .ques {
      text-align: center;
    }
  }
</style>
