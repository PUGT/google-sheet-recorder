var mongoActs = require('./mongoActions.js');
var config = require('./config.json');
var {google} = require('googleapis');
var Student = require('./student.js');
/**
* Prints the names and majors of students in a sample spreadsheet:
* @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
* @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
*/
module.exports = {
	listStudents: function(auth) {
		const sheets = google.sheets({version: 'v4', auth});
		sheets.spreadsheets.values.get({
			spreadsheetId: config.SPREADSHEET_ID,
			range: config.SPREADSHEET_RANGE,
		}, (err, res) => {
			if (err) return console.log('The API returned an error: ' + err);
			const rows = res.data.values;
			if (rows.length) {
				console.log('Updating...');
				// Print columns A and E, which correspond to indices 0 and 4.
				var rushees = [];
				rows.map((row) => {
					rushees.push({
						"name" : row[0],
						"gtid" : row[1],
						"email" : row[2],
						"phone" : row[3],
						"year" : row[4],
						"major" : row[5]
						});
				});
				mongoActs.addRushees(rushees);
			} else {
				console.log(config.EMPTY_GSHEET_MESSAGE);
			}
		});
	}
}
