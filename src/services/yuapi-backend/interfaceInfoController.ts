// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addInterfaceInfo POST /api/interface/add */
export async function addInterfaceInfo(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/interface/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceInfo POST /api/interface/delete */
export async function deleteInterfaceInfo(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interface/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceInfoById GET /api/interface/get */
export async function getInterfaceInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceInfo>('/api/interface/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listInterfaceInfoByPage POST /api/interface/list */
export async function listInterfaceInfoByPage(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  const res = await request<API.BaseResponseListInterfaceInfo>('/api/interface/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
  if (res?.data){
    return{
      data: res.data.records,
      success: true,
      total: res.data.total
    }
  }
  return null;
}

/** listMyInterfaceInfoByPage POST /api/interface/list/page */
export async function listMyInterfaceInfoByPage(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfo>('/api/interface/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateInterfaceInfo POST /api/interface/update */
export async function updateInterfaceInfo(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interface/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
