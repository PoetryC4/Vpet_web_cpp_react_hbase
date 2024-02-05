from pydantic import BaseModel


class Food(BaseModel):
    food_id: int
    food_price: float
    food_pic_path: str
    food_name: str
    food_hunger: float
    food_mood: float
    food_thirsty: float
    food_endu: float
    food_exp: float
    food_health: float
