import requests
import random
import math
from cryptography.fernet import Fernet

def change (amount):
    if (amount == 0):
        return (0, 0, 0, 0)
    if (amount < 0):
        raise ValueError('amount cannot be negative')

    init_amount = amount
    quarters = int(init_amount / 25)
    new_amount = init_amount % 25

    dimes = int(new_amount / 10)
    new_amount %= 10

    nickels = int(new_amount / 5)
    new_amount %= 5

    pennies = int(new_amount)

    return (quarters, dimes, nickels, pennies)


def strip_quotes (input):
    return input.replace('"','').replace("'", '')

def scramble (s):
    return ''.join(random.sample(s,len(s)))

def powers(base, limit):
    x = 1
    while x <= limit:
        yield x
        x *= base
  # for (let x = 1; x <= limit; x *= base) {
  #   yield x;
  # }

def triples(limit):
    return [(a, b, c) for c in range(1, limit+1) for b in range(1, c) for a in range(b) if a**2 + b**2 == c**2]

def say(word=None):
    if word is None:
        return ''
    def say_more(nextword=None):
        return word if nextword is None else say(f'{word} {nextword}')
    return say_more


def interleave(a, *b):
    result = [];
    for i in range(max(len(a), len(b))):
        if (i < len(a)):
            result.append(a[i])
        if (i < len(b)):
            result.append(b[i])
    return result;

class Cylinder():
    def __init__(self, radius = 1, height = 1):
        self.radius = radius
        self.height = height
    @property
    def volume(self):
        return math.pi * (self.radius ** 2) * self.height
    @property
    def surface_area(self):
        return ((2 * math.pi * self.radius * self.height) + (2 * math.pi * (self.radius ** 2)))

    def widen(self, factor):
        self.radius *= factor
        return self

    def stretch(self, factor):
        self.height *= factor
        return self

def make_crypto_functions(key):
    pass


def random_name(**kwargs):
    params = {'gender' : kwargs.get('gender'), 'region' : kwargs.get('region')}
    response = request.get("http://api.uninames.com", params=params)
    return  response.json()
