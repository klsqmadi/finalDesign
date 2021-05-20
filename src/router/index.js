import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import home from '../views/home.vue'
import subHome from '../components/subHome.vue'
import profile from '../components/profile.vue'
import circle from '../components/circle.vue'
import task from '../components/task.vue'
import publishTask from '../components/pubilshTask.vue'
import acceptTask from '../components/acceptTask.vue'
import createCircle from '../components/createCircle.vue'
import searchCircle from '../components/searchCircle.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    redirect: '/home/subHome',
    children: [{
        path: 'subHome',
        name: 'subHome',
        component: subHome
      },
      {
        path: 'profile',
        name: 'Profile',
        component: profile
      },
    ]
  },
  {
    path:'/circle',
    name:'circle',
    component:circle
  },
  {
    path:'/task',
    name:'task',
    component:task
  },
  {
    path:'/acceptTask',
    name:'acceptTask',
    component:acceptTask
  },
  {
    path:'/publishTask',
    name:'publishTask',
    component:publishTask
  },
  {
    path:'/createCircle',
    name:'createCircle',
    component:createCircle
  },
  {
    path:'/searchCircle',
    name:'searchCircle',
    component:searchCircle
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router