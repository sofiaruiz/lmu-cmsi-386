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
  const resLen = a.length + b.length
  const result = [];
  for (let i = 0; i <= a.length; i += 1) {
    result.push(a[i]);
    result.push(b[i]);
    if (result.length > resLen) {
      result.pop();
    }
  }

  return result;
};

exports.randomName = (gen, reg) => {
  const rp = require('request-promise');
  const gender = gen;
  const region = reg;
  rp({
    uri: 'http://uinames.com/api',
    qs: { gender, region },
  }).then(person => person);
};
