<template>
  <div class="loader">
		<div id = "firmware-upload-section">

			<div id="action">
				<div class="info">
					  <div class="heading">
					    <div class="name"></div>
					    <div class="author"></div>
					    <div class="source"><a target = "_blank" href="">source</a></div>
					  </div>
					<div id="description"></div>
				</div>

				<button id = "upload"> upload firmware </button>
			</div>

			<div id = "firmware-list">
				<h1> FIRMWARES </h1>
				<div id = "list"> </div>
			</div>

		  <div id = "board">
				<img src="../assets/images/miniblip_board.png">
				<h1 id = "info"> </h1>
			</div>

		</div>

  </div>
</template>

<script>
export default {
  name: 'Loader',
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>
