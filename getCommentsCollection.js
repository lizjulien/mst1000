var collection = [];
var casper = require('casper').create();

casper.on('remote.callback', function(comment) {
	collection.push(comment);
});

casper.start('http://www.marisoltouraine.fr/2015/11/questions-d%E2%80%99actualite-au-gouvernement-marisol-touraine-interpellee-sur-le-projet-de-loi-de-sante-2/', function() {});

casper.then(function () {
	casper.evaluate(function () {
		var comments = document.querySelectorAll('.comment-node')
		jQuery.each(comments, function (key, commentObject) { 
		    var jqComment = jQuery(commentObject);
		    var comment = {
		        title: jqComment.find('.comment-author cite.fn').text(),
		        comment: jqComment.find('.comment-content').text(),
		        slug: 'post' + key,
		        date: jqComment.find('.comment-datetime').text()
		    };

		    jqComment.addClass(comment.slug);
		    window.callPhantom(comment);
		});
	});
});	

casper.then(function () {
	this.echo('var collection = ' + JSON.stringify(collection) + ';');
});

casper.run();