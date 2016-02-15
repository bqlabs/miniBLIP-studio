<template>

    <tabs> </tabs>

  	<div id="editor_container">
			<div id = "actions">
				<ul>
					<li> <i class="fa fa-play-circle fa-2x"></i></li>
					<li> <i class="fa fa-stop-circle fa-2x"></i></li>
					<li> <i class="fa fa-arrow-circle-right fa-2x"></i></li>
				</ul>
			</div>

			<div id="editor">
{{msg}}
			</div>

       <router-view
           class="view"
           keep-alive
           v-transition="staggered"
           stagger="100"
           transition="expand"
           transition-mode="out-in">
       </router-view>

		</div>

</template>

<script>
//import Tabs from './Tabs'

export default {
  name: 'Editor',
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  ready () {
    console.log('editor loaded')
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.getSession().setMode('ace/mode/c_cpp')
    this.editor.setOptions({
      fontSize: '28pt'
    })

  },
  destroyed () {
    console.log('editor destroyed')
    this.editor.remove()
  }
}
</script>
<style>

</style>
