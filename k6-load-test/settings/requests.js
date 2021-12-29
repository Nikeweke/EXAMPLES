import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const API = (route = '') => `http://test.k6.io/${route}`

const myFailRate = new Rate('failed requests');

export {
  getPage,
  login,
}

// GET example
function getPage() {
  let res = http.get(API());
  myFailRate.add(res.status !== 200);
  check(res, {
    'is status 200': (r) => r.status === 200
  })
}

// POST example
function login() {
  const url = API('login');
  const payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params);
  myFailRate.add(res.status !== 200);
  check(res, {
    'is status 200': (r) => r.status === 200
  })
}



