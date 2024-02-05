from typing import Optional

from fastapi import Query, Body

from common.BaseResponseModel import BaseResponseModel
from common.PageRequest import PageRequest
from model.dto.DrinkRequest import DrinkAddRequest, DrinkUpdateRequest
from model.entity.Drink import Drink
from service.DrinkService import DrinkService


def drink_get_by_id(drink_id: int = Query(..., description="Drink primary key", example=1)):
    drink = DrinkService.get_by_id(drink_id)
    if drink:
        return BaseResponseModel.success(drink)
    else:
        return BaseResponseModel.error(f"get_by_id err:{drink_id}")


def drink_add(drink_price: float = Body(...), drink_pic_path: Optional[str] = Body(""),
              drink_name: str = Body(...), drink_hunger: float = Body(...), drink_mood: float = Body(...),
              drink_thirsty: float = Body(...), drink_endu: float = Body(...), drink_exp: float = Body(...),
              drink_health: float = Body(...)):
    drink_add_request: DrinkAddRequest = DrinkAddRequest(drink_price=drink_price, drink_pic_path=drink_pic_path,
                                                         drink_name=drink_name, drink_hunger=drink_hunger,
                                                         drink_mood=drink_mood, drink_thirsty=drink_thirsty,
                                                         drink_endu=drink_endu, drink_exp=drink_exp,
                                                         drink_health=drink_health)
    result = DrinkService.add(drink_add_request)
    if result:
        return BaseResponseModel.success(result)
    else:
        return BaseResponseModel.error(f"add err:{drink_add_request}")


def drink_update(drink_id: int = Body(...), drink_price: float = Body(...), drink_pic_path: Optional[str] = Body(""),
                 drink_name: str = Body(...), drink_hunger: float = Body(...), drink_mood: float = Body(...),
                 drink_thirsty: float = Body(...), drink_endu: float = Body(...), drink_exp: float = Body(...),
                 drink_health: float = Body(...)):
    drink_update_request = DrinkUpdateRequest(drink_id=drink_id, drink_price=drink_price, drink_pic_path=drink_pic_path,
                                              drink_name=drink_name, drink_hunger=drink_hunger,
                                              drink_mood=drink_mood, drink_thirsty=drink_thirsty,
                                              drink_endu=drink_endu, drink_exp=drink_exp,
                                              drink_health=drink_health)
    result = DrinkService.update(drink_update_request)
    if result:
        return BaseResponseModel.success(result)
    else:
        return BaseResponseModel.error(f"update err:{drink_update_request}")


def drink_get_by_page(page: int = Body(..., description="页码"), page_size: int = Body(..., description="页大小"),
                      search_text: Optional[str] = Body(None, description="搜索字符串")):
    page_request: PageRequest = PageRequest(page=page, page_size=page_size, search_text=search_text)
    # 防爬虫
    if page_request.page_size and page_request.page_size > 25:
        return BaseResponseModel.error(f"pageSize 过大")
    page_result = DrinkService.get_by_page(page_request)
    if page_result:
        return BaseResponseModel.success(page_result)
    else:
        return BaseResponseModel.error(f"page get err:{page_request}")
