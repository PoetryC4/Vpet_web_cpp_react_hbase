// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

const API_PREFIX = "/api"

export async function addMedicineUsingPost(body: API.MedicineAddRequest, options?: { [key: string]: any }) {
  return request<string>(API_PREFIX + '/medicine/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateMedicineUsingPost(body: API.MedicineUpdateRequest, options?: { [key: string]: any }) {
  return request<string>(API_PREFIX + '/medicine/updateById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getMedicineByPageUsingPost(body: API.MyPageRequest, options?: { [key: string]: any }) {
  return request<API.MedicinePage>(API_PREFIX + '/medicine/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getMedicineByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetMedicineByIdUsingGetParams,
  options?: { [key: string]: any },
) {
  return request<API.Medicine>(API_PREFIX + '/medicine/getById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAllMedicineUsingGet(options?: { [key: string]: any }) {
  return request<API.Medicine[]>(API_PREFIX + '/medicine/getAll', {
    method: 'GET',
    ...(options || {}),
  });
}
