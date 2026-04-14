import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 200,
  duration: '1m',
};

export default function () {
  const payload = JSON.stringify({
    email: "nati@gmail.com",
    password: "Pass12@#$"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post('http://localhost:5000/api/auth/login', payload, params);

  // 🔥 THIS IS WHAT MAKES IT REAL TESTING
check(res, {
  'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  'login success': (r) => r.json('success') === true,
});

  sleep(1);
}