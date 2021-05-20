import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      stuNumber:'',
    }
  },
  mutations: {
    setUser(state,stuNum){
      state.user.stuNumber = stuNum
    }
  },
  actions: {
  },
  modules: {
  }
})
