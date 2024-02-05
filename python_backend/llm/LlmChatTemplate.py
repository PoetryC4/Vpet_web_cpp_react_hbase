import os

from openai import AsyncOpenAI

from model.entity.LlmEntity import Message
from service.LlmService import LlmService
from utils.EncryptUtils import EncryptUtils
import openai

client = AsyncOpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

SALT = "vpet"


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

    print(history)
    stream_resp = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=history,
        temperature=temperature,
        max_tokens=max_tokens,
        stream=True,
    )
    print(stream_resp)
    async for chunk in stream_resp:
        print(chunk.choices[0].delta.content or "", end="")
        yield chunk.choices[0].delta.content or ""
    return
