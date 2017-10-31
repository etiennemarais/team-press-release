/** Bootstrap */
var helper = require('sendgrid').mail;
var WeeklyMail = require('./weeklymail');
var config = require('./config')[process.env.TEAM];

// Subject line is required
var subject = process.argv[2];
if (subject == undefined) {
	 throw new Error('Error sending mail, You need to provide a subject line');
};

// Setup the email
var mailer = new WeeklyMail(
	config.template,
	new helper.Email(config.from_email, config.name),
	subject,
	new helper.Email(config.from_email),
	config.recipients,
	process.env.TEST
);

// Send it
mailer.send(mailer.getContent());
