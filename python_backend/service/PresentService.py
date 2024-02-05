from dataclasses import asdict

import yaml
from pymongo import MongoClient

from common.Constants import mongodb
from common.PageRequest import PageRequest
from common.PageResult import PageResult
from model.dto.PresentRequest import PresentAddRequest, PresentUpdateRequest
from model.entity.Present import Present

PRESENT_DATABASE_NAME = "present"


class PresentService:
    @classmethod
    def get_by_id(cls, present_id: int):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[PRESENT_DATABASE_NAME]  # 修改为您的集合名称

            # 根据present_id查询记录
            present_data = collection.find_one({'present_id': present_id})

            # 如果找到记录，创建Present实例并返回；否则返回None
            if present_data:
                present_data.pop("_id")
                return Present(**present_data)
            else:
                raise Exception(f"找不到对应的present: {present_id}")
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
            collection = db[PRESENT_DATABASE_NAME]  # 修改为您的集合名称

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
    def add(cls, present_add_request: PresentAddRequest):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[PRESENT_DATABASE_NAME]  # 修改为您的集合名称

            # 获取当前最大的present_id
            max_id = collection.find_one(sort=[("present_id", -1)])
            max_id = max_id.get("present_id", 0) + 1

            data = {**dict(present_add_request), "present_id": max_id}
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
    def update(cls, present_update_request: PresentUpdateRequest):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[PRESENT_DATABASE_NAME]  # 修改为您的集合名称

            query = {"present_id": present_update_request.present_id}
            update_data = {"$set": {**dict(present_update_request)}}
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
