// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

export async function addDrinkUsingPost(body: API.DrinkAddRequest, options?: { [key: string]: any }) {
  return request<string>('/drink/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getDrinkByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetDrinkByIdUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<API.Drink>('/drink/getById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAllDrinkUsingGet(options?: { [key: string]: any }) {
  return request<API.Drink[]>('/drink/getAll', {
    method: 'GET',
    ...(options || {}),
  });
}
