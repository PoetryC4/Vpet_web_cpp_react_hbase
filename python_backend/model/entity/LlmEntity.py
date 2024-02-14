from datetime import datetime

from pydantic import BaseModel


class Message(BaseModel):
    role: str
    content: str
    create_time: datetime


class Conversion(BaseModel):
    user_id: int
    messages: list[Message]
    title: str
    conversation_id: int
    llm_model_name: str
    temperature: float
    max_tokens: int


# 仅展示，不存储
class UserAccess:
    user_id: int
    access_key: str
    secret_key: str