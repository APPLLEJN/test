const state = {
  userName: '',
  list: []
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_LIST(state, list) {
    list.map(item => {
      state.list.push(item)
    })
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  setList({ commit }, list) {
    commit('SET_LIST', list)
  },
}
export default {
  state,
  mutations,
  actions
}
