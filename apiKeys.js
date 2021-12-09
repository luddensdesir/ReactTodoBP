var tryRequire = require("try-require");

var privateData;

if(process.env.HEROKU || process.env.AWS ){
    var env = process.env;
    privateData = {
        COOKIE_SECRET: env.cookieSecret,
        MONGODB_URI: env.MONGODB_URI,
    }
} else {
    var url = __dirname + "/localconfig.js";
    if(tryRequire.resolve(url)){
      privateData = require(url);
    }

    console.log(tryRequire.lastError());
}

module.exports = privateData;