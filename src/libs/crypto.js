const crypto      = require('crypto'),
      createHash  = require('hash-generator'),
      hash        = createHash('sha224');

module.exports.cipher = (data, secret, algoritm, next) => {

  try {

    const cipher = crypto.createCipher(algoritm, secret);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;

  } catch (err) {
    next (err);
  }

}

module.exports.decipher = (data, secret, algoritm, next) => {

  try {

    const decipher = crypto.createDecipher(algoritm, secret);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;

  } catch (err) {
    next (err);
  }

}

module.exports.hash = (length, next) => {

  try {
    return createHash(length);
  } catch (err) {
    next(err);
  }

}

module.exports.hash2 = (data) => {
  return crypto.createHash('md5').update(data).digest("hex");
}


