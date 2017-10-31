var helper = require('sendgrid').mail;
var fs = require('fs');
var fs = require('fs-extra');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var chalk = require('chalk');
var moment = require('moment');

/**
 * @param {string} templateToSend
 * @param {string} fromEmail
 * @param {string} subject
 * @param {string} toEmail
 * @param {array}  recipients
 * @param {string} testMode
 */
var WeeklyMail = function(templateToSend, fromEmail, subject, toEmail, recipients, testMode) {
	this.templateToSend = templateToSend;
	this.fromEmail = fromEmail;
	this.subject = subject;
	this.toEmail = toEmail;
	this.recipients = recipients;
	this.testMode = testMode;
	this.content = '';
	this.message = {};
};

/**
 * @return {object}
 */
WeeklyMail.prototype.getContent = function() {
	var path = process.cwd();
	var buffer = fs.readFileSync(path + '/tmp/' + this.templateToSend + '.html');
	this.content = new helper.Content('text/html', buffer.toString());
	var mail = new helper.Mail(
		this.fromEmail,
		this.subject,
		this.toEmail,
		this.content
	);

	if (!this.testMode) {
		var personalization = new helper.Personalization()
		this.recipients.forEach(function(address) {
			email = new helper.Email(address);
			personalization.addTo(email);
		});
		mail.addPersonalization(personalization);
	} else {
		console.log(chalk.yellow('This is just a test...'));
	}

	return mail.toJSON();
};

/**
 * @param {object} bodyContent
 */
WeeklyMail.prototype.send = function(bodyContent) {
	var _self = this;
	var request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: bodyContent
	});

	console.log(chalk.yellow('Sending...'));

	sg.API(request, function (error, response) {
		if (error) {
			console.log('Status Code: ' + response.statusCode);
			console.log(response.headers);
			console.log(chalk.red(error));
			console.log(response.body);
			throw new Error('Mail send failed');
		}

		console.log(
			chalk.green('"' + _self.subject + '" sent successfully')
		);

		_self.message.id = response.headers["x-message-id"];
		_self.message.timestamp = moment();

		// Archive the message with a timestamp so it can be committed
		_self.archive(_self.message, _self.templateToSend);
	});
};

/**
 * @param {object}
 * @param {string}
 */
WeeklyMail.prototype.archive = function(message, templateToSend) {
	var path = process.cwd();
	fs.copySync(
		path + '/tmp/' + templateToSend + '.html',
		path + '/archive/' + message.id + '_weekly-' + message.timestamp.format('DD-MM-YYYY') + '.html'
	);
};

module.exports = WeeklyMail;
