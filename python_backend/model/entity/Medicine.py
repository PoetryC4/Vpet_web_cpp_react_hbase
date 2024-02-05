from pydantic import BaseModel


class Medicine(BaseModel):
    medicine_id: int
    medicine_price: float
    medicine_pic_path: str
    medicine_name: str
    medicine_mood: float
    medicine_endu: float
    medicine_exp: float
    medicine_health: float
