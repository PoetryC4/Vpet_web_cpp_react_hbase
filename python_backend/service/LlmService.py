from dataclasses import asdict

from pymongo import MongoClient

from common.Constants import mongodb
from common.PageRequest import PageRequest
from common.PageResult import PageResult
from model.dto.DrinkRequest import DrinkAddRequest, DrinkUpdateRequest
from model.entity.Drink import Drink
from model.entity.LlmEntity import Conversion, Message

LLM_DATABASE_NAME = "llm"


class LlmService:
    @classmethod
    def get_by_id(cls, conversation_id: int, user_id: int) -> Conversion:

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[LLM_DATABASE_NAME]  # 修改为您的集合名称

            conversion = collection.find_one({'conversation_id': conversation_id, "user_id": user_id})

            if conversion:
                conversion.pop("_id")
                return Conversion(**conversion)
            else:
                raise Exception(f"找不到对应的对话: {conversation_id}")
        except Exception as e:
            print(e)
        finally:
            if mongo_client:
                mongo_client.close()

    @classmethod
    def get_all_conversions(cls):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[LLM_DATABASE_NAME]  # 修改为您的集合名称

            # 获取指定列的所有数据
            projection = {"title": 1, "conversation_id": 1}  # 替换成你需要的列名
            cursor = collection.find({}, projection)

            conversions = []

            for result in cursor:
                result.pop("_id")
                conversions.append(result)

            return conversions
        except Exception as e:
            print(e)
        finally:
            if mongo_client:
                mongo_client.close()

    @classmethod
    def update_conversion(cls, conversation_id: int, message: Message):

        mongo_client = None
        try:
            mongo_client = MongoClient(f'mongodb://{mongodb.get("address")}/')
            # 选择数据库和集合
            db = mongo_client[mongodb.get("database")]  # 修改为您的数据库名称
            collection = db[LLM_DATABASE_NAME]  # 修改为您的集合名称

            query = {"conversation_id": conversation_id}

            conversion = collection.find_one({'conversation_id': conversation_id})
            if conversion is None:
                raise Exception(f"对话不存在: {conversation_id}")
            conversion.pop('_id')
            conversion.messages.append(message)

            update_data = {"$set": {**dict(conversion)}}
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
