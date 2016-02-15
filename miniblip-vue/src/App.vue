<template>
  <div id="wrapper">
    <navigation></navigation>

    <div id = "main_container">
      <!-- main view -->
      <router-view
        class="view"
        keep-alive
        v-transition="staggered"
        stagger="100"
        transition="expand"
        transition-mode="out-in">
      </router-view>

      <banner v-if="$route.name === 'editor' " transition="banner-anim">El editor/compilador offline podria funcionar, pero aun no lo hace! echas una mano? <a href="https://github.com/hack-miniblip/hack-miniblip.github.io"> Hack MiniBlip </a></banner>
    </div>


  </div>
</template>

<script>
import Navigation from './components/Navigation'
import Loader from './components/Navigation'
import Banner from './components/Banner'

export default {
  components: {
    Navigation,
    Loader,
    Banner
  }
}
</script>

<style src="./assets/css/reset.css"></style>
<style src="./assets/css/main.less" lang="less"></style>

<style lang="less">
body {
  font-family: Helvetica, sans-serif;
  overflow: hidden;
}

/* always present */
.expand-transition {
  transition: all .2s ease;
}

/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  transform: translate3d(100px, 0, 0); //top: -120px;
  opacity: 0;
}

.banner-anim-enter, .banner-anim-leave {
  transform: translate3d(0px, 120px, 0); //top: -120px;
  opacity: 0;
}




</style>
