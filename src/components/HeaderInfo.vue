<template>
    <div class="card-header" :style="{color: color}">
      <van-image
        round
        width="66px"
        height="66px"
        fit="cover"
        :src="avatar"
      />
      <div class="item-title">
        <h6>{{title}}</h6>
        <p>{{des}}</p>
        <p>{{content}}</p>
      </div>
    </div>
</template>
<script>

export default {
  props: {
    avatar: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    des: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#fff'
    },
  },
  components: {  }
}
</script>
<style lang="scss" scoped>
    .card-header {
      height: 96px;
      border-radius: 11px 11px 0 0;
      padding: 18px 14px;
      display: flex;
      flex: 1;
      color: #fff;
      .item-title {
        flex: 1;
        margin-left: 18px;
        h6 {
          font-size: 17px
        }
      }
    }
</style>
