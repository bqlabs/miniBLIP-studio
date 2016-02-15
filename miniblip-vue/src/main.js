import Vue from 'vue'
import { domain, fa_icon } from './filters'
import App from './App'
import './assets/css/font-awesome/css/font-awesome.min.css'
import Router from 'vue-router'
import Loader from './components/Loader.vue'
import Editor from './components/Editor.vue'
import FileManager from './components/FileManager.vue'
import $ from 'jquery'

$(document).ready(function () {
  console.log('ready!')
})

// register filters globally
Vue.filter('domain', domain)
Vue.filter('fa_icon', fa_icon)

// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({

  '/loader': {
    name: "loader",
    component: Loader
  },
  '/editor': {
    name: "editor",
    component: Editor,
    subRoutes: {
      '/': {
        component: {
          template: 'nada de nada {{$route.params | json}}'
        }
      },
      '/files': {
        component: FileManager
      }
    }
  }

})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '/': '/loader'
})

router.start(App, '#app')
