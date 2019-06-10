const secrets = {
  dbUri: "mongodb://AdminUser:fuckwit@ds217970.mlab.com:17970/stats"
};

module.exports.getSecret = key => secrets[key];
