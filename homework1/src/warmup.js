function change (amount) {
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
}

/* console.log(change(97));
console.log(change(8));
console.log(change(250));
console.log(change(144));
console.log(change(97));
console.log(change(-4));
console.log(change(0));
console.log(change(1000000000)); */


function stripQuotes(input) {
  const result = input.replace(/\W/g, '');

  return result;
}

/* console.log(stripQuotes(`a\"\""""\'to\"\"'\"\"''z`));
console.log(stripQuotes(''));
console.log(stripQuotes("Hello, world"));
console.log(stripQuotes('"\''));
console.log(stripQuotes('a"""\'\'"z')); */


function scramble(input) {
  const scrambled = input.split('').sort(() => 0.5 - Math.random()).join('');

  return scrambled;
}

// console.log(scramble('Hello, world'));

function powers(base, limit) {
  for (let i = 1; i <= limit; i++) {
    const power = base ** i;

    return power;
  }
}

// console.log(powers(2, 70, p => console.log(p)));
