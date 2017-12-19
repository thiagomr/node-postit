global.__base = __dirname + '/'; 
require('dotenv').load();
require(__base + 'app/server');