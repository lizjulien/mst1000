var casper = require('casper').create();
var comments;
var i;
var length;

casper.on('remote.message', function(response) {
    response = JSON.parse(response);
    comments = response.collection;
    i = response.i;
    length = comments.length;
});

casper.start('http://mstlocalscrapper', function() {});

casper.then(function() {
    for (i; i < length; i++) {
    	var comment = comments[i];

        this.captureSelector('screenshots/' + comment.slug + '.png', 'div.' + comment.slug);
    }

    this.echo('var i = ' + length + ';');
});

casper.run();