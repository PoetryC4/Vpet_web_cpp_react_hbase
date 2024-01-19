// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

const API_PREFIX = "/api"

export async function getFileNamesUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFileNamesUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<string[]>(API_PREFIX + '/files/getAll', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function chatWithLlmUsingPost(body: API.llmChatRequest, options?: { [key: string]: any }) {
  return request<string>(API_PREFIX + '/chat/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
