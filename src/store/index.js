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
    },
    setUserName(state,name){
      state.user.name = name
    },
    setUserLast(state,user1){
      state.user1 = user1
    }
  },
  actions: {
  },
  modules: {
  }
})
