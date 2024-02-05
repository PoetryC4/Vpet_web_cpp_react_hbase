from pydantic import BaseModel


class DrinkAddRequest(BaseModel):
    drink_price: float
    drink_pic_path: str
    drink_name: str
    drink_hunger: float
    drink_mood: float
    drink_thirsty: float
    drink_endu: float
    drink_exp: float
    drink_health: float


class DrinkUpdateRequest(BaseModel):
    drink_id: int
    drink_price: float
    drink_pic_path: str
    drink_name: str
    drink_hunger: float
    drink_mood: float
    drink_thirsty: float
    drink_endu: float
    drink_exp: float
    drink_health: float
