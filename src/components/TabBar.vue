<template>
  <div>
    <van-tabbar fixed route v-model="active" @change="handleChange" active-color="#51bbc7" inactive-color="#7a7a7a">
      <van-tabbar-item v-for="(item, index) in data" :to="item.to" :icon-prefix="item.icon" :key="index">
        {{ item.title }}
        <template #icon="props">
          <van-icon :class-prefix="item.icon" size="20" />
       </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
  props: {
    defaultActive: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => {
        return [
          {
            title: '首页',
            to: {
              name: 'Home'
            },
            icon: 'iconfont icontansuo'
          },
          {
            title: '关于我',
            to: {
              name: 'Me'
            },
            icon: 'iconfont iconwode'
          }
        ]
      }
    }
  },
  data() {
    return {
      active: this.defaultActive
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
