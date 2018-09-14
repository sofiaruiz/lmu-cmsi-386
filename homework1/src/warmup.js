const rp = require('request-promise');


const crypto = require('crypto');

exports.change = (amount) => {
  if (amount === 0) {
    return [0, 0, 0, 0];
  }

  if (amount < 0) {
    throw new RangeError('Amount cannot be negative');
  }

  const initAmount = amount;
  let newAmount;

  const quarters = Math.floor(initAmount / 25);
  newAmount = initAmount % 25;

  const dimes = Math.floor(newAmount / 10);
  newAmount %= 10;

  const nickels = Math.floor(newAmount / 5);
  newAmount %= 5;

  const pennies = newAmount;

  return [quarters, dimes, nickels, pennies];
};


exports.stripQuotes = input => input.replace(/['"]/g, '');


exports.scramble = input => input.split('').sort(() => 0.5 - Math.random()).join('');


exports.powers = (base, limit, callback) => {
  for (let i = 1; i <= limit; i *= base) {
    callback(i);
  }
};


exports.powersGenerator = function* g(base, limit) {
  for (let x = 1; x <= limit; x *= base) {
    yield x;
  }
};


exports.say = (word) => {
  if (!word) {
    return '';
  }
  return nextword => (!nextword ? word : exports.say(`${word} ${nextword}`));
};

exports.interleave = (a, ...b) => {
  const result = [];
  for (let i = 0; i <= Math.max(a.length, b.length); i += 1) {
    if (i < a.length) {
      result.push(a[i]);
    }
    if (i < b.length) {
      result.push(b[i]);
    }
  }
  return result;
};

exports.cylinder = (spec) => {
  let { radius = 1, height = 1 } = spec;
  const surfaceArea = () => ((2 * Math.PI * radius * height) + (2 * Math.PI * (radius ** 2)));
  const volume = () => (Math.PI * (radius ** 2) * height);
  const stretch = (grow) => { height *= grow; };
  const widen = (factor) => { radius *= factor; };
  const toString = () => `Cylinder with radius ${radius} and height ${height}`;
  return Object.freeze({
    get radius() { return radius; },
    get height() { return height; },
    surfaceArea,
    volume,
    stretch,
    widen,
    toString,
  });
};

exports.makeCryptoFunctions = (cryptoKey, cryptoAlgorithm) => {
  function encrypt(text) {
    const encode = crypto.createCipher(cryptoAlgorithm, cryptoKey);
    let encryptIt = encode.update(text, 'utf8', 'hex');
    encryptIt += encode.final('hex');
    return encryptIt;
  }
  function decrypt(text) {
    const decode = crypto.createDecipher(cryptoAlgorithm, cryptoKey);
    let decyptIt = decode.update(text, 'hex', 'utf8');
    decyptIt += decode.final('utf8');
    return decyptIt;
  }
  return [encrypt, decrypt];
};

exports.randomName = ({ gender, region }) => rp({
  uri: 'https://uinames.com/api',
  qs: { gender, region },
}).then(person => `${person.surname}, ${person.name}`);
