import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function testMethod() {
  return request('/api/blog/testauth', {
    method: 'POST',
  });
}
export async function queryCurrent() {
  return request('/api/user/currentUser');
}
