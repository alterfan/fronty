var fs       = require('fs'),
	plist    = require('plist'),
	path     = require('path'),
	optimist = require('optimist');

var argv = optimist.alias({'c': 'compile', 'o': 'output', 'w': 'watch', 'e': 'extension'}).default({'c':'.','e':'tmTheme'}).boolean('w').check(function(args) {
	return typeof args.c === 'string';
}).argv;

function TTheme() {
	this._compile = argv.compile;
	this._output = argv.output;
	this.watch = argv.watch;

	this.compile();
}

TTheme.prototype.error = function(msg) {
	console.log(msg);
	process.stderr.write(msg);
};

TTheme.prototype.log = function(msg) {
	process.stdout.write(msg);
};

TTheme.prototype.watch = function() {
	this.log('Watching ' + this._compile);

	fs.watchFile(this._compile, function(curr, prev) {
		if(+curr.time != +prev.time) {
			this.log('Change detected. Recompiling.');
			this.compile();
			this.log('Done.\n');
		}
	}.bind(this));
};

TTheme.prototype.build = function(filepath) {
	filepath = path.resolve(filepath);

	delete require.cache[filepath];

	var scheme = require(filepath);

	return plist.build(scheme).toString();
};

TTheme.prototype.compile = function() {
	if(fs.lstatSync(this._compile).isDirectory()) {
		this.compileDir(this._compile);
	}else{
		this.compileFile(this._compile);
	}
};

TTheme.prototype.compileDir = function(dirpath) {
	for(var fname in fs.readdirSync(dirpath)) {
		if(fname.substr(-13) == '.ttheme.js') {
			filepath = dirpath + "/" + fname;

			this.compileFile(filepath);
		}
	}
};

TTheme.prototype.compileFile = function(filepath) {
	var filename = path.basename(filepath, '.ttheme.js');

	outdir = this._output || path.dirname(filepath);

	outfile = outdir + '/' + filename + '.' + argv.extension;

	contents = this.build(filepath);

	fs.writeFile(outfile, contents, function(err) {
		if(err) this.error(err);
	}.bind(this));
};

new TTheme();