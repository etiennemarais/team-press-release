var config = {};
/**
 * Expand this by adding more recipients or by adding more teams.
 */
config.tech = {
	'name': 'Tech Team',
	'template': 'tech-weekly-catchup',
	'from_email': 'from-email@company.com', // This is also the email the test will get sent to
	'recipients': [
		'stakeholders@company.com',
		'exco@company.com',
		'individual@company.com',
		'another-individual@company.com'
	]
};

module.exports = config;
