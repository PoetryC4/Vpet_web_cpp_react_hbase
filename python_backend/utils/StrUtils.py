import random
import string


class StrUtils:
    @staticmethod
    def generate_random_string(length: int):
        characters = string.ascii_letters + string.digits
        random_string = ''.join(random.choice(characters) for _ in range(length))
        return random_string
