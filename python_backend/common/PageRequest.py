from dataclasses import dataclass
from typing import Union, Optional, Any

from pydantic import BaseModel


class PageRequest(BaseModel):
    page: int
    page_size: int
    search_text: Optional[str]
