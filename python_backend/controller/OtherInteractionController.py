import asyncio
import json
import time
from typing import Optional

from fastapi import Query, Body
from starlette.responses import StreamingResponse

from common.BaseResponseModel import BaseResponseModel
from llm.LlmChatTemplate import try_check_access, chat_with_chatgpt, chat_with_chatglm
from utils.FileUtils import FileUtils

# file_prefix = "D:/school/Vpet_web_cpp_react_hbase-main/static_file"
file_prefix = "E:/scl/pet_ques/src/main/resources/front"


def get_filenames_by_path(target_folder: str = Query(..., description="Relative file path", example="/vup/Eat")):
    target_folder = target_folder.replace("ATslash;", "/")
    target_folder = "/" + target_folder
    file_names = FileUtils.get_all_files_in_folder(file_prefix + target_folder)
    file_names = [file_name[(len(file_prefix + target_folder) + 0):] for file_name in file_names]
    if file_names:
        return BaseResponseModel.success(file_names)
    else:
        return BaseResponseModel.error(f"filenames get err err:{target_folder}")


async def chat_with_llm(query: str = Body(..., description="用户输入", examples=["恼羞成怒"]),
                        conversation_id: int = Body(-1, description="对话框ID"),
                        user_id: int = Body(..., description="用户ID"),
                        temperature: float = Body(1.0, description="LLM 采样温度", ge=0.0, le=2.0),
                        max_tokens: Optional[int] = Body(1024,
                                                         description="限制LLM生成Token数量，默认None代表模型最大值"),
                        skip_history: bool = Body(False, description="是否忽略历史"),
                        llm_model_name: str = Body(..., description="要对话的模型", examples=["chatglm"]),
                        access_key: str = Body(...),
                        secret_key: str = Body(...)):
    if not skip_history and conversation_id == -1:
        return BaseResponseModel.error("请提供对话id")
    if not try_check_access(user_id=user_id, access_key_input=access_key, secret_key_input=secret_key):
        return BaseResponseModel.error("权限校验错误")

    async def event_generator():
        answer_list = []
        if llm_model_name == 'chatgpt':
            async for result in chat_with_chatgpt(conversation_id=conversation_id, query=query, user_id=user_id,
                                                  temperature=temperature, max_tokens=max_tokens,
                                                  skip_history=skip_history):
                answer_list.append(result)
            for answer in answer_list:
                yield "data: " + answer
                yield '\n\n'
                await asyncio.sleep(0.15)  # 模拟生成数据的延迟
            yield "data: [LLM_DONE]"
            yield '\n\n'
        elif llm_model_name == 'chatglm':
            async for result in chat_with_chatglm(conversation_id=conversation_id, query=query, user_id=user_id,
                                                  temperature=temperature, max_tokens=max_tokens,
                                                  skip_history=skip_history):
                answer_list.append(result)
            for answer in answer_list:
                yield "data: " + answer
                yield '\n\n'
                await asyncio.sleep(0.15)  # 模拟生成数据的延迟
            yield "data: [LLM_DONE]"
            yield '\n\n'

    return StreamingResponse(event_generator(), media_type="text/event-stream")
