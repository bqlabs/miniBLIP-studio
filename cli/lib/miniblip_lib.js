// TODO 
// OK - GET REMOTE JSON
// OK - DOWNLOAD FILE ON ITEM CLICK 
// CHECK BOARD STATUS 
// UPLOAD FIRMWARE 
//

/* 
* Module dependencies 
*/
var fs = require("fs");
var https = require('https');
var md5 = require('md5');
var httpreq = require('httpreq');
var sudo = require('sudo-prompt');
var e = require('child_process');


/* 
* Expose the lib 
*/

exports = module.exports = new Miniblip();
exports.Miniblip = Miniblip;


function Miniblip() {
	this.portNames = ["CRP DISABLD", "MINIBLIP"]; //possible search names for miniblip port
}


Miniblip.prototype.detect_board = function() {
	return "/dev/ttyUSB1";
} 

Miniblip.prototype.upload_firmware = function(path_in) {
	var path_out = "/dev/sdb";
	var cmd_dd = "dd if="+path_in+" of="+path_out+" bs=512 seek=4 conv=notrunc";

	console.log(cmd_dd);


	var options = {
	  name: 'MiniBlip Studio',
	  onChildProcess: function(childProcess) {} // (optional)
	};
	sudo.exec(cmd_dd, options, function(error, stdout, stderr) {
		console.log("error " + error);
		console.log("stdout " + stdout);
		console.log("stderr " + stderr);
	})

	/*
	var execFile = require 
	    ('child_process').execFile, child;

	 child = execFile(cmd_dd,
	       function(error,stdout,stderr) { 
	    if (error) {
	      console.log(error.stack); 
	      console.log('Error code: '+ error.code); 
	      console.log('Signal received: '+ 
		     error.signal);
	      } 
	    console.log('Child Process stdout: '+ stdout);
	    console.log('Child Process stderr: '+ stderr);
	  }); 
	  child.on('exit', function (code) { 
	    console.log('Child process exited '+
		'with exit code '+ code);
	  });
	*/
} 


Miniblip.prototype.init_console = function(div) {


} 


Miniblip.prototype.get_list_firmwares_remote = function(fn) {
	var url = "https://raw.githubusercontent.com/hack-miniblip/apps/master/firmware_list.json"; 

	var data;
	httpreq.get(url, function(err, res) {
		data = JSON.parse(res.body);

		fn(data);
	});
}



Miniblip.prototype.get_local_firmware_path = function(firmware_name) {
	var base = process.cwd() + "/firmwares-prueba/";
	
	var path = base + "firmware_name";
	console.log(path);

	return path;
}

Miniblip.prototype.get_remote_firmware_url = function(name) {
	return "https://github.com/hack-miniblip/apps/raw/master/"+name+"/firmware.bin";
}

Miniblip.prototype.get_list_firmwares_local = function() {
	console.log(process.cwd());

	fs.readFile("firmwares.json", "utf8", function(error, data) {
		console.log(data);
		var obj = $.parseJSON( data );

		$.each(obj, function(i, value) {
			add_item_to_firmware_list(obj[i]);
		});
		//console.log(obj);
	});   
} 


Miniblip.prototype.download_firmware = function(obj, callback) {
	if (!fs.existsSync("./tmp")){
    		fs.mkdirSync("./tmp");
	}

	var from = this.get_remote_firmware_url(obj.name);
	var to = process.cwd() + "/tmp/" + obj.name+".bin";
	console.log("saving from: "+ from);
	console.log("saving to " + to );

	httpreq.download(from, to
	, function (err, progress){
	    if (err) return console.log(err);
	    console.log("downloading from " + progress);
	}, function (err, res){
	    if (err) return console.log(err);
	    //console.log(res);
	    var md5result;
            fs.readFile(to, function(err, buf) {
			if (md5(buf) == obj.md5) {
				console.log("md5 ok");
				md5result = true;
			} else {	
				console.log("md5 nop");
				md5result = false;
			}
			callback(md5result, to);
	    }); //readfile
	});
}




/*
* detect boards connected 
* @demiurgosoft
*/ 
Miniblip.prototype.detect_board = function(callback) {
	var cmd = "mount|grep -E \"" + this.portNames.join("|") + "\" | grep -Eo \"^[^ ]+\"";
	e.exec(cmd, function(err, stdout, stderr) {
		if (err) callback(err);
		else callback(stderr, stdout.replace(/\n$/, "").split("\n"));
	});
}

/*
* load firmware
* @demiurgosoft
*/
Miniblip.prototype.load_firmware = function(firmware_path, done) {
	this.detect_board(function(err, res) {
		if(err || !res || res.length===0) return done(new Error("Miniblip not found"));
		var cmd = "sudo dd if=" + firmware_path + " of=" + res[0] + " bs=512 seek=4 conv=notrunc";
		e.exec(cmd, function(err, stdout, stderr) {
			if (err) return done(err);
			else {
				e.exec("sudo umount " + res[0], function(err, stdout, stderr) {
					return done(err);
				});
			}
		});
	});
}

/*
* interval of given delay, will execute callback with [true] or [false] as param
*/
Miniblip.prototype.check_serial_connected = function(delay, callback) {
	setInterval(function(){
		var cmd = "ls /dev/ttyACM*";
		try {
			var res = e.execSync(cmd, {
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
