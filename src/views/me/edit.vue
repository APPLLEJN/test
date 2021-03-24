<!-- home -->
<template>
  <div class="edit-container">
    <div v-if="curIndex===0" class="">
      <van-image
       round
       width="66px"
       height="66px"
       fit="cover"
       src="https://img.yzcdn.cn/vant/cat.jpeg"
     />
      <div class="item">
        <span>名字</span>
        <input type="text" name="" v-model="nick_name">
      </div>
      <div class="item">
        <span>公司/项目</span>
        <input type="text" name="" v-model="company" placeholder="如骇客白">
      </div>
      <div class="item">
        <span>职位/职责</span>
        <input type="text" name="" v-model="job" placeholder="如创始人/总监/CTO">
      </div>
      <div class="item-textarea">
        <p>你希望自己如何被介绍？</p>
        <textarea name="name" rows="8" cols="80" v-model="introduction"></textarea>
      </div>
      <button type="button" name="button" @click="next">下一步</button>
    </div>
    <div v-if="curIndex===1" class="price-wrapper">
      <h5>定价</h5>
      <div class="price">
        ¥ <input type="text" name="" value="" v-model="price" placeholder="点击输入价格">
      </div>
      <div class="info">
        <p>时间是有价值的，您可以为每次深度交流定价。目前我们推荐范围是<span>0-400</span>元。</p>
        <p>用户预约并通过您确认后，平台会发起“腾讯会议”邀请，双方在预约的时间进入会议室，通过语音和视频的方式完成深度交流。时长没有限制，一般30-50分钟。</p>
      </div>
      <div class="button-wrapper">
        <button class="prev" type="button" name="button" @click="prev">上一步</button>
        <button type="button" name="button" @click="publish">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import IndexList from '@/components/IndexList'
import { mapGetters } from 'vuex'
import { editUser, editUserPrice, getInfo } from '@/api/user.js'
import { Toast } from 'vant'

export default {
  data() {
    return {
      nick_name: '',
      company: '',
      job: '',
      introduction: '',
      price: 0,
      curIndex: 0
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
      try {
        const params = {}
        const list = await getList(params)
        this.$store.dispatch('setList', [{ name: 1 }, { name: 2 }, { name: 3 }])
      } catch (err) {
        console.log(err)
        this.$store.dispatch('setList', [{ name: 1 }, { name: 2 }, { name: 3 }])
      }
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { nick_name, introduction, job, company, price } = await getInfo()
      console.log(nick_name, introduction, job, company, price)
      this.nick_name = nick_name
      this.introduction = introduction
      this.job = job
      this.company = company
      this.price = price / 100
      // 加载状态结束
      this.loading = false
      this.finished = true

      // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
    },
    next() {
      if (!this.nick_name) {
        return Toast('请填写名字')
      }
      if (!this.company) {
        return Toast('请填写公司/项目')
      }
      if (!this.job) {
        return Toast('请填写职位信息')
      }
      this.curIndex = 1
    },
    prev() {
      this.curIndex = 0
    },
    async publish() {
      const { nick_name, introduction, job, company, price } = this
      await editUser({
        nick_name, introduction, job, company
      })
      await editUserPrice({ price: price * 100 })
      this.$router.go(-1)
    }
  },

  components: {
    TabBar,
    IndexList
  }
}
</script>
<style lang="scss" scoped>
  .edit-container {
    padding: 58px 40px;
    text-align: center;
    font-size: 15px;
    background: #f5f5f5;
    min-height: 100vh;
    box-sizing: border-box;
    input, textarea, button {
      background-color: #f6f6f6;
      border: 0px;
      flex: 1;
    }
    input {
      height: 55px;
      margin-left: 10px;
    }
    .item {
      display: flex;
      text-align: left;
      align-items: center;
      border-bottom: 1px solid #f6f6f6;
      color: #5b5b5b;
      span {
        width: 100px;
      }
    }
    .item-textarea {
      margin-top: 16px;
      text-align: left;
      p {
        color: #5b5b5b;
      }
      textarea {
        width: 100%;
        height: 280px;
        margin: 16px 0;
        padding: 10px;
        box-sizing: border-box;
        background: #f0f0f0;
      }
    }
    button {
     width: 150px;
     height: 40px;
     margin: 30px 0;
     border-radius: 20px;
     box-shadow: 5px 5px 50px 0 rgba(123, 123, 123, 0.25);
     background-color: #56bbc6;
     color: #fff
    }
    .price-wrapper {
      text-align: left;
      h5 {
        font-size: 17px;
        color: #3a3a3a
      }
      .info {
        color: #5b5b5b;
        font-size: 14px;
        p {
          margin-bottom: 20px;
          span {
            color: #51bbc7
          }
        }
      }
      .button-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 150px;
        .prev {
          background: #fff;
          color: #51bbc7;
        }
      }
      button {
        flex: 0 1 45%
      }
    }
    .price {
      width: 100%;
      height: 44px;
      border-radius: 10px;
      background-color: #ffe9b8;
      padding-left: 10px;
      margin: 17px 0 40px;
      color: #b77637;
      input {
        height: 100%;
        background: #ffe9b8;
        box-sizing: border-box;
        color: #b77637;
      }
      input::-webkit-input-placeholder {
        color: #b77637;
      }
    }
  }
</style>
