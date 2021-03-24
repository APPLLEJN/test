<!-- home -->
<template>
  <div class="appo-container">
    <nav-bar v-if="meet.status">
      <my-steps slot="content" :curIndex="statusTypes[meet.status].num" :text="statusTypes[meet.status].text"/>
    </nav-bar>
    <!-- <div class="">
      <van-steps class="step-wrapper">
        <van-step class="step-item on"></van-step>
        <van-step class="step-item"></van-step>
        <van-step class="step-item"></van-step>
        <van-step class="step-item"></van-step>
      </van-steps>
    </div> -->
    <div class="card-header" v-if="type === 'send'">
      <van-image
         round
         width="66px"
         height="66px"
         fit="cover"
         :src="hacker.avatar"
       />
       <div class="item-title flex-1">
         <h6>{{hacker.nick_name}}</h6>
         <p>{{hacker.job}}</p>
         <p>{{hacker.company}} | {{hacker.introduction}}</p>
       </div>
       <div>¥{{hacker.price /100}}</div>
    </div>
    <span v-if="meetmessage.length" class="info">
      <van-image
         round
         width="20px"
         height="20px"
         fit="cover"
         src="https://img.yzcdn.cn/vant/cat.jpeg"
       />
      {{meetmessage[0].info}}
    </span>
    <div class="info-wrapper">
      <div class="item-textarea">
        <p>自我介绍</p>
        <div>{{meet.introduction}}</div>
      </div>
      <div class="item-textarea">
        <p>想要交流和咨询的问题</p>
        <div class="">
          {{meet.question}}
        </div>
      </div>
      <div class="item-textarea">
        <p>可选时间</p>
        <div class="">
          {{meet.appointment}}
        </div>
      </div>
    </div>
    <div v-for="(item, index) in meetmessage" :key="item">
      <div class="info" v-if="index !== 0">{{item.info}}</div>
    </div>
    <div class="comment" v-if="type=='send' && meet.status ==='finish'">
      <p>给分享者写“注释”</p>
      <textarea name="" id="" cols="30" rows="10" placeholder="写一个聊后感（这次聊下来的收获是什么？帮助自己记录，也帮助后来者了解专家）" v-model="content"></textarea>
    </div>
    <div v-if="type=='send' && meet.status ==='over'">

    </div>
    <div v-if="type=='send'">
        <div class="button-wrapper" v-if="meet.status == 'unconfirmed' ">
          <button type="button" name="button" @click="ask">咨询顾问</button>
          <button type="button" name="button" @click="cancel">取消</button>
        </div>
        <div class="button-wrapper" v-if="meet.status == 'cancel' ">
          <button type="button" name="button" @click="ask">咨询顾问</button>
          <button type="button" name="button">已取消</button>
        </div>
        <div class="button-wrapper" v-if="meet.status == 'confirmed' ">
          <button type="button" name="button" @click="ask">咨询顾问</button>
          <button type="button" name="button" @click="pay">待支付</button>
        </div>
        <div class="button-wrapper" v-if="meet.status == 'paid' ">
          <button type="button" name="button" @click="ask">咨询顾问</button>
          <button type="button" name="button" @click="finish">确认完成</button>
        </div>
        <div class="button-wrapper" v-if="meet.status == 'finish' ">
          <button type="button" name="button" @click="comment">提交注释</button>
        </div>
        <div class="button-wrapper" v-if="meet.status == 'over' "></div>
    </div>
     <div v-if="type=='receive'">
        <div class="button-wrapper" v-if="meet.status == 'unconfirmed' ">
          <button type="button" name="button" @click="refuse">拒绝</button>
          <button type="button" name="button" @click="confirm">接受预约</button>
        </div>
        <div class="button-wrapper" v-else>
          <button type="button" name="button" @click="ask">咨询顾问</button>
        </div>
    </div>
    <van-overlay :show="showConsultant">
      <div class="wrapper" @click="showConsultant = false">
        <div class="block">
          <div>
            添加骇客白预约顾问，协助您完成与{{hacker.nick_name}}的线上交流
          </div>
          <img :src="require('@/assets/images/wx.png')" alt="">
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
// 请求接口
import { getMeet, comment, meetConfirm, meetRefuse, meetCancel, meetFinish, weixinPay, getMeetMessage } from '@/api/user.js'
import { getDetail } from '@/api/home.js'
// import { mapGetters } from 'vuex'
import NavBar from '@/components/NavBar'
import MySteps from '@/components/MySteps'

export default {
  data() {
    return {
      meet: {},
      hacker: {},
      meetmessage: {},
      wechat: `${this.$cdn}/wx/640.gif`,
      statusTypes: {
        unconfirmed: {
          text: '待接收',
          num: 0
        },
        cancel: {
          text: '用户取消',
          num: 3
        },
        confirmed: {
          text: '待支付',
          num: 1
        },
        refused: {
          text: '行家拒绝',
          num: 3
        },
        paid: {
          text: '学员已支付, 交流中',
          num: 2
        },
        refunding: {
          text: '退款中',
          num: 3
        },
        refunded: {
          text: '已退款',
          num: 3
        },
        finish: {
          text: '完成约见,未评论',
          num: 3
        },
        over: {
          text: '已评论,流程结束',
          num: 3
        }
      },
      type: this.$route.query.type,
      showConsultant: false
    }
  },
  components: {
    NavBar,
    MySteps
  },
  computed: {
    // ...mapGetters(['userName'])
  },
  mounted() {
    console.log(this, '----')
    this.initData()
  },
  methods: {
    // 请求数据案例
    async initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      console.log(this.$route, '=====')
      console.log(this.GLOBAL.me.level)
      const res = await getMeet(this.$route.params.id)
      const hacker = await getDetail(res.meet.hacker_id)
      const meetmessage = await getMeetMessage(this.$route.params.id)
      this.meet = res.meet
      this.hacker = hacker
      this.meetmessage = meetmessage
    },
    async pay() {
      const res = await weixinPay(this.$route.params.id)
      wx.chooseWXPay({
        timestamp: res.timestamp,
        nonceStr: res.nonce_str,
        package: res.package,
        signType: res.sign_type,
        paySign: res.pay_sign,
        success: () => {
          console.log('支付成功')
          this.meet.status = 'paid'
        }
      })
    },
    async confirm() {
      await meetConfirm(this.$route.params.id)
      this.meet.status = 'confirmed'
    },
    async refuse() {
      await meetRefuse(this.$route.params.id)
      this.meet.status = 'refused'
    },
    async cancel() {
      await meetCancel(this.$route.params.id)
      this.meet.status = 'cancel'
    },
    async finish() {
      await meetFinish(this.$route.params.id)
      this.meet.status = 'finish'
    },
    ask() {
      this.showConsultant = true
    },
    test() {
      console.log('enter=======')
    },
    async comment() {
      await comment(this.$route.params.id, { content: this.content })
      this.meet.status = 'over'
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

  .item-textarea {
    margin-top: 20px;
    text-align: left;
    p {
      text-align: left;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    textarea {
      width: 100%;
      margin: 16px 0;
      padding: 10px;
      box-sizing: border-box;
    }
  }
  button {
   width: 150px;
   height: 40px;
   margin: 30px 0;
   border-radius: 20px;
   box-shadow: 5px 5px 50px 0 rgba(123, 123, 123, 0.25);
   background-color: #56bbc6;
   color: #fff;
   display: block;
   margin: 0 auto;
  }

  .card-header {
    background-color: #fff;
    border-radius: 10px;
    padding: 18px 14px;
    margin: 20px 0;
    display: flex;
    color: #000;
    text-align: left;
    box-shadow: 8px 8px 50px 0 rgba(122, 122, 122, 0.25);
    .item-title {
      flex: 1;
      margin-left: 18px;
      h6 {
        font-size: 17px
      }
    }
  }
  .info {
    padding: 5px 10px;
    background: #e7f2f3;
    border-radius: 10px;
    margin-bottom: 16px;
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    .van-image {
      margin-right: 5px;
    }
  }
  .info-wrapper {
    background: #fff;
    box-shadow: 3px 3px 16px 0 rgba(122, 122, 122, 0.25);
    border-radius: 10px;
    padding: 1px 18px 16px;
    margin: 26px 0;
  }
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    button {
      flex: 0 1 45%
    }
  }
  .comment {
    background: #fff;
    border-radius: 10px;
    box-shadow: 8px 8px 50px 0 rgba(122, 122, 122, 0.25);
    padding: 20px;

    textarea {
      height: 150px;
      margin-top: 20px;
      background: #f0f0f0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    color: #000;
    width: 220px;
    img {
      width: 130px;
      height: 130px;
      margin-top: 22px;
    }
  }
}
</style>
