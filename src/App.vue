<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { weixinConfig } from '@/api/user'

export default {
  name: 'App',
  async mounted() {
    const { app_id, nonce_str, signature, timestamp } = await weixinConfig()
    console.log(app_id, nonce_str, signature, timestamp, '=====')
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: app_id, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonce_str, // 必填，生成签名的随机串
      signature: signature, // 必填，签名
      jsApiList: ['previewImage', 'chooseWXPay', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表,
    })
    wx.error(function(res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log(res, '===========')
    })
  }
}
</script>
<style lang="scss">
html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video {
	margin:0;
	padding:0;
	/*border:0;
	*/
    /*outline:0;
	*/
    /*font-size:100%;
	vertical-align:baseline;
	background:transparent;
	*/
  font-family: PingFangSC;
}

h1,h2,h3,h4,h5,h6,em,i {
	font-style:normal;
}
ul,ol,li {
	list-style-type:none;
}
a {
	color:#666;
	text-decoration:none;
	outline:0;
}
a:hover {
	text-decoration:none;
}

.flex {
  display: flex
}

.flex-1 {
  flex: 1
}

.blue {
	color: #51bbc7
}

</style>
