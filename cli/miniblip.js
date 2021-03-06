var miniblip = require('./lib/miniblip_lib.js');
var program = require('commander');
var blessed = require('blessed');
 

program
  .version('0.0.1')
  .usage('[options] <file>')
  .description('CLI to flash&play with the MINIBLIP board by BQ.com')
  .option('-b, --board', 'List detected board')
  .option('-f, --flash', 'Flash .bin in the board')
  .option('-l, --list', 'List available .hex files')
  .option('-d, --download', 'Download a .hex file')
  .option('-df, --auto [remote]', 'Check, Download and flash a board given a remote .hex')
  .option('-u --textui', 'Use a text based interface')
  .parse(process.argv);

//show by default the help section
//if (!program.args.length) program.help();
 
//check if board is plugged 
if (program.board) {
	miniblip.detect_board(function(err, res) {
		if(err || !res || res.length===0) { 
			console.log("Miniblip not found");
		} else {
			console.log("Miniblip found");
		}
	});
}

//flash a given .bin into the board
if (program.flash) {
	if(program.args.length !== 1) {
		console.log("Introduce just one .bin to flash");
	} else {
		console.log('Flashing %s in Miniblip', program.args);
		miniblip.load_firmware(program.args[0], function(err) {
			if (!err) { console.log("flashed")
			} else { console.log(err); }
		});
	}
}


//list .hex binaries 
if (program.list) {	
	var data = miniblip.get_list_firmwares_remote(function(data) {
		var data2 = [];
		for (var i in data) {
		  data2.push(data[i].name);
		}

		console.log(data);
	});
}

if (program.textui) {
	// Create a screen object.
	var screen = blessed.screen({
	  smartCSR: true
	});

	screen.title = 'Miniblip';

	var list = blessed.list({
		top:'center',
		left:'center',
		width:'60%',
		height:'80%',
		padding:'3',
		input:true,
		keys: true,
		border: {
			type: 'line'
		},
		style:{fg:'white', bg:'blue'}
	});

	list.on('select', function(item, index) {
		console.log(lastUpdatedList[index]);
		miniblip.download_firmware(lastUpdatedList[index], function(isOk, local_path) {
			if (isOk) miniblip.load_firmware(local_path, function(err) {
				console.log(err);
			});
		});
	});

	var lastUpdatedList;
	miniblip.get_list_firmwares_remote(function(data) {
		lastUpdatedList = data;
		for (var i in data) {
			list.pushItem(data[i].name)
			console.log(data[i].name);
		}
	});
	screen.append(list);

	// Quit on Escape, q, or Control-C.
	screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	  return process.exit(0);
	});

	screen.render();
}


//download a given .hex name
if (program.download) {
	console.log('Downloading...');

	console.log('Checking MD5');

	console.log('OK');
}



if (program.auto) console.log('list');
