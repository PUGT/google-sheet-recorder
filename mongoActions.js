var MongoClient = require('mongodb').MongoClient;
var config = require('./config.json');

var database = config.DB_LOCAL;
var url = database.CLIENT;
var name = database.NAME;
var collection = config.COLLECTION_NAME.PNM;

module.exports = {
	addRushees: function(users) {
		MongoClient.connect(url, function(err, client) {

			db = client.db(name);
			db.collection(collection).insertMany(users);
			client.close();
		});
	}
}