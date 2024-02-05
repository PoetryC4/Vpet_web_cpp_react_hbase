// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

const API_PREFIX = "/api"

export async function addPresentUsingPost(body: API.PresentAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>(API_PREFIX + '/present/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updatePresentUsingPost(body: API.PresentUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>(API_PREFIX + '/present/updateById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getPresentByPageUsingPost(body: API.MyPageRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePresentPage_>(API_PREFIX + '/present/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getPresentByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetPresentByIdUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePresent_>(API_PREFIX + '/present/getById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAllPresentUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponsePresentArray_>(API_PREFIX + '/present/getAll', {
    method: 'GET',
    ...(options || {}),
  });
}
