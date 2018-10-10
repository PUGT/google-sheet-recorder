var MongoClient = require('mongodb').MongoClient;
var config = require('./config.json');

module.exports = {
	addRushees: function(rushees) {
		MongoClient.connect(config.MONGO_CLIENT_LOCAL, function(err, client) {

			db = client.db('local');
			db.collection(config.COLLECTION_NAME).insertMany(rushees);
			client.close();
		});
	}
}