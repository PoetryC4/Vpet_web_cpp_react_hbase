from fastapi import FastAPI
from pymongo import MongoClient
import yaml
import uvicorn
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from common.BaseResponseModel import BaseResponseModel
from common.Constants import server
from controller.DrinkController import drink_add, drink_get_by_page, drink_get_by_id, drink_update
from controller.FoodController import food_add, food_get_by_page, food_get_by_id, food_update
from controller.OtherInteractionController import get_filenames_by_path, chat_with_llm
from controller.PresentController import present_update, present_get_by_id, present_add, present_get_by_page
from controller.MedicineController import medicine_add, medicine_get_by_page, medicine_get_by_id, medicine_update


def document():
    return RedirectResponse(url="/docs")


def api_start(host, port, **kwargs):
    global app

    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.get("/", response_model=BaseResponseModel, summary="swagger 文档")(document)

    app.post("/api/drink/add", response_model=BaseResponseModel, summary="添加 drink")(drink_add)
    app.post("/api/drink/page", response_model=BaseResponseModel, summary="分页查询 drink")(drink_get_by_page)
    app.get("/api/drink/getById", response_model=BaseResponseModel, summary="通过 id 获取 drink")(drink_get_by_id)
    app.post("/api/drink/updateById", response_model=BaseResponseModel, summary="修改 drink")(drink_update)

    app.post("/api/food/add", response_model=BaseResponseModel, summary="添加 food")(food_add)
    app.post("/api/food/page", response_model=BaseResponseModel, summary="分页查询 food")(food_get_by_page)
    app.get("/api/food/getById", response_model=BaseResponseModel, summary="通过 id 获取 food")(food_get_by_id)
    app.post("/api/food/updateById", response_model=BaseResponseModel, summary="修改 food")(food_update)

    app.post("/api/medicine/add", response_model=BaseResponseModel, summary="添加 medicine")(medicine_add)
    app.post("/api/medicine/page", response_model=BaseResponseModel, summary="分页查询 medicine")(
        medicine_get_by_page)
    app.get("/api/medicine/getById", response_model=BaseResponseModel, summary="通过 id 获取 medicine")(
        medicine_get_by_id)
    app.post("/api/medicine/updateById", response_model=BaseResponseModel, summary="修改 medicine")(medicine_update)

    app.post("/api/present/add", response_model=BaseResponseModel, summary="添加 present")(present_add)
    app.post("/api/present/page", response_model=BaseResponseModel, summary="分页查询 present")(
        present_get_by_page)
    app.get("/api/present/getById", response_model=BaseResponseModel, summary="通过 id 获取 present")(present_get_by_id)
    app.post("/api/present/updateById", response_model=BaseResponseModel, summary="修改 present")(present_update)

    app.get("/api/files/getAll", response_model=BaseResponseModel, summary="获取文件夹下所有文件路径")(
        get_filenames_by_path)
    app.post("/api/chat", summary="与 llm 对话")(chat_with_llm)

    uvicorn.run(app, host=host, port=port)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    # 读取YAML文件
    # with open("config.yml", "r") as file:
    #     server_args = yaml.safe_load(file)
    api_start(server.get("host"), server.get("port"))
