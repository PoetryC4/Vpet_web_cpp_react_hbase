// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

const API_PREFIX = "/api"

export async function addFoodUsingPost(body: API.FoodAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>(API_PREFIX + '/food/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateFoodUsingPost(body: API.FoodUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>(API_PREFIX + '/food/updateById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getFoodByPageUsingPost(body: API.MyPageRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseFoodPage_>(API_PREFIX + '/food/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getFoodByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetFoodByIdUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseFood_>(API_PREFIX + '/food/getById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAllFoodUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseFoodArray_>(API_PREFIX + '/food/getAll', {
    method: 'GET',
    ...(options || {}),
  });
}
