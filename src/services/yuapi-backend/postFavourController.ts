// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** doPostFavour POST /api/post_favour/ */
export async function doPostFavour(
  body: API.PostFavourAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseint>('/api/post_favour/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listFavourPostByPage POST /api/post_favour/list/page */
export async function listFavourPostByPage(
  body: API.PostFavourQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/api/post_favour/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyFavourPostByPage POST /api/post_favour/my/list/page */
export async function listMyFavourPostByPage(
  body: API.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO>('/api/post_favour/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
