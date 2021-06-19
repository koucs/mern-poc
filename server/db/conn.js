const { MongoClient } = require("mongodb");
const Db = "mongodb://root:password@localhost:27017"
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // verify we got a good "db" object
            if (db) {
                _db = db.db("employees");
                console.log("Successfylly conneted to MongoDB.")
            }
            return callback(err);
        })
    },

    getDb: function () {
        return _db;
    },
};