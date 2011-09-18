	function connect(receive) {
		var url = "http://"+config.proxy_host+":"+config.proxy_port +"/";

		var socket = io.connect(url);
		  socket.on('connect', function () {
			console.log("Connected to "+url)
		    socket.on('message', function (msg) {
		      receive(msg)
		    });
			socket.on('disconnect', function(x) { console.log("disconnect "+x); });
			socket.on('reconnect', function(x) { console.log("reconnect "+x); })
		  });
		return socket;
	}

var	IAC = {
//		IAC : "\uFF",
		SB : "\uFFFA",
	    SE : "\uFFF0",
		WILL : "\uFFFB",
		WONT : "\uFFFC",
		DO : "\uFFFD",
		DONT : "\uFFFE",
		EOR : "\x19"
	}

function char2hex(d) { 
	return d ? d.charCodeAt(0).toString(16) : undefined; 
}
var TELNET_RE = new RegExp("(?:("+IAC.WILL+"|"+IAC.WONT+"|"+IAC.DO+"|"+IAC.DONT+")("+".)|"+IAC.SB+"(.)(.+?)"+IAC.SE+")","g")
function extractIAC(line) {
	var match, found;
	while (match = TELNET_RE.exec(line)) {
		console.log("OP: "+char2hex(match[1])+" VALUE: "+char2hex(match[2])+" SB OP: "+char2hex(match[3])+" VALUE: "+match[4]);
		found = true;
	}
	if (found) {
		return line.replace(TELNET_RE,"");
	}
	return line;
}