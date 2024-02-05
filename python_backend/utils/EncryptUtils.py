import base64
import random

# 构建自定义的字符集
custom_charset = list("Kpa3nCoVcz0P81uM2UqiQjWbBZA7sO5IFxTS/D69H+lvrgtRYkwEfGXNdyLJhm4e")

# 打乱字符集的顺序
# random.shuffle(custom_charset)


class EncryptUtils:
    @staticmethod
    def base64_encrypt(original_string: str):
        # 构建自定义的Base64编码表
        custom_base64_table = str.maketrans("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                                            ''.join(custom_charset))

        # 将字符串进行Base64编码，并使用自定义的编码表
        encoded_bytes = base64.b64encode(original_string.encode('utf-8'))
        custom_encoded_string = encoded_bytes.decode('utf-8').translate(custom_base64_table)

        return custom_encoded_string
