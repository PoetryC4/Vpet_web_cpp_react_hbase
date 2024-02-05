from dataclasses import dataclass
from typing import Generic, TypeVar, Dict

T = TypeVar('T')


@dataclass
class BaseResponseModel(Generic[T]):
    code: int = 0
    msg: str = ""
    data: T = None

    @classmethod
    def success(cls, obj: T) -> 'BaseResponseModel[T]':
        return cls(data=obj, code=0)

    @classmethod
    def error(cls, msg: str, err_code: int = 1) -> 'BaseResponseModel[T]':
        return cls(msg=msg, code=err_code)
