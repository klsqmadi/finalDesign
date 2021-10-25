import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      stuNumber:'',
    },
    token: '',
    latitude: '',
    longitude: ''
  },
  mutations: {
    setLL(state, obj) {
      let { latitude, longitude} = obj
      state.latitude = latitude
      state.longitude = longitude
    },
    token(state, token) {
      state.token = token
    },
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
