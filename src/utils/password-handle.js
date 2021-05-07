const crypto = require('crypto');

const md5password = (password) => {

  const hash = crypto.createHash('md5');
  const result = hash.update(password).digest('hex');
  // console.log(hash.digest('hex'))
  return result;
};

module.exports = md5password;
