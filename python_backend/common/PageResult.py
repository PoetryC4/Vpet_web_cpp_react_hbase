from typing import Generic, TypeVar, Dict, List

from pydantic import BaseModel

T = TypeVar('T')


class PageResult(BaseModel):
    records: List[T]
    count: int
