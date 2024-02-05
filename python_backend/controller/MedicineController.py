from typing import Optional

from fastapi import Query, Body

from common.BaseResponseModel import BaseResponseModel
from common.PageRequest import PageRequest
from model.dto.MedicineRequest import MedicineAddRequest, MedicineUpdateRequest
from service.MedicineService import MedicineService


def medicine_get_by_id(medicine_id: int = Query(..., description="Medicine primary key", example=1)):
    medicine = MedicineService.get_by_id(medicine_id)
    if medicine:
        return BaseResponseModel.success(medicine)
    else:
        return BaseResponseModel.error(f"get_by_id err:{medicine_id}")


def medicine_add(medicine_price: float = Body(...), medicine_pic_path: Optional[str] = Body(""),
                 medicine_name: str = Body(...), medicine_mood: float = Body(...),
                 medicine_endu: float = Body(...), medicine_exp: float = Body(...),
                 medicine_health: float = Body(...)):
    medicine_add_request: MedicineAddRequest = MedicineAddRequest(medicine_price=medicine_price,
                                                                  medicine_pic_path=medicine_pic_path,
                                                                  medicine_name=medicine_name,
                                                                  medicine_mood=medicine_mood,
                                                                  medicine_endu=medicine_endu,
                                                                  medicine_exp=medicine_exp,
                                                                  medicine_health=medicine_health)
    result = MedicineService.add(medicine_add_request)
    if result:
        return BaseResponseModel.success(result)
    else:
        return BaseResponseModel.error(f"add err:{medicine_add_request}")


def medicine_update(medicine_id: int = Body(...), medicine_price: float = Body(...),
                    medicine_pic_path: Optional[str] = Body(""),
                    medicine_name: str = Body(...), medicine_mood: float = Body(...),
                    medicine_endu: float = Body(...), medicine_exp: float = Body(...),
                    medicine_health: float = Body(...)):
    medicine_update_request = MedicineUpdateRequest(medicine_id=medicine_id, medicine_price=medicine_price,
                                                    medicine_pic_path=medicine_pic_path,
                                                    medicine_name=medicine_name,
                                                    medicine_mood=medicine_mood,
                                                    medicine_endu=medicine_endu, medicine_exp=medicine_exp,
                                                    medicine_health=medicine_health)
    result = MedicineService.update(medicine_update_request)
    if result:
        return BaseResponseModel.success(result)
    else:
        return BaseResponseModel.error(f"update err:{medicine_update_request}")


def medicine_get_by_page(page: int = Body(..., description="页码"), page_size: int = Body(..., description="页大小"),
                         search_text: Optional[str] = Body(None, description="搜索字符串")):
    page_request: PageRequest = PageRequest(page=page, page_size=page_size, search_text=search_text)
    # 防爬虫
    if page_request.page_size and page_request.page_size > 25:
        return BaseResponseModel.error(f"pageSize 过大")
    page_result = MedicineService.get_by_page(page_request)
    if page_result:
        return BaseResponseModel.success(page_result)
    else:
        return BaseResponseModel.error(f"page get err:{page_request}")
