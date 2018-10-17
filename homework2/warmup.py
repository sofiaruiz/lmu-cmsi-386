import random
import math
import requests
from cryptography.fernet import Fernet

def change(amount):
    if amount == 0:
        return (0, 0, 0, 0)
    if amount < 0:
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


def strip_quotes(strip):
    return strip.replace('"', '').replace("'", '')

def scramble(scramb):
    return ''.join(random.sample(scramb, len(scramb)))

def powers(base, limit):
    num = 1
    while num <= limit:
        yield num
        num *= base
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


def interleave(first, *b):
    result = []
    for i in range(max(len(first), len(b))):
        if i < len(first):
            result.append(first[i])
        if i < len(b):
            result.append(b[i])
    return result

class Cylinder():
    def __init__(self, radius=1, height=1):
        self.radius = radius
        self.height = height
    @property
    def volume(self):
        return math.pi * (self.radius ** 2) * self.height
    @property
    def surface_area(self):
        return (2 * math.pi * self.radius * self.height) + (2 * math.pi * (self.radius ** 2))

    def widen(self, factor):
        self.radius *= factor
        return self

    def stretch(self, factor):
        self.height *= factor
        return self

def make_crypto_functions(key):
    f_key = Fernet(key)
    def encrypt(text):
        return f_key.encrypt(text)
    def decrypt(encryption):
        return f_key.decrypt(encryption)

    return (encrypt, decrypt)



def random_name(**kwargs):
    params = {'gender' : kwargs.get('gender'), 'region' : kwargs.get('region'), 'amount': 1}
    response = requests.get("http://uinames.com/api", params=params)
    if response.status_code in range(200, 300):
        person_info = response.json()
        return f'{person_info["surname"]}, {person_info["name"]}'
    raise ValueError(response.text)
