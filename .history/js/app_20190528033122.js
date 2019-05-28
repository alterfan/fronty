var $fronty = $(".fronty"),
    $modal = $("#modal"),
    $header = $("#header"),
    $wrapper = $("#wrapper"),
    $footer = $("#footer"),
    $hidden = $("#hidden"),
    $cm = $(".CodeMirror"),
    $overlay = $('#overlay'),
    $editors = $('#editors'),
    $editor_controls = $(".editor_controls");
var defaults = {
    "options": {
        "theme": "fronty",
        "extraKeys": {
            "Ctrl-J": "toMatchingTag"
        },
        "inputStyle": "contenteditable",
        "addModeClass": true,
        "styleActiveLine": false,
        "autoCloseBrackets": true,
        "autoCloseTags": true,
        "lineNumbers": true,
        "lineWrapping": false,
        "foldGutter": true,
        "selectionsMayTouch": true,
        "showCursorWhenSelecting": true,
        "scrollbarStyle": "simple",
        "matchTags": true,
        "matchBrackets": true,
        "smartIndent": true,
        "autoRefresh": true
    },
    "configuration": {
        "delay": 500,
        "fontSize": "12px",
        "fontFamily": "Consolas",
        "layout": "vertical",
        "direction": "default"
    },
    "autosaved": [
   "<!Doctype html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"description\" content=\"\">\n\t<meta name=\"author\" content=\"Mark Otto, Jacob Thornton, and Bootstrap contributors\">\n\t<meta name=\"generator\" content=\"Jekyll v3.8.5\">\n\t<title>Blog Template · Bootstrap</title>\n\n\t<link rel=\"canonical\" href=\"https://getbootstrap.com/docs/4.3/examples/blog/\">\n\n\t<!-- Bootstrap core CSS -->\n\t<link href=\"/docs/4.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">\n\n\n\t<style>\n\t\t.bd-placeholder-img {\n\t\t\tfont-size: 1.125rem;\n\t\t\ttext-anchor: middle;\n\t\t\t-webkit-user-select: none;\n\t\t\t-moz-user-select: none;\n\t\t\t-ms-user-select: none;\n\t\t\tuser-select: none;\n\t\t}\n\n\t\t@media (min-width: 768px) {\n\t\t\t.bd-placeholder-img-lg {\n\t\t\t\tfont-size: 3.5rem;\n\t\t\t}\n\t\t}\n\t</style>\n\t<!-- Custom styles for this template -->\n\t<link href=\"https://fonts.googleapis.com/css?family=Playfair+Display:700,900\" rel=\"stylesheet\">\n\t<!-- Custom styles for this template -->\n\t<link href=\"blog.css\" rel=\"stylesheet\">\n</head>\n\n<body>\n\t<div class=\"container\">\n\t\t<header class=\"blog-header py-3\">\n\t\t\t<div class=\"row flex-nowrap justify-content-between align-items-center\">\n\t\t\t\t<div class=\"col-4 pt-1\">\n\t\t\t\t\t<a class=\"text-muted\" href=\"#\">Subscribe</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4 text-center\">\n\t\t\t\t\t<a class=\"blog-header-logo text-dark\" href=\"#\">Large</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4 d-flex justify-content-end align-items-center\">\n\t\t\t\t\t<a class=\"text-muted\" href=\"#\">\n\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" class=\"mx-3\" role=\"img\" viewBox=\"0 0 24 24\" focusable=\"false\">\n\t\t\t\t\t\t\t<title>Search</title>\n\t\t\t\t\t\t\t<circle cx=\"10.5\" cy=\"10.5\" r=\"7.5\" />\n\t\t\t\t\t\t\t<path d=\"M21 21l-5.2-5.2\" />\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class=\"btn btn-sm btn-outline-secondary\" href=\"#\">Sign up</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</header>\n\n\t\t<div class=\"nav-scroller py-1 mb-2\">\n\t\t\t<nav class=\"nav d-flex justify-content-between\">\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">World</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">U.S.</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Technology</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Design</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Culture</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Business</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Politics</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Opinion</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Science</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Health</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Style</a>\n\t\t\t\t<a class=\"p-2 text-muted\" href=\"#\">Travel</a>\n\t\t\t</nav>\n\t\t</div>\n\n\t\t<div class=\"jumbotron p-4 p-md-5 text-white rounded bg-dark\">\n\t\t\t<div class=\"col-md-6 px-0\">\n\t\t\t\t<h1 class=\"display-4 font-italic\">Title of a longer featured blog post</h1>\n\t\t\t\t<p class=\"lead my-3\">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>\n\t\t\t\t<p class=\"lead mb-0\"><a href=\"#\" class=\"text-white font-weight-bold\">Continue reading...</a></p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"row mb-2\">\n\t\t\t<div class=\"col-md-6\">\n\t\t\t\t<div class=\"row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative\">\n\t\t\t\t\t<div class=\"col p-4 d-flex flex-column position-static\">\n\t\t\t\t\t\t<strong class=\"d-inline-block mb-2 text-primary\">World</strong>\n\t\t\t\t\t\t<h3 class=\"mb-0\">Featured post</h3>\n\t\t\t\t\t\t<div class=\"mb-1 text-muted\">Nov 12</div>\n\t\t\t\t\t\t<p class=\"card-text mb-auto\">This is a wider card with supporting text below as a natural lead-in to additional content.</p>\n\t\t\t\t\t\t<a href=\"#\" class=\"stretched-link\">Continue reading</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-auto d-none d-lg-block\">\n\t\t\t\t\t\t<svg class=\"bd-placeholder-img\" width=\"200\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\" role=\"img\" aria-label=\"Placeholder: Thumbnail\">\n\t\t\t\t\t\t\t<title>Placeholder</title>\n\t\t\t\t\t\t\t<rect width=\"100%\" height=\"100%\" fill=\"#55595c\" />\n\t\t\t\t\t\t\t<text x=\"50%\" y=\"50%\" fill=\"#eceeef\" dy=\".3em\">Thumbnail</text>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-6\">\n\t\t\t\t<div class=\"row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative\">\n\t\t\t\t\t<div class=\"col p-4 d-flex flex-column position-static\">\n\t\t\t\t\t\t<strong class=\"d-inline-block mb-2 text-success\">Design</strong>\n\t\t\t\t\t\t<h3 class=\"mb-0\">Post title</h3>\n\t\t\t\t\t\t<div class=\"mb-1 text-muted\">Nov 11</div>\n\t\t\t\t\t\t<p class=\"mb-auto\">This is a wider card with supporting text below as a natural lead-in to additional content.</p>\n\t\t\t\t\t\t<a href=\"#\" class=\"stretched-link\">Continue reading</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-auto d-none d-lg-block\">\n\t\t\t\t\t\t<svg class=\"bd-placeholder-img\" width=\"200\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\" role=\"img\" aria-label=\"Placeholder: Thumbnail\">\n\t\t\t\t\t\t\t<title>Placeholder</title>\n\t\t\t\t\t\t\t<rect width=\"100%\" height=\"100%\" fill=\"#55595c\" />\n\t\t\t\t\t\t\t<text x=\"50%\" y=\"50%\" fill=\"#eceeef\" dy=\".3em\">Thumbnail</text>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<main role=\"main\" class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-8 blog-main\">\n\t\t\t\t<h3 class=\"pb-4 mb-4 font-italic border-bottom\">\n        From the Firehose\n      </h3>\n\n\t\t\t\t<div class=\"blog-post\">\n\t\t\t\t\t<h2 class=\"blog-post-title\">Sample blog post</h2>\n\t\t\t\t\t<p class=\"blog-post-meta\">January 1, 2014 by <a href=\"#\">Mark</a></p>\n\n\t\t\t\t\t<p>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>\n\t\t\t\t\t<hr>\n\t\t\t\t\t<p>Cum sociis natoque penatibus et magnis <a href=\"#\">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur\n\t\t\t\t\t\tpurus sit amet fermentum.</p>\n\t\t\t\t\t<blockquote>\n\t\t\t\t\t\t<p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n\t\t\t\t\t</blockquote>\n\t\t\t\t\t<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n\t\t\t\t\t<h2>Heading</h2>\n\t\t\t\t\t<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>\n\t\t\t\t\t<h3>Sub-heading</h3>\n\t\t\t\t\t<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\n\t\t\t\t\t<pre><code>Example code block</code></pre>\n\t\t\t\t\t<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>\n\t\t\t\t\t<h3>Sub-heading</h3>\n\t\t\t\t\t<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum\n\t\t\t\t\t\tnibh, ut fermentum massa justo sit amet risus.</p>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>\n\t\t\t\t\t\t<li>Donec id elit non mi porta gravida at eget metus.</li>\n\t\t\t\t\t\t<li>Nulla vitae elit libero, a pharetra augue.</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>\n\t\t\t\t\t<ol>\n\t\t\t\t\t\t<li>Vestibulum id ligula porta felis euismod semper.</li>\n\t\t\t\t\t\t<li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>\n\t\t\t\t\t\t<li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>\n\t\t\t\t\t</ol>\n\t\t\t\t\t<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>\n\t\t\t\t</div>\n\t\t\t\t<!-- /.blog-post -->\n\n\t\t\t\t<div class=\"blog-post\">\n\t\t\t\t\t<h2 class=\"blog-post-title\">Another blog post</h2>\n\t\t\t\t\t<p class=\"blog-post-meta\">December 23, 2013 by <a href=\"#\">Jacob</a></p>\n\n\t\t\t\t\t<p>Cum sociis natoque penatibus et magnis <a href=\"#\">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur\n\t\t\t\t\t\tpurus sit amet fermentum.</p>\n\t\t\t\t\t<blockquote>\n\t\t\t\t\t\t<p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n\t\t\t\t\t</blockquote>\n\t\t\t\t\t<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n\t\t\t\t\t<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>\n\t\t\t\t</div>\n\t\t\t\t<!-- /.blog-post -->\n\n\t\t\t\t<div class=\"blog-post\">\n\t\t\t\t\t<h2 class=\"blog-post-title\">New feature</h2>\n\t\t\t\t\t<p class=\"blog-post-meta\">December 14, 2013 by <a href=\"#\">Chris</a></p>\n\n\t\t\t\t\t<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum\n\t\t\t\t\t\tnibh, ut fermentum massa justo sit amet risus.</p>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>\n\t\t\t\t\t\t<li>Donec id elit non mi porta gravida at eget metus.</li>\n\t\t\t\t\t\t<li>Nulla vitae elit libero, a pharetra augue.</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n\t\t\t\t\t<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>\n\t\t\t\t</div>\n\t\t\t\t<!-- /.blog-post -->\n\n\t\t\t\t<nav class=\"blog-pagination\">\n\t\t\t\t\t<a class=\"btn btn-outline-primary\" href=\"#\">Older</a>\n\t\t\t\t\t<a class=\"btn btn-outline-secondary disabled\" href=\"#\" tabindex=\"-1\" aria-disabled=\"true\">Newer</a>\n\t\t\t\t</nav>\n\n\t\t\t</div>\n\t\t\t<!-- /.blog-main -->\n\n\t\t\t<aside class=\"col-md-4 blog-sidebar\">\n\t\t\t\t<div class=\"p-4 mb-3 bg-light rounded\">\n\t\t\t\t\t<h4 class=\"font-italic\">About</h4>\n\t\t\t\t\t<p class=\"mb-0\">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"p-4\">\n\t\t\t\t\t<h4 class=\"font-italic\">Archives</h4>\n\t\t\t\t\t<ol class=\"list-unstyled mb-0\">\n\t\t\t\t\t\t<li><a href=\"#\">March 2014</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">February 2014</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">January 2014</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">December 2013</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">November 2013</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">October 2013</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">September 2013</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">August 2013</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">July 2013</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">June 2013</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">May 2013</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">April 2013</a></li>\n\t\t\t\t\t</ol>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"p-4\">\n\t\t\t\t\t<h4 class=\"font-italic\">Elsewhere</h4>\n\t\t\t\t\t<ol class=\"list-unstyled\">\n\t\t\t\t\t\t<li><a href=\"#\">GitHub</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">Twitter</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">Facebook</a></li>\n\t\t\t\t\t</ol>\n\t\t\t\t</div>\n\t\t\t</aside>\n\t\t\t<!-- /.blog-sidebar -->\n\n\t\t</div>\n\t\t<!-- /.row -->\n\n\t</main>\n\t<!-- /.container -->\n\n\t<footer class=\"blog-footer\">\n\t\t<p>Blog template built for <a href=\"https://getbootstrap.com/\">Bootstrap</a> by <a href=\"https://twitter.com/mdo\">@mdo</a>.</p>\n\t\t<p>\n\t\t\t<a href=\"#\">Back to top</a>\n\t\t</p>\n\t</footer>\n</body>\n\n</html>",
   "*,\n*:before,\n*:after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.container {\n  width: 85vw;\n  margin: 1rem auto;\n}\n\n.bg,\n.overlay {\n  text-align: center;\n}\n\nimg,\n.overlay {\n  transition: .3s all;\n  border-radius: 3px;\n}\n\n.bg {\n  float: left;\n  max-width: 31%;\n  position: relative;\n  margin: .5%;\n}\n.bg .img {\n\n  width: 100%;\n  margin-bottom: -4px; -webkit-filter: blur(2px);\n  filter: blur(2px);\n}\n.bg .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.2);\n  color: #fff;\n  opacity: 0;\n}\n.bg .overlay h2 {\n  padding-top: 20%;\n  font-family: 'Droid Serif', serif;\n}\n.bg .overlay p {\n  font-family: 'Julius Sans One', sans-serif;\n}\n.bg:hover .overlay {\n  opacity: 1;\n}\n.bg:hover .img {\n  -webkit-filter: blur(2px);\n  filter: blur(2px);\n}\n\n@media screen and (max-width: 1148px) {\n  .bg {\n    max-width: 48%;\n    margin: 1%;\n  }\n}\n@media screen and (max-width: 768px) {\n  .bg {\n    float: none;\n    max-width: 80%;\n    margin: 1% auto;\n  }\n}\n",
        "console.log(\"test 1\")",
        '{"1":{"link":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.css","name":"Bootstrap","ver":"4.2.1"},"2":{"link":"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css","name":"Animate","ver":"3.7.0"}}',
        '{"1":{"link":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js","name":"jQuery","ver":"3.3.1"},"2":{"link":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/bootstrap.min.js","name":"Bootstrap","ver":"4.2.1"}}'
    ]
};

var _DB = new LocalStorageDB(defaults);
$(document).ready(function() {
    var modal = new Modal();
    if (_DB.ready == true) {
        var cm = new CmEditor()
        $(window).on('resize', function() {
            cm.updateFrameResolution();
            cm.cm_refresh();
        });
        var target = {
            cm: cm,
            modal: modal,
            db: _DB,
            ui: cm,
            frameConsole: frameConsole
        }
        $(document).on('click', '[action="click"]', function(el) {
            var action = new Function("target", "action", "val", "target[action](val)"),
                t = $(this).attr('data-target'),
                a = $(this).attr('data-action');
            action(target[t], a, $(this))
        });
        $(document).on('change', '[action="change"]', function(e) {
            var action = new Function("target", "action", "val", "target[action](val)")
            action(target[$(this).attr('data-target')], $(this).attr('action') + "_" + $(this).attr('data-action'), $(this).val())
        });
    }
})