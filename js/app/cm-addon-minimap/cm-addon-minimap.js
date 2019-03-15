(function (mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("codemirror"))
	else if (typeof define == "function" && define.amd) // AMD
		define(["codemirror"], mod)
	else // Plain browser env
		mod(CodeMirror)
})((CodeMirror) => {
	/*----------  Global vars for multiple CodeMirror  ----------*/
	/*----------  alterfan edit  ----------*/
	window.activeInstance = null;
	window.miniMapElement = null;
	window.miniMapBarElement = null;
	function MiniMap(cm, options) {
		//we start assuming that we will use fractionalScrolling
		this.scrollNormally = false;
		this.options = this.miniMapDefaults;
		this.scrollElement = cm.getScrollerElement();
		extend(this.options, options);
		//get the scroll element we watch
		this.initScrollBar();
		//create and display the minimap
		if (activeInstance != cm.getWrapperElement()) {
			this.destroyMiniMap(cm)
			this._displayMiniMap();
			cm.setOption("onChange", this.mirrorContent(cm));
		}else{
			return
		}
		//match the content we're watching and create event functions
		//based on the content
		this.mirrorContent(cm);
		//register all the events
		this._registerEvents();
		this.miniMapElement = null
	}
	MiniMap.prototype = {
		miniMapElement: "MiniMap",
		miniMapBarElement: "MiniMapBar", //my edit
		scrollElement: this.scrollElement,
		initScrollBar: function () {
			//This will return the first match for the scrollBar selector
			this.scrollBar = this.scrollElement;
		},
		miniMapElement: this.miniMapElement,
		miniMapDefaults: {
			scrollBar: this.scrollElement,
			content: ".CodeMirror-lines",
			keepScripts: false,
			miniMapStyles: {
				//these styles can be overriden
				//in the constructor
				"width": "100px",
				"opacity": "0.5",
				"right": "0",
				"top": "0",
				"color": "#000",
				"fontSize": "4px",
				"lineHeight": "4px",
				"zIndex": "9",
				//these styles shouldn't need to be changed
				"cursor": "default",
				"position": "absolute",
				"overflow": "hidden"
			},
			miniMapBarStyles: {
				//these styles can be overriden
				//in the constructor
				"width": "100px",
				"height": "40px",
				"opacity": "0.5",
				"background-color": "#aaa",
				"right": "0",
				"top": "0",
				"zIndex": "9",
				//these styles shouldn't need to be changed
				"position": "absolute",
				"cursor": "default"
			}
		},
		_displayMiniMap: function () {
			var _this = this;
			//create the div to display the minimap
			miniMapElement = this.miniMap = document.createElement("div");
			this.miniMap.className = this.miniMapElement;
			//create the minimap highlight bar
			miniMapBarElement = this.miniMapBar = document.createElement("div");
			this.miniMap.className = this.miniMapBarElement;
			//insert into DOM
			var scrollBarParent = this.scrollBar.parentNode;
			var scrollBarSibling = this.scrollBar.nextSibling;
			/*----------  alterfan edit  ----------*/
			$(scrollBarParent).append([_this.miniMap, scrollBarSibling], [_this.miniMapBar, scrollBarSibling]).fadeIn(300, function () {
				for (var style in _this.options.miniMapStyles) {
					_this.miniMap.style[style] = _this.options.miniMapStyles[style];
				}
				for (var barStyle in _this.options.miniMapBarStyles) {
					_this.miniMapBar.style[barStyle] = _this.options.miniMapBarStyles[barStyle];
				}
			})
			//We need to modify the style to match where it was placed in the DOM.
			//namely the height.
			var scrollBarStyles = window.getComputedStyle(this.scrollBar, null);
			if (!scrollBarStyles) {
				scrollBarStyles = this.scrollBar.style;
			}
			this.miniMap.style.maxHeight = $(".CodeMirror").height();
			//берем бар offsetWidth прокрутки.
			//В идеале мы должны обеспечить способ для потребителей, чтобы переопределить
			//это в случае пользовательского прокрутки
			//мы также вычесть один, так что это прямо по полосе прокрутки,
			//теперь уверен, что это просто Мак вещь, нужно проверить крест ОС.
			var scrollBarWidth = (this.scrollBar.offsetWidth - 1) + "px";
		},
		/*----------  alterfan edit  ----------*/
		destroyMiniMap: function (cm) {
			if (miniMapElement != null) {
				$(miniMapElement).fadeOut(300, function (elem) {
					$(this).remove()
				})
				$(miniMapBarElement).fadeOut(300, function (elem) {
					$(this).remove()
				})
			}
			cm.focus()
		},
		mirrorContent: function (cm) {
			var factor, max, avail;
			//we have to clone to new content because we need to
			//remove any elements that might distort the scrollHeight
			//of our source pane
			var newContentDOM = cm.getWrapperElement().querySelector(this.options.content).cloneNode(true);
			//Here we null-ify any top or bottom settings
			removeStyle(newContentDOM, "top");
			removeStyle(newContentDOM, "bottom");
			//then we take the new html
			var newContent = newContentDOM.innerHTML;
			//мы сбежать или отменить любые теги сценария, потому что мы не хочу бороться с ними
			if (this.keepScripts) {
				newContent = newContent.replace(/<script/g, "&lt;script").replace(/\\script/g, "&lt;script");
			} else {
				var indx = newContent.indexOf("<script");
				var part1 = "",
					end = "";
				while (indx >= 0) {
					part1 = newContent.slice(0, indx);
					end = newContent.indexOf("</script>", indx);
					newContent = part1 + (end > 0 ? newContent.slice(end) : "");
					indx = newContent.indexOf("<script");
				}
			}
			this.miniMap.innerHTML = newContent;
			//check if we should be fractionally scrolling (false),
			// or normal scrolling (true)
			var ssHeight = unPx(window.getComputedStyle(this.miniMap, null).height);
			var showHeight = unPx(window.getComputedStyle(this.miniMapBar, null).height);
			console.log('ssHeight: ', $(".CodeMirror").height());
			console.log('ssHeight: ', ssHeight);
			console.log('showHeight: ', showHeight);
			var watchHeight = unPx(window.getComputedStyle(this.scrollBar, null).height);
			this.scrollNormally = this.miniMap.scrollHeight > ssHeight + 1;
			max = this.scrollBar.scrollHeight - watchHeight;
			avail = ssHeight - showHeight;
			avail = avail > 0 ? avail : 0;
			factor = avail / max;
			//mmm...curry.
			this._doScroll = this._setupScrollAction(factor);
			this._doClick = this._setupClickAction(factor, this.miniMapBar, this.scrollBar, this._doScroll);
		},
		_registerEvents: function () {
			var mm = this;
			//when we scroll, do the current scroll function
			addEventHandler(mm.scrollBar, "scroll", function () {
				mm._doScroll(mm.miniMapBar, mm.miniMap, mm.scrollBar);
			});
			addEventHandler(mm.miniMap, "mousedown", function (event) {
				mm._doClick(event, mm.miniMap);
			});
			var mouseMoveDocumentFcn = function (event) {
				mm._doClick(event, mm.miniMap);
			};
			var mouseUpDocumentFcn = function (event) {
				event.preventDefault();
				removeEventHandler(document.body, "mousemove", mouseMoveDocumentFcn);
				removeEventHandler(document.body, "mouseup", mouseUpDocumentFcn);
			};
			var mouseDownMiniMapBarFcn = function (event) {
				event.preventDefault();
				addEventHandler(document.body, "mouseup", mouseUpDocumentFcn);
				addEventHandler(document.body, "mousemove", mouseMoveDocumentFcn);
			};
			addEventHandler(mm.miniMapBar, "mousedown", mouseDownMiniMapBarFcn);
		},
		_setupScrollAction: function (factor) {
			//We curry the scroll method because the factor
			//don't change often.
			return function (show, ss, watch) {
				var st = watch.scrollTop;
				if (this.scrollNormally) {
					ss.scrollTop = st;
				}
				show.style.marginTop = (st * factor) + "px";
			};
		},
		_setupClickAction: function (factor, show, watch, doScroll) {
			//We curry the click method because the factor
			//don't change often.
			return function (event, ss) {
				event.preventDefault();
				var offset = ss.offsetParent.offsetTop;
				watch.scrollTop = (event.pageY - offset) / factor;
				this._doScroll(show, ss, watch);
			};
		}
	};
	//Helper functions
	//cross browser event handling
	//http://www.javascripter.net/faq/addeventlistenerattachevent.htm
	function addEventHandler(elem, eventType, handler) {
		if (elem.addEventListener)
			elem.addEventListener(eventType, handler, false);
		else if (elem.attachEvent)
			elem.attachEvent('on' + eventType, handler);
	}
	function removeEventHandler(elem, eventType, handler) {
		if (elem.removeEventListener)
			elem.removeEventListener(eventType, handler, false);
		else if (elem.detachEvent)
			elem.detachEvent('on' + eventType, handler);
	}
	function removeStyle(elem, style) {
		if (elem.children.length > 0) {
			for (var i = 0; i < elem.children.length; i++)
				removeStyle(elem.children[i], style);
		}
		elem.style.removeProperty(style);
	}
	function unPx(pixelValue) {
		return parseFloat(pixelValue.replace("px"), "");
	}
	function extend(into, from) {
		if (null === into || "object" !== typeof into) throw Error("destination of extend must exist.");
		if (null === from || "object" !== typeof from) return from;
		for (var attr in from) {
			if (from.hasOwnProperty(attr)) into[attr] = from[attr];
		}
		return into;
	}
	CodeMirror.defineExtension('miniMap', function (options) {
		var cm = this;
		var map = new MiniMap(cm, options)
		this.on("focus", function () {
			activeInstance = cm.getWrapperElement()
		})
		return () => {
			map.destroyMiniMap(cm)
		};
	})
})