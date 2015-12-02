var fs = require('fs');
eval(fs.readFileSync('mst_collection.js') + '');
eval(fs.readFileSync('lastProcess.js') + '');
var nodeMailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
      new winston.transports.File({ filename: 'log/processes.log' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'log/exceptions.log' })
    ]
});

var transporter = nodeMailer.createTransport(smtpTransport({
    port: 25,
    host: 'mail.gandi.net',
    auth: {
        'user': 'no-reply@vapefrance.fr',
        'pass': 'editMyPassword'
    }
}), {debug: true});

var endAt = i + 26;

publishComment();

function publishComment () {
    var comment = collection[i];
    var number = i+1;

    if (number == endAt) {
        return console.log('var i = ' + endAt + ';');
    }

    i++;

    logger.info(comment.title + ' : (Témoignage n°' + number + ')');

    options = {
        from: 'laisseznousvaper@gmail.com',
        to: 'editTheToEmail',
        subject: comment.title,
        text: comment.comment + '(Témoignage n°' + number + ') [status publish] [category MST1000] [tags MST1000] [publicize twitter]',
        attachments: [{
            filename: comment.slug + '.png',
            path: 'screenshots/jpegs/' + comment.slug + '.jpg'
        }]
    };
    
    transporter.sendMail(options, function (error, info) {
        if (!error) {
            setTimeout(function () {
                publishComment();
            }, 5000);
        } else {
            logger.error(comment.title + ' : ERREUR !!!');
        }
    });
}