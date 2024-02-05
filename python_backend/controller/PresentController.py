from typing import Optional

from fastapi import Query, Body

from common.BaseResponseModel import BaseResponseModel
from common.PageRequest import PageRequest
from model.dto.PresentRequest import PresentAddRequest, PresentUpdateRequest
from service.PresentService import PresentService


def present_get_by_id(present_id: int = Query(..., description="Present primary key", example=1)):
    present = PresentService.get_by_id(present_id)
    if present:
        return BaseResponseModel.success(present)
    else:
        return BaseResponseModel.error(f"get_by_id err:{present_id}")


def present_add(present_price: float = Body(...), present_pic_path: Optional[str] = Body(""),
                present_name: str = Body(...), present_mood: float = Body(...),
                present_exp: float = Body(...),
                present_performance: float = Body(...)):
    present_add_request: PresentAddRequest = PresentAddRequest(present_price=present_price,
                                                               present_pic_path=present_pic_path,
                                                               present_name=present_name,
                                                               present_mood=present_mood,
                                                               present_exp=present_exp,
                                                               present_performance=present_performance)
    result = PresentService.add(present_add_request)
    if result:
        return BaseResponseModel.success(result)
    else:
        return BaseResponseModel.error(f"add err:{present_add_request}")


def present_update(present_id: int = Body(...), present_price: float = Body(...),
                   present_pic_path: Optional[str] = Body(""),
                   present_name: str = Body(...), present_mood: float = Body(...),
                   present_exp: float = Body(...),
                   present_performance: float = Body(...)):
    present_update_request = PresentUpdateRequest(present_id=present_id, present_price=present_price,
                                                  present_pic_path=present_pic_path,
                                                  present_name=present_name,
                                                  present_mood=present_mood,
                                                  present_exp=present_exp,
                                                  present_performance=present_performance)
    result = PresentService.update(present_update_request)
    if result:
        return BaseResponseModel.success(result)
    else:
        return BaseResponseModel.error(f"update err:{present_update_request}")


def present_get_by_page(page: int = Body(..., description="页码"), page_size: int = Body(..., description="页大小"),
                        search_text: Optional[str] = Body(None, description="搜索字符串")):
    page_request: PageRequest = PageRequest(page=page, page_size=page_size, search_text=search_text)
    # 防爬虫
    if page_request.page_size and page_request.page_size > 25:
        return BaseResponseModel.error(f"pageSize 过大")
    page_result = PresentService.get_by_page(page_request)
    if page_result:
        return BaseResponseModel.success(page_result)
    else:
        return BaseResponseModel.error(f"page get err:{page_request}")
