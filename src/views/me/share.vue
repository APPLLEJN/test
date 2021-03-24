<!-- home -->
<template>

  <div class="share-container">
    <nav-bar></nav-bar>
    <h1>分享者专属引荐码</h1>
    <p>骇客白为了交流的质量采取邀请制，您是认证分享者，拥有5枚邀请码，请分享给您觉得具备分享技能、专业能力的朋友</p>
    <div class="card">
      <p class="item title">{{name}}的分享者专属邀请码</p>
      <div class="item">
        <van-image
         round
         width="66px"
         height="66px"
         fit="cover"
         :src="avatar"
         />
        <div>
          <h1>{{data.code}}</h1>
          <span>已邀请 {{data.used_count}} 人，还可以邀请 {{data.left_count}} 人</span>
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <button>复制分享</button>
      <button @click="show = true">分享</button>
    </div>
    <div>
      <div v-for="item in data.invitees">
        <div class="invitee_wrapper">
          <van-image
              round
              width="31px"
              height="31px"
              fit="cover"
              :src="item.avatar"/>
          <div>
              <span>{{item.nick_name}}</span>,
              {{item.company}} | {{item.job}}
            <p>{{item.invite_date}}</p>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show">
      <div class="wrapper" @click="show = false">
        <div class="block">
          发送给朋友
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { getInvite, getInvites, createInvite } from '@/api/user.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      data: {},
      list: [],
      avatar: '',
      name: '',
      show: false,
      finished: false
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
        const data = await getInvite()
        const data2 = await createInvite()
        const detail = await getInvites()
        this.data = detail
        this.avatar = this.GLOBAL.me.avatar
        this.name = this.GLOBAL.me.nick_name
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      await this.initData()
      // 加载状态结束
      // this.loading = false;
      // this.finished = true;

      // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
      wx.ready(() => { // 需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: 'test', // 分享标题
          desc: 'test', // 分享描述
          link: 'http://web.hackerby.com/sharecode?id=' + this.data.code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.avatar, // 分享图标
          success: function(res) {
            console.log(res, '=====success')
            // 设置成功
          },
          fail: function(res) {
            console.log(res, '=====fail')
          }
        })
      })
    },
    share() {

    }
  },

  components: {
    NavBar
  }
}
</script>
<style lang="scss" scoped>
.share-container {
  padding: 15px 20px;
  font-size: 14px;
  h1 {
    font-size: 16px;
    margin: 20px 0 14px;
  }
  p {
    color: #7f7f7f;
  }
  .card {
    height: 166px;
    box-sizing: border-box;
    padding: 15px 0 30px;
    margin: 20px 0 22px;
    border-radius: 10px;
    box-shadow: 5px 5px 17px 0 rgba(123, 123, 123, 0.25);
    background-image: linear-gradient(100deg, #51bbc7, #51bbc7 32%, #49aeec);
    color: #fff;
    p {
      color: #fff;
    }
    .item {
      padding: 0 20px;
      display: flex;
      align-items: center;
      h1 {
        font-size: 60px;
        margin: 0 10px;
      }
      span {
        display: block;
        background: #fff;
        border-radius: 10px;
        color: #8d8d8d;
        padding: 0 10px;
      }
      &.title {
        padding-bottom: 15px;
        border-bottom: 2.5px solid #fff;
      }
    }
  }
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    button {
      width: 150px;
      height: 40px;
      margin: 30px 0;
      border-radius: 20px;
      box-shadow: 5px 5px 50px 0 rgba(123, 123, 123, 0.25);
      background-color: #56bbc6;
      color: #fff;
      flex: 0 1 45%;
      border: 0;
    }
  }
  .wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    height: 100%;
  }

  .block {
    padding: 20px 25px;
    border-radius: 10px;
    background-color: #fff;
    margin: 20px;
    position: relative;
    &::after {
      content: '';
      width: 10px;
      height: 10px;
      position: absolute;
      background: #fff;
      top: -5px;
      right: 20px;
      transform: rotate(45deg);
    }
  }
  .invitee_wrapper {
    display: flex;
    align-items: flex-start;
    .van-image {
      margin-right: 10px;
    }
    span {
      color: #51bbc7
    }
  }
}
</style>
