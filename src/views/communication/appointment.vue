<!-- home -->
<template>
  <div class="appo-container">
    <nav-bar>
      <template v-slot:content>
        <my-steps :curIndex="0" :text="'填写预约信息'"/>
      </template>
    </nav-bar>
    <div class="item-textarea">
      <p>自我介绍</p>
      <textarea placeholder="你会怎么介绍自己" name="name" rows="8" cols="80" v-model="introduction"></textarea>
    </div>
    <div class="item-textarea">
      <p>想要交流和咨询的问题</p>
      <textarea placeholder="如何能获得职位的提升。技术好并不一定是一个好的领导者，对于职业的分化 技术路线 或者 管理路线。有什么建议，以及需要达到哪方面的能力。" name="name" rows="8" cols="80" v-model="question"></textarea>
    </div>
    <div class="item-textarea">
      <p>可选时间</p>
      <textarea placeholder="本周四（23日）晚上19:00-20:00我时间可以，或者本周五（24日）晚上" name="name" rows="8" cols="80" v-model="appointment"></textarea>
    </div>
    <button class="btn" type="button" name="button" @click="booking">提交预约</button>
  </div>
</template>

<script>
// 请求接口
import { getUserInfo, booking } from '@/api/user.js'
import { mapGetters } from 'vuex'
import NavBar from '@/components/NavBar'
import MySteps from '@/components/MySteps'

export default {
  data() {
    return {
      appointment: '',
      introduction: '',
      question: '',
      active: 0,
      wechat: `${this.$cdn}/wx/640.gif`
    }
  },
  components: {
    NavBar,
    MySteps
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 请求数据案例
    initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      // const params = { user: 'sunnie' }
      // getUserInfo(params)
      //   .then(() => { })
      //   .catch(() => { })
    },
    async booking() {
      const { question, introduction, appointment } = this
      const res = await booking(this.$route.params.id, { question, introduction, appointment })
      this.$router.push(`/meet/${res.meet_id}/status?type=send`)
      
      console.log(res, 'res')
    }
  }
}
</script>
<style lang="scss">
.appo-container {
  padding: 16px 30px;
  .step-wrapper {
    padding: 0px 30px;
    background: #e7f2f3;
    width: 170px;
    height: 40px;
    margin: 0 auto;
    border-radius: 20px;
    .van-steps__items {
      margin-top: -10px;
    }
    .van-step__title {
      display: none;
    }
    .step-item {
      background: #e7f2f3;
      .van-step__circle-container {
        background: #e7f2f3;
      }
      .van-step__circle {
        width: 10px;
        height: 10px;
      }
    }
  }
  input, textarea, button {
    background-color: #f6f6f6;
    border: 0px;
    flex: 1;
  }
  p {
    text-align: center;
  }
  .item-textarea {
    margin-top: 25px;
    text-align: left;
    p {
      text-align: left;
      font-size: 15px;
      font-weight: 600;
    }
    textarea {
      width: 100%;
      margin: 16px 0 0;
      padding: 10px;
      box-sizing: border-box;
      font-size: 13px;
      height: 110px;
      background: #f0f0f0;
      border-radius: 8px;
    }
  }
  button {
   width: 200px;
   height: 50px;
   margin: 30px auto;
   border-radius: 40px;
   box-shadow: 5px 5px 50px 0 rgba(123, 123, 123, 0.25);
   background-color: #56bbc6;
   color: #fff;
   display: block;
   font-size: 15px;
  }
}
</style>
