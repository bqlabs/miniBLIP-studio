<template>

  <!-- navigation -->

  <div id = "toolbar">
    <ul>
      <li id = "list" v-link="{ path: '/loader' }"> <i class="fa fa-list fa-2x"></i> <p>Firmwares</p> </li>
      <li id = "code" v-link="{ path: '/editor' }"> <i class="fa fa-code fa-2x"></i> <p>Editor</p> </li>
      <li class = "disabled" id = "console"> <i class="fa fa-terminal fa-2x"></i> <p>Consola</p></li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>
