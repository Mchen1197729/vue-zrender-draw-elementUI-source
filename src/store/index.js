import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

//声明使用Vuex
Vue.use(Vuex)

//直接导出store对象
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
