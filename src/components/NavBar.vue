<template>
  <div class="header flex">
    <svg-icon :iconClass="'back'" @click="$router.go(-1)" :size="35"/>
    <slot name="content"></slot>
    <router-link :to="{ path: '/home' }">
      <svg-icon :iconClass="'home'" :size="35" />
    </router-link>
  </div>
</template>
<script>

export default {
  components: { },
  methods: {
    back() {
      this.$router.go(-1)// 返回上一层
    }
  }
}
</script>
<style lang="scss" scoped>
  .header {
    justify-content: space-between;
    color: #e7e7e7;
    margin-bottom: 18px;
  }
</style>
