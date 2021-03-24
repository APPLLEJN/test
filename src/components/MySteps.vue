<template>
  <div class="mysteps">
    <div class="flex">
      <div class="mystep-wrapper" v-for="(t, index) in new Array(4)" :key="index">
        <div :class="index <= curIndex ? 'step on': 'step'"></div>
      </div>
    </div>
    <div class="text">{{text}}</div>
  </div>
</template>
<script>

export default {
  props: {
    curIndex: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    }
  },
  components: { },
  methods: {
    back() {
      this.$router.go(-1)// 返回上一层
    }
  }
}
</script>
<style lang="scss" scoped>
  .mysteps {
    width: 170px;
    height: 41px;
    margin: 0 auto;
    padding: 8px 20px 2px;
    background: #e7f2f3;
    border-radius: 20px;
    box-sizing: border-box;
    text-align: center;
    .mystep-wrapper {
      flex: 1;
    }
    .step {
      width: 9px;
      height: 9px;
      border-radius: 9px;
      background: #acacac;
      margin: 0 auto;
      &.on {
        background: #51bbc7;
      }
    }
    .text {
      margin-top: 2px;
      color: #51bbc7;
    }
  }

</style>
