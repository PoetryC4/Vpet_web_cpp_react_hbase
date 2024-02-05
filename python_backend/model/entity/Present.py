from pydantic import BaseModel


class Present(BaseModel):
    present_id: int
    present_price: float
    present_pic_path: str
    present_name: str
    present_mood: float
    present_exp: float
    present_performance: float
