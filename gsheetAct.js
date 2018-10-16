var mongoActs = require('./mongoActions.js');
var config = require('./config.json');
var {google} = require('googleapis');
var Student = require('./student.js');
var sheetID = config.SPREADSHEET_ID;
var sheetRange = config.SPREADSHEET_RANGE;
module.exports = {
	listStudents: function(auth) {
		const sheets = google.sheets({version: 'v4', auth});
		sheets.spreadsheets.values.get({
			spreadsheetId: sheetID,
			range: sheetRange,
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
						"_id" : row[1],
						"email" : row[2],
						"phone" : row[3],
						"year" : row[4],
						"major" : row[5]
						});
				});
				mongoActs.addRushees(rushees);
			} else {
				console.log("No data found!");
			}
		});
	}
}
