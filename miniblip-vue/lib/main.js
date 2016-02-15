// Load native UI library
var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)

// Get the current window
var win = gui.Window.get();

// Listen to the minimize event
win.on('minimize', function() {
  console.log('Window is minimized');
});

// Minimize the window
win.minimize();


function add_item_to_firmware_list(obj, isRemote) {
	console.log("added " + obj.name);
	var file_url = "";

	if (isRemote) {
		file_url = get_remote_firmware_url(obj.name);
	} else {
		file_url = get_local_firmware_path(obj.name);
	}


	$item = $('<div class="item" id = '+obj.id +'><div class="name">' + obj.name +'</div><div class="author">'+obj.author+'</div></div>');

	$("#firmware-list #list").append($item)

	$item.click(function() {
		$(".item").removeClass("selected");
		$(this).addClass("selected");
		var $div = $("#firmware-upload-section #action");

		$div.fadeOut("500", function() {
			$div.find(".name").text(obj.name);
			$div.find(".author").text(obj.author);
			$div.find(".source a").attr("href", obj.source);
			$(this).fadeIn("500");
		});

		$div.find("#upload").click(function() {

			if (isRemote) {
				download_firmware(obj, function(isOk, local_path) {
					if (isOk) upload_firmware(local_path);
				});
			} else {
				upload_firmware(file_url, "/dev/sdb");
			}
		});
	});
}

function show_section_firmware_list() {
	$("#main #firmware-list").show();
}

function show_section_code() {
	$("#main #editor-container").show();
}

function bind_buttons() {
	$("#toolbar #list").click(function() {
		hide_all_sections();
		show_section_firmware_list();
	});

	$("#toolbar #console").click(function() {
		hide_all_sections();
		$("#main #console").show();
	});

	$("#toolbar #code").click(function() {
		hide_all_sections();
		show_section_code();
	});
}

function bind_drag_and_drop_area() {
	var holder = document.getElementById('board');
	holder.ondragover = function () { this.className = 'hover'; return false; };
	holder.ondragleave = function () { this.className = ''; return false; };
	holder.ondrop = function (e) {
	  e.preventDefault();

	  for (var i = 0; i < e.dataTransfer.files.length; ++i) {
	    upload_firmware(e.dataTransfer.files[i].path);
	  }
	  return false;
	};
}


function hide_all_sections() {
	$("#main #editor-container").hide();

}

function show_section() {


}

//interval of given delay, will execute callback with [true] or [false] as param
function check_serial_connected(delay, callback) {
	setInterval(function(){
		var cmd = "ls /dev/ttyACM*";
		try {
			var res = require('child_process').execSync(cmd, {
				stdio: "pipe",
				stderr: "pipe"
			}).toString();

		if (!res || res.length === 0 || res === undefined) res = false;
		else res = true;
		}
		catch (err){
			res = false;
		}
		callback(res);
	},delay);
}
