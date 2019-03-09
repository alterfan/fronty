(function(){
	window.onerror = function(message, url, lineNumber) {  
		var message = arguments[0];
		var url = arguments[1];
		var lineNumber = arguments[2];
		var err = ' ' + message;
		err += '<br/>Line: ' + lineNumber;
		err += '<br/>URL: ' + url;
		debugLog('ERROR', err);
		return true;
	}; 

	// Convert js objects to their string representation
	function _toString(obj) {
		if (obj == Infinity) {
			return "Infinity";
		} else if (obj == NaN) {
			return "NaN";
		} else if (typeof obj === 'string' && obj.length === 0) {
			return "&lt;empty string&gt;";
		} else if (typeof obj === "undefined") {
			// undefined needs to be checked before null, because checking if an undefined value is null returns true.
			return "undefined";
		} else if (obj == null) {
			return "null";
		}
		return obj;
	}

	function getObjectValues(obj) {
		var arr = [];
		for(var key in obj) {
			arr.push(_toString(obj[key]));
		}
		return arr;	
	}

	function debugLog(level, args) {
		var msg = '';
		if(typeof args === 'string') {
			msg = args;
		} else {
			msg = getObjectValues(args);
		}

		if (!$('#debugMessages').length) {
			$('<div id="debugMessages" style="background:#fff; margin-top:10px; border:1px solid #000; color:#000; clear:both; padding: 2px;"><h4 style="color:#000;">DEBUG MESSAGES</h4></div>').appendTo('body');
		}
		if (level === undefined) {
			level = '';
		}
		var color = '#000';
		switch (level.toUpperCase()) {
			case 'INFO':
				color = 'blue';
				break;
			case 'WARN':
				color = 'orange';
				break;
			case 'ERROR':
				color = 'red';
				break;
			default:
				level = 'log';
		}
		var levelMsg = level === '' ? '' : '[' + level.toUpperCase() + '] ';
		$('<p style="color:' + color + '; margin-top:5px; margin-bottom:5px;">' + levelMsg + msg + '</p>').appendTo('#debugMessages');
	}

	function reassignConsoleLogs() {
		if (window.console) {
			console.warn('NOTE: console.log() statements are being displayed on the page.');
			console = {
				log: function() {
					debugLog('log', arguments);
				}, 
				debug: function() {
					debugLog('debug', arguments);
				},
				info: function() {
					debugLog('info', arguments);
				}, 
				warn: function() {
					debugLog('warn', arguments);
				},
				error: function() {
					debugLog('error', arguments);
				}
			};
		}
	}

	reassignConsoleLogs();

})()
