from dataclasses import asdict


from pymongo import MongoClient

from common.Constants import mongodb
from common.PageRequest import PageRequest
from common.PageResult import PageResult
from model.dto.DrinkRequest import DrinkAddRequest, DrinkUpdateRequest
from model.entity.Drink import Drink

DRINK_DATABASE_NAME = "drink"


class DrinkService:
    @classmethod
    def get_by_id(cls, drink_id: int):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[DRINK_DATABASE_NAME]  # 修改为您的集合名称

            # 根据drink_id查询记录
            drink_data = collection.find_one({'drink_id': drink_id})

            # 如果找到记录，创建Drink实例并返回；否则返回None
            if drink_data:
                drink_data.pop("_id")
                return Drink(**drink_data)
            else:
                raise Exception(f"找不到对应的drink: {drink_id}")
        except Exception as e:
            print(e)
        finally:
            if mongo_client:
                mongo_client.close()

    @classmethod
    def get_by_page(cls, page_request: PageRequest):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[DRINK_DATABASE_NAME]  # 修改为您的集合名称

            # 计算跳过的文档数量，用于分页
            skip = max(0, (page_request.page - 1) * page_request.page_size)
            records_cursor = collection.find().skip(skip).limit(page_request.page_size)
            records = [{k: v for k, v in record.items() if k != "_id"} for record in records_cursor]
            total_count = collection.count_documents({})

            return PageResult(records=records, count=total_count)
        except Exception as e:
            print(e)
        finally:
            if mongo_client:
                mongo_client.close()

    @classmethod
    def add(cls, drink_add_request: DrinkAddRequest):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[DRINK_DATABASE_NAME]  # 修改为您的集合名称

            # 获取当前最大的drink_id
            max_id = collection.find_one(sort=[("drink_id", -1)])
            max_id = max_id.get("drink_id", 0) + 1

            data = {**dict(drink_add_request), "drink_id": max_id}
            result = collection.insert_one(data)
            if result:
                print(f"插入ID: {result.inserted_id}")
                return max_id
            else:
                raise Exception(f"插入失败: {data}")
        except Exception as e:
            print(e)
        finally:
            if mongo_client:
                mongo_client.close()

    @classmethod
    def update(cls, drink_update_request: DrinkUpdateRequest):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[DRINK_DATABASE_NAME]  # 修改为您的集合名称

            query = {"drink_id": drink_update_request.drink_id}
            update_data = {"$set": {**dict(drink_update_request)}}
            result = collection.update_one(query, update_data)
            if result:
                return True
            else:
                raise Exception(f"更新失败: {update_data}")
        except Exception as e:
            print(e)
        finally:
            if mongo_client:
                mongo_client.close()
