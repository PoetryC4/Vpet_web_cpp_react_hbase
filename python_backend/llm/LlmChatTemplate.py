import json
import os
import time

from openai import AsyncOpenAI

from model.entity.LlmEntity import Message
from service.LlmService import LlmService
from utils.EncryptUtils import EncryptUtils
import openai
import requests

client = AsyncOpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

SALT = "vpet"

CHATGLM_BASE_URL = "http://127.0.0.1:7891"


def try_check_access(user_id: int, access_key_input: str, secret_key_input: str):
    real_secret_key = EncryptUtils.base64_encrypt(str(user_id) + SALT + access_key_input)
    if real_secret_key == secret_key_input:
        return True
    else:
        return False


async def chat_with_chatgpt(conversation_id: int, query: str, temperature: float, max_tokens: int, user_id: int,
                            skip_history: bool):
    history = []
    if not skip_history:
        conversation = LlmService.get_by_id(conversation_id=conversation_id, user_id=user_id)
        messages = conversation.messages
        history.append([{'role': message.role, 'content': message.content} for message in messages])
    history.append(
        {'role': 'user',
         'content': query})

    stream_resp = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=history,
        temperature=temperature,
        max_tokens=max_tokens,
        stream=True,
    )
    async for chunk in stream_resp:
        print(chunk)
        yield chunk.choices[0].delta.content or ""


async def chat_with_chatglm(conversation_id: int, query: str, temperature: float, max_tokens: int, user_id: int,
                            skip_history: bool):
    history = []
    if not skip_history:
        conversation = LlmService.get_by_id(conversation_id=conversation_id, user_id=user_id)
        messages = conversation.messages
        history.append([{'role': message.role, 'content': message.content} for message in messages])

    r = requests.post(CHATGLM_BASE_URL + '/chat/chat', stream=True, json={
        "query": query,
        "history": history,
        "stream": True,
        "temperature": temperature,
        "max_tokens": max_tokens
    })

    # 如果请求的结果没有设置编码，就设置为utf-8
    if r.encoding is None:
        r.encoding = 'utf-8'

    # 遍历这个流式的json的请求数据
    for lines in r.iter_lines(decode_unicode=True):
        if lines:  # 每一个循环都是一个json数据
            # 按照"}"分割字符串，形成一个JSON对象列表
            json_objects = lines.split("}")

            # 去除空字符串
            json_objects = [obj + "}" for obj in json_objects if obj]

            answer = []
            # 逐个解析JSON对象，提取"text"字段
            for obj in json_objects:
                json_data = json.loads(obj)
                text_value = json_data.get("text")
                answer.append(text_value)
                yield "".join(answer)
