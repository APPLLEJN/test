<!-- home -->
<template>
  <div class="com-container">
    <nav-bar></nav-bar>
    <div class="warpper">
      <van-tabs :background="'#f6f6f6'"
        :title-active-color="'#51bbc7'"
        :title-inactive-color="'#646464'"
        :color="'#51bbc7'" v-model="active">
        <van-tab title="收到的">
          <com-list :type="'receive'"></com-list>
        </van-tab>
        <van-tab title="发起的">
          <com-list :type="'send'"></com-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import ComList from '@/components/ComList'

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    }
  },

  components: {
    NavBar,
    ComList
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
<style lang="scss" scoped>
  .com-container {
    padding: 16px 22px;
  }
</style>
