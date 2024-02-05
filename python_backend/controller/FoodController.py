from typing import Optional

from fastapi import Query, Body

from common.BaseResponseModel import BaseResponseModel
from common.PageRequest import PageRequest
from model.dto.FoodRequest import FoodAddRequest, FoodUpdateRequest
from model.entity.Food import Food
from service.FoodService import FoodService


def food_get_by_id(food_id: int = Query(..., description="Food primary key", example=1)):
    food = FoodService.get_by_id(food_id)
    if food:
        return BaseResponseModel.success(food)
    else:
        return BaseResponseModel.error(f"get_by_id err:{food_id}")


def food_add(food_price: float = Body(...), food_pic_path: Optional[str] = Body(""),
              food_name: str = Body(...), food_hunger: float = Body(...), food_mood: float = Body(...),
              food_thirsty: float = Body(...), food_endu: float = Body(...), food_exp: float = Body(...),
              food_health: float = Body(...)):
    food_add_request: FoodAddRequest = FoodAddRequest(food_price=food_price, food_pic_path=food_pic_path,
                                                         food_name=food_name, food_hunger=food_hunger,
                                                         food_mood=food_mood, food_thirsty=food_thirsty,
                                                         food_endu=food_endu, food_exp=food_exp,
                                                         food_health=food_health)
    result = FoodService.add(food_add_request)
    if result:
        return BaseResponseModel.success(result)
    else:
        return BaseResponseModel.error(f"add err:{food_add_request}")


def food_update(food_id: int = Body(...), food_price: float = Body(...), food_pic_path: Optional[str] = Body(""),
                 food_name: str = Body(...), food_hunger: float = Body(...), food_mood: float = Body(...),
                 food_thirsty: float = Body(...), food_endu: float = Body(...), food_exp: float = Body(...),
                 food_health: float = Body(...)):
    food_update_request = FoodUpdateRequest(food_id=food_id, food_price=food_price, food_pic_path=food_pic_path,
                                              food_name=food_name, food_hunger=food_hunger,
                                              food_mood=food_mood, food_thirsty=food_thirsty,
                                              food_endu=food_endu, food_exp=food_exp,
                                              food_health=food_health)
    result = FoodService.update(food_update_request)
    if result:
        return BaseResponseModel.success(result)
    else:
        return BaseResponseModel.error(f"update err:{food_update_request}")


def food_get_by_page(page: int = Body(..., description="页码"), page_size: int = Body(..., description="页大小"),
                      search_text: Optional[str] = Body(None, description="搜索字符串")):
    page_request: PageRequest = PageRequest(page=page, page_size=page_size, search_text=search_text)
    # 防爬虫
    if page_request.page_size and page_request.page_size > 25:
        return BaseResponseModel.error(f"pageSize 过大")
    page_result = FoodService.get_by_page(page_request)
    if page_result:
        return BaseResponseModel.success(page_result)
    else:
        return BaseResponseModel.error(f"page get err:{page_request}")
