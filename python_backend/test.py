from utils.EncryptUtils import EncryptUtils
from utils.StrUtils import StrUtils

if __name__ == '__main__':
    str1 = "3s0PbL10LFd9tzeiZNXKmCd9yuQjdcGIALrjne8IDYi0uDn8"
    print(EncryptUtils.base64_encrypt("1" + "vpet" + str1))
