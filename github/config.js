var db_string = 'mongodb://localhost/app_dev';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));
exports.dbObject = mongoose;