const crypto      = require('crypto');

module.exports.cipher = (data, secret, algoritm) => {

  try {

    const cipher = crypto.createCipher(algoritm, secret);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      err: false,
      hash: encrypted
    };

  } catch (err) {
    return { err: true };
  }

}

module.exports.decipher = (data, secret, algoritm) => {

  try {

    const decipher = crypto.createDecipher(algoritm, secret);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return {
      err: false,
      decrypted: decrypted
    };

  } catch (err) {
    return { err: true }
  }

}