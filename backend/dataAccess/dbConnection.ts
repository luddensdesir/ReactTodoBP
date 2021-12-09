export const connection = (creds) => {
	const mongoose = require("mongoose");
	var dbOptions = { useUnifiedTopology: true, useNewUrlParser: true, keepAlive: 300000, connectTimeoutMS: 30000};
	mongoose.connect( creds.connection , dbOptions);
	mongoose.set("useCreateIndex", true);
	const db = mongoose.connection;
	// l(db);
};
