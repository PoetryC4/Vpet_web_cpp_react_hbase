from dataclasses import asdict

from pymongo import MongoClient

from common.Constants import mongodb
from common.PageRequest import PageRequest
from common.PageResult import PageResult
from model.dto.FoodRequest import FoodAddRequest, FoodUpdateRequest
from model.entity.Food import Food

FOOD_DATABASE_NAME = "food"


class FoodService:
    @classmethod
    def get_by_id(cls, food_id: int):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[FOOD_DATABASE_NAME]  # 修改为您的集合名称

            # 根据food_id查询记录
            food_data = collection.find_one({'food_id': food_id})

            # 如果找到记录，创建Food实例并返回；否则返回None
            if food_data:
                food_data.pop("_id")
                return Food(**food_data)
            else:
                raise Exception(f"找不到对应的food: {food_id}")
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
            collection = db[FOOD_DATABASE_NAME]  # 修改为您的集合名称

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
    def add(cls, food_add_request: FoodAddRequest):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[FOOD_DATABASE_NAME]  # 修改为您的集合名称

            # 获取当前最大的food_id
            max_id = collection.find_one(sort=[("food_id", -1)])
            max_id = max_id.get("food_id", 0) + 1

            data = {**dict(food_add_request), "food_id": max_id}
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
    def update(cls, food_update_request: FoodUpdateRequest):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[FOOD_DATABASE_NAME]  # 修改为您的集合名称

            query = {"food_id": food_update_request.food_id}
            update_data = {"$set": {**dict(food_update_request)}}
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
